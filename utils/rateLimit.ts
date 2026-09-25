import type { H3Event } from "nitro";

interface ClientRecord {
  lastRequestTime: number;
  requestCount: number;
  resetTime: number;
}

const ipStore = new Map<string, ClientRecord>();

interface RateLimitConfig {
  maxRequests: number; // Belirtilen penceredeki izin verilen istek sayısı
  windowMs: number;    // Pencere süresi (ms)
  cooldownMs?: number; // İki istek arasında zorunlu bekleme süresi (ms)
}

export function checkRateLimit(
  event: H3Event,
  config: RateLimitConfig
): { success: boolean; error?: string; retryAfterSeconds?: number } {
  // IP tespit et
  const forwardedFor = event.req.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "";
  const realIp = event.req.headers.get("x-real-ip");
  const ip =
    event.req.ip ||
    forwardedIp ||
    realIp ||
    event.runtime?.node?.req.socket?.remoteAddress ||
    "unknown_ip";

  const now = Date.now();
  const cooldown = config.cooldownMs ?? 2500;
  const client = ipStore.get(ip);

  // 1. İlk defa gelen veya süresi dolmuş IP
  if (!client || now > client.resetTime) {
    ipStore.set(ip, {
      lastRequestTime: now,
      requestCount: 1,
      resetTime: now + config.windowMs,
    });
    return { success: true };
  }

  // 2. Cooldown kontrolü (Çok hızlı art arda istek)
  if (now - client.lastRequestTime < cooldown) {
    const waitSec = Math.ceil((cooldown - (now - client.lastRequestTime)) / 1000);
    return {
      success: false,
      error: `Çok hızlı mesaj gönderiyorsun. Lütfen ${waitSec} saniye bekle.`,
      retryAfterSeconds: waitSec,
    };
  }

  // 3. Pencere içi limit aşımı
  if (client.requestCount >= config.maxRequests) {
    const retryAfter = Math.ceil((client.resetTime - now) / 1000);
    return {
      success: false,
      error: `Kısa sürede çok fazla soru sordun. Lütfen ${retryAfter} saniye sonra tekrar dene.`,
      retryAfterSeconds: retryAfter,
    };
  }

  // İstek geçerli, sayaçları güncelle
  client.requestCount += 1;
  client.lastRequestTime = now;
  return { success: true };
}

// 2 dakikada bir süresi dolmuş kayıtları temizle (Memory leak önleme)
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipStore.entries()) {
    if (now > data.resetTime) {
      ipStore.delete(ip);
    }
  }
}, 120_000);
