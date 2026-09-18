type ChatApiResponse =
  | {
      success: true;
      reply: string;
    }
  | {
      success: false;
      error: string;
    };

export const sendChatMessage = async (
  message: string,
): Promise<string> => {
  const cleanMessage = message.trim();

  if (!cleanMessage) {
    throw new Error("Mesaj boş olamaz.");
  }

  const response = await fetch("/api/chat", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      message: cleanMessage,
    }),
  });

  const data =
    (await response.json()) as ChatApiResponse;

  if (
    !response.ok ||
    data.success === false
  ) {
    const errorMessage =
      data.success === false
        ? data.error
        : "Mesaj gönderilemedi.";

    throw new Error(errorMessage);
  }

  return data.reply;
};