import { defineHandler } from "nitro";
import { createClient } from "@supabase/supabase-js";

import { Resend } from "resend";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  time?: unknown;
  message?: unknown;
};

type ApiResponse =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

const createJsonResponse = (
  data: ApiResponse,
  status = 200,
): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
};

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 600;

export default defineHandler(async (event) => {
  let body: ContactRequest;

  try {
    body = (await event.req.json()) as ContactRequest;
  } catch {
    return createJsonResponse(
      {
        success: false,
        error: "Geçersiz istek gönderildi.",
      },
      400,
    );
  }

  if (
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.subject !== "string" ||
    typeof body.message !== "string"
  ) {
    return createJsonResponse(
      {
        success: false,
        error: "Tüm alanlar doldurulmalıdır.",
      },
      400,
    );
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const subject = body.subject.trim();
  const message = body.message.trim();

  if (!name || !email || !subject || !message) {
    return createJsonResponse(
      {
        success: false,
        error: "Tüm alanlar doldurulmalıdır.",
      },
      400,
    );
  }

  if (name.length > MAX_NAME_LENGTH) {
    return createJsonResponse(
      {
        success: false,
        error: "İsim çok uzun.",
      },
      400,
    );
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    return createJsonResponse(
      {
        success: false,
        error: "Email çok uzun.",
      },
      400,
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return createJsonResponse(
      {
        success: false,
        error: "Geçersiz email adresi.",
      },
      400,
    );
  }

  if (subject.length > MAX_SUBJECT_LENGTH) {
    return createJsonResponse(
      {
        success: false,
        error: "Konu çok uzun.",
      },
      400,
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return createJsonResponse(
      {
        success: false,
        error: "Mesaj çok uzun.",
      },
      400,
    );
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL?.trim();
  const supabaseSecretKey =
    process.env.SUPABASE_SECRET_KEY?.trim();

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || "khamitler@gmail.com"

  if (!supabaseUrl || !supabaseSecretKey) {
    console.error(
      "Supabase server environment variables missing.",
    );

    return createJsonResponse(
      {
        success: false,
        error: "Sunucu yapılandırma hatası.",
      },
      500,
    );
  }

  const supabase = createClient(
    supabaseUrl,
    supabaseSecretKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );

  const now = new Date();

  // Türkiye saatine göre okunabilir tam tarih (örn: 25 Eylül 2026 Cuma 14:35:10)
  const turkishHistory = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Europe/Istanbul",
  }).format(now);

    const englishHistory = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(now); 


  const { error: dbError } = await supabase
    .from("contact_messages")
    .insert({
      name,
      email,
      subject,
      created_at: now.toISOString(),
      message,
    });
  if (dbError) {
    console.error("Supabase veritabanı hatası:", dbError);
    // Veritabanı çökse bile mail gitsin diye işlemi burada durdurmuyoruz!
  }

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const emailResult = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: notificationEmail,
        replyTo: email,
        subject: `Yeni Mesaj: ${subject} - ${name}`,
                html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
            📬 Web Sitenizden Yeni İletişim Mesajı
          </h2>

          <!-- Zaman Bilgi Kartı: Üstte Durum, Altında Tam Tarih -->
<!-- Mail içindeki Zaman Kutusu -->
<div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin: 16px 0;">
  <p style="margin: 0 0 6px 0; font-size: 13px; color: #1e293b;">
    🇹🇷 <strong>Türkiye Saati:</strong> ${turkishHistory} (GMT+3)
  </p>
  <p style="margin: 0; font-size: 13px; color: #475569;">
    🌍 <strong>Global / UTC:</strong> ${englishHistory} (London/GMT)
  </p>
</div>


          <div style="margin-bottom: 16px; font-size: 14px; line-height: 1.6; color: #334155;">
            <p style="margin: 6px 0;"><strong>👤 Gönderen:</strong> ${name}</p>
            <p style="margin: 6px 0;"><strong>✉️ E-posta:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
            <p style="margin: 6px 0;"><strong>📌 Konu:</strong> ${subject}</p>
          </div>

          <div style="background: #ffffff; padding: 16px; border-left: 4px solid #3b82f6; border-radius: 4px; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase;">Mesaj İçeriği:</p>
            <p style="white-space: pre-wrap; margin: 0; color: #0f172a; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>
        </div>
        `,

      });

      if (emailResult.error) {
        console.error("Mail gönderim hatası:", emailResult.error)
      }
    } catch (mailErr) {
      console.error("Beklenmeyen mail hatası:", mailErr);
    }
  }

  return createJsonResponse({
    success: true,
  });

    return createJsonResponse(
      {
        success: false,
        error: "Mesaj kaydedilemedi.",
      },
      500,
    );

  return createJsonResponse({
    success: true,
  });
});