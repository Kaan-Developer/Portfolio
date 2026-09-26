interface ClientRecord {
  lastRequestTime: number; // En son istek attığı zaman
  requestCount: number;    // Mevcut penceredeki istek sayısı
  resetTime: number;       // Mevcut engelin veya pencerenin biteceği zaman
  strikes: number;         // Kaç defa ceza yediği (1. ihlal, 2. ihlal, 3. ihlal...)
  strikeResetTime: number; // 24 saat uslu durursa sicilinin temizleneceği zaman
}

// Dosyayı kaydettiğinde (Vite HMR) hafıza sıfırlanmasın diye globalThis kullanıyoruz
const ipStore: Map<string, ClientRecord> =
  (globalThis as any).__rateLimitStore ||
  ((globalThis as any).__rateLimitStore = new Map());

interface RateLimitConfig {
  routeKey?: string;   // "contact" veya "chat" ayrımı
  maxRequests: number; // İzin verilen mesaj sayısı (Örn: 3)
  windowMs: number;    // Temel ceza süresi (Örn: 1 saat = 3600000 ms)
  cooldownMs?: number; // İki istek arası bekleme (Örn: 15 sn)
  message?: string;    // Özel mesaj
}

export function checkRateLimit(
  event: any,
  config: RateLimitConfig
): { success: boolean; error?: string; retryAfterSeconds?: number } {
  // 1. IP Adresini Doğru Tespit Et
  const forwardedFor = event.req?.headers?.get?.("x-forwarded-for");
  const forwardedIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "";
  const realIp = event.req?.headers?.get?.("x-real-ip");
  const nodeIp = event.node?.req?.socket?.remoteAddress;

  const ip = forwardedIp || realIp || nodeIp || "127.0.0.1";
  const route = config.routeKey || "default";
  const key = `${ip}:${route}`;

  const now = Date.now();
  const cooldown = config.cooldownMs ?? 2500;
  const client = ipStore.get(key);

  // 2. İlk defa gelen ziyaretçi
  if (!client) {
    ipStore.set(key, {
      lastRequestTime: now,
      requestCount: 1,
      resetTime: now + config.windowMs,
      strikes: 0,
      strikeResetTime: now + (24 * 60 * 60 * 1000), // 24 saatlik sicil süresi
    });
    return { success: true };
  }

  // 3. Kullanıcı 24 saat boyunca ceza yememişse ceza puanını (strikes) sıfırla
  if (now > client.strikeResetTime) {
    client.strikes = 0;
  }

  // 4. Ceza süresi bitmiş mi? Bittiyse yeni bir sayfa aç ama sicilindeki (strikes) ceza sayısını koru
  if (now > client.resetTime) {
    client.requestCount = 1;
    client.lastRequestTime = now;
    client.resetTime = now + config.windowMs;
    return { success: true };
  }

  // 5. Cooldown Kontrolü (15 saniye nefes alma süresi)
  if (now - client.lastRequestTime < cooldown) {
    const waitSec = Math.ceil((cooldown - (now - client.lastRequestTime)) / 1000);
    return {
      success: false,
      error: `Çok hızlı işlem yapıyorsun. Lütfen ${waitSec} saniye bekle.`,
      retryAfterSeconds: waitSec,
    };
  }

  // 6. KADEMELİ CEZA SİSTEMİ (1 Saat -> 2 Saat -> 3 Saat...)
  if (client.requestCount >= config.maxRequests) {
    // Eğer bu periyotta henüz ceza katlanmadıysa katla:
    if (client.requestCount === config.maxRequests) {
      client.strikes += 1; // Ceza sayısını artır (1, 2, 3...)
      client.strikeResetTime = now + (24 * 60 * 60 * 1000); // Sicil süresini 24 saat ileri at
      
      // Ceza Süresi = Temel Süre (1 Saat) x Ceza Sayısı (1, 2, 3...)
      const penaltyDuration = config.windowMs * client.strikes;
      client.resetTime = now + penaltyDuration;
      client.requestCount += 1; // Tekrar tekrar katlamasın diye sayacı 1 artır
    }

    const remainingMs = client.resetTime - now;
    const remainingHours = Math.ceil(remainingMs / (60 * 60 * 1000));
    const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));

    const timeText =
      remainingHours > 1
        ? `${remainingHours} saat`
        : `${remainingMinutes} dakika`;

    return {
      success: false,
      error: `Çok fazla form gönderdin. (${client.strikes}. İhlal). Lütfen ${timeText} sonra tekrar dene.`,
      retryAfterSeconds: Math.ceil(remainingMs / 1000),
    };
  }

  // 7. Sorun yoksa isteği kabul et
  client.requestCount += 1;
  client.lastRequestTime = now;
  return { success: true };
}

// 2 dakikada bir eski süresi dolmuş çöp kayıtları RAM'den temizle
if (!(globalThis as any).__rateLimitInterval) {
  (globalThis as any).__rateLimitInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, data] of ipStore.entries()) {
      if (now > data.resetTime && now > data.strikeResetTime) {
        ipStore.delete(key);
      }
    }
  }, 120_000);
}