import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default {
  fetch: withSupabase({ auth: "publishable" }, async (req, { supabase }) => {
    const { name, email, subject, otherSubject, message } = await req.json();

    const finalSubject = subject === "other" ? otherSubject : subject;
    const cleanName = String(name ?? "").trim();
    const cleanEmail = String(email ?? "").trim();
    const cleanSubject = String(finalSubject ?? "").trim();
    const cleanMessage = String(message ?? "").trim();

    const { error } = await supabase.from("contact_messages").insert({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });
    
    if (error) {
      console.error("Contact insert failed:", error.code);
      return Response.json({ error: "Message could not be saved" }, { status: 500 });
    }

    let emailSent = false;
    const resendApiKey = Deno.env.get("EMAIL_API_KEY");

    if (resendApiKey) {
      try {
        const escapedName = escapeHtml(cleanName);
        const escapedEmail = escapeHtml(cleanEmail);
        const escapedSubject = escapeHtml(cleanSubject);
        const formattedMessage = escapeHtml(cleanMessage).replace(/\r?\n/g, "<br />");
        const replySubject = encodeURIComponent(`Re: ${cleanSubject || "Portfolio Message"}`);

        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light only" />
  <title>New message from ${escapedName}</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:'Instrument Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;-webkit-font-smoothing:antialiased;">

  <!-- Preheader (inbox preview) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    ${escapeHtml(cleanMessage.slice(0, 110))}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f8fafc" style="background-color:#f8fafc;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;">

          <!-- Top bar -->
          <tr>
            <td style="padding:0 4px 28px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="48" height="48" align="center" valign="middle" bgcolor="#ffffff" style="width:48px;height:48px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:16px;font-size:22px;font-weight:800;color:#0f172a;line-height:48px;">
                          K
                        </td>
                        <td style="padding-left:12px;vertical-align:middle;">
                          <div style="font-size:15px;font-weight:700;color:#0f172a;letter-spacing:-0.02em;">Kaan Hamitler</div>
                          <div style="font-size:12px;color:#64748b;margin-top:1px;">Portfolio &middot; Contact form</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td bgcolor="#ffffff" style="background-color:#ffffff;border:1px solid #e2e8f0;border-radius:9999px;padding:7px 14px;font-size:12px;font-weight:600;color:#1e293b;white-space:nowrap;">
                          <span style="color:#10b981;font-size:11px;">&#9679;</span>&nbsp; New message
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding:0 4px 28px;">
              <div style="font-size:16px;font-weight:500;color:#60a5fa;">Hey Kaan,</div>
              <h1 style="margin:6px 0 0;font-size:34px;line-height:1.05;font-weight:800;letter-spacing:-0.04em;color:#0f172a;">
                You got a message from <span style="color:#2563eb;">${escapedName}</span>.
              </h1>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td bgcolor="#ffffff" style="background-color:#ffffff;border:1px solid #e2e8f0;border-radius:24px;padding:28px;">

              <!-- Sender -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="48" height="48" align="center" valign="middle" bgcolor="#0f172a" style="width:48px;height:48px;background-color:#0f172a;border-radius:9999px;font-size:18px;font-weight:700;color:#ffffff;line-height:48px;">
                    ${escapeHtml((Array.from(cleanName)[0] ?? "?").toUpperCase())}
                  </td>
                  <td style="padding-left:14px;vertical-align:middle;">
                    <div style="font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#94a3b8;">From</div>
                    <div style="font-size:17px;font-weight:700;letter-spacing:-0.02em;color:#0f172a;margin-top:2px;">${escapedName}</div>
                    <a href="mailto:${escapedEmail}" style="font-size:14px;color:#2563eb;text-decoration:none;">${escapedEmail}</a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height:1px;line-height:1px;font-size:1px;background-color:#e2e8f0;margin:24px 0;">&nbsp;</div>

              <!-- Subject -->
              <div style="font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#94a3b8;">Subject</div>
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-top:8px;">
                <tr>
                  <td bgcolor="#eff6ff" style="background-color:#eff6ff;border:1px solid #dbeafe;border-radius:9999px;padding:6px 14px;font-size:13px;font-weight:600;color:#2563eb;">
                    ${escapedSubject}
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:#94a3b8;margin-top:24px;">Message</div>
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
                <tr>
                  <td bgcolor="#f8fafc" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px;font-size:15px;line-height:1.7;color:#1e293b;word-break:break-word;">
                    ${formattedMessage}
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-top:28px;">
                <tr>
                  <td bgcolor="#0f172a" style="background-color:#0f172a;border-radius:9999px;">
                    <a href="mailto:${escapedEmail}?subject=${replySubject}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;letter-spacing:-0.01em;color:#ffffff;text-decoration:none;border-radius:9999px;">
                      Reply to ${escapedName} &nbsp;&#8599;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 16px 0;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;">
                Sent from the contact form on your portfolio.<br />
                Hitting reply will answer <span style="color:#64748b;">${escapedEmail}</span> directly.
              </p>
              <p style="margin:12px 0 0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#cbd5e1;">
                Kaan Hamitler &middot; Frontend Developer
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio <onboarding@resend.dev>",
            to: ["kaandeveloperr07@gmail.com"],
            reply_to: cleanEmail,
            subject: "New Message from your Portfolio",
            text: [
              `Name: ${cleanName}`,
              `Email: ${cleanEmail}`,
              `Subject: ${cleanSubject}`,
              "",
              cleanMessage,
            ].join("\n"),
            html: htmlContent,
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