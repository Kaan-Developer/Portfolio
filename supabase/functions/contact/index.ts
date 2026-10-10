import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase({ auth: "publishable" }, async (req, { supabase }) => {
    const { name, email, subject, otherSubject, message } = await req.json();

    const finalSubject = subject === "other" ? otherSubject : subject;

    const { error } = await supabase.from("contact_messages").insert({
      name: String(name ?? "").trim(),abou
      email: String(email ?? "").trim(),
      subject: String(finalSubject ?? "").trim(),
      message: String(message ?? "").trim(),
    });
    
    if (error) {
      console.error("Contact insert failed:", error.code);
      return Response.json({ error: "Message could not be saved" }, { status: 500 });
    }

    let emailSent = false;
    const resendApiKey = Deno.env.get("EMAIL_API_KEY");

    if (resendApiKey) {
      try {
        const resendResponse = await
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio <onboarding@resend.dev>",
            to: ["kaandeveloperr07@gmail.com"],
            reply_to: String(email ?? "").trim(),
            subject: "New Message from your Portfolio",
            text: [
               `Name: ${String(name ?? "").trim()}`,
              `Email: ${String(email ?? "").trim()}`,
              `Subject: ${String(finalSubject ?? "").trim()}`,
              "",
              String(message ?? "").trim(),
            ].join("\n"),
          }),
        });

        if (resendResponse.ok) {
          emailSent = true;
        } else {
                    console.error("Resend failed:", await resendResponse.text());
        }
      } catch (error) {
         console.error("Resend request failed:", error);
      }
    }

    return Response.json({ success: true, emailSent });
  }),
};