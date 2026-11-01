# Portfolio: koordinatör talimatları

Ana konuşma koordinatördür. Kişisel ajanlar etkin Codex ana dizininin `agents/`
klasöründedir; burada aynı rolleri yeniden tanımlama. Her yazılım görevinde önce
`docs/agent-workflow.md` oku; ortak görev devri, iletişim ve denetim kuralları
oradan kişisel `agent-workflow.md` belgesine bağlanır.

- İsteği ölçülebilir kabul kriterlerine çevir. Kapsam, sorumlu, bağımlılık, dosya
  sahipliği ve doğrulama yöntemini belirt. Bağımsız işi alt ajanlara ver;
  aynı dosyada eşzamanlı yazdırma. Ana ajan dışında ikinci yönetici oluşturma.
- Geliştirici ve denetçi ayrı bağlamlarda çalışsın. Denetimi sabit sürüme bağla;
  düzeltme sonrası bağımsız kontrol olmadan bulguyu kapatma. Kritik/yüksek açık
  risk veya başarısız gerekli kontrol varken tamamlandı deme.
- Frontend işi ve tasarım denetiminde ortak `DESIGN.md` oku. Mevcut tasarımı,
  kullanıcı onayını ve öneriyi ayır; tasarımı kapsam dışında değiştirme.

## Yığın ve dosyalar

Node 24 + pnpm; React, TypeScript, Vite, Tailwind CSS; Zustand ve React Router.
`src/` frontend, `public/` statik varlıklar, `tests/` Node testleri,
`supabase/` mevcut iletişim backend'idir. Sürümleri `pnpm list --depth 0` ile
kontrol et; package.json aralığını kurulu sürüm diye sunma.
TR/EN içerik `src/data/trSite.ts`, `src/data/enSite.ts` ve `src/data/projects.ts`;
ortak proje tipi `src/types/project.ts`. İçerik ve slug eşleşmesini koru.

## Doğrulama

Değişiklikten önce ve ilgili değişikliklerden sonra:
`pnpm test`, `pnpm lint`, `pnpm exec tsc -b --force`, `pnpm build`.
Üç mevcut Node testi yalnız menü deposunu kapsar; tüm uygulamayı doğrulamaz.
Yerel arayüz: `pnpm dev`; build önizlemesi: `pnpm preview`.
Frontend build, Edge Function veya SQL doğrulaması değildir.
Backend işinde önce `supabase/README.md`; lisans/gizlilik işinde ayrıca
`docs/contact-privacy-review.md` oku. Atıl DB testleri ve canlı smoke testi
arasındaki ayrımı `docs/agent-workflow.md` açıklar.

Sır değerlerini çıktılamadan env kullanımını kontrol et. `VITE_*` tarayıcıya
gider; sunucu sırları buraya konmaz. Üretim yayını, canlı kayıt/e-posta ve
anahtar işlemleri ayrı kullanıcı kararı gerektirir. Kullanıcının mevcut
çalışma ağacı değişikliklerini koru. Son rapor Türkçe, kısa ve kanıta dayalı olsun.
