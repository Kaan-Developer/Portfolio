import { defineHandler } from "nitro";
import { createClient } from "@supabase/supabase-js";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
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

  const { error } = await supabase
    .from("contact_messages")
    .insert({
      name,
      email,
      subject,
      message,
    });

  if (error) {
    console.error(
      "Supabase contact insert error:",
      error,
    );

    return createJsonResponse(
      {
        success: false,
        error: "Mesaj kaydedilemedi.",
      },
      500,
    );
  }

  return createJsonResponse({
    success: true,
  });
});