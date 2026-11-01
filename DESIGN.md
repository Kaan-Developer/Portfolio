# Portfolio tasarım kaynağı

Bu belge mevcut uygulamanın envanteridir; yeni bir tasarım kararı değildir.
Kaynak: 31 Ekim 2026, HEAD `adc4bb0ca0fbf79865bd0e8371a1f7c375dfcd76`
ve başlangıçta kullanıcı tarafından değiştirilmiş `Hero.tsx` çalışma ağacı.
Frontend geliştiricisi ve design_reviewer bu ortak kaynağı okur.

## Mevcut kodda gözlemlenen

Kaynaklar: `src/index.css`, `src/pages/AnaPage.tsx`, `src/components/sections/`,
`src/components/ui/`, `src/main.tsx`. Ekran gözlemi ile statik kod envanterini karıştırma.

### Renk ve tipografi

| Amaç | Tanım |
| --- | --- |
| Arka plan / yüzey | `#f8fafc` / `#ffffff` |
| Başlık / gövde | `#0f172a` / `#1e293b` |
| İkincil metin | `#64748b` |
| Vurgu / hover | `#2563eb` / `#1d4ed8` |
| Açık vurgu | `#eff6ff` |
| Sınır / güçlü sınır | `#e2e8f0` / `#cbd5e1` |

`src/index.css` tema token'ları kaynaktır. Gövde Instrument Sans Variable,
başlık Bricolage Grotesque Variable, serif Instrument Serif olarak tanımlı.
`src/main.tsx` yalnız Bricolage ve Instrument Serif italic import ediyor;
Instrument Sans'ın gerçekten yüklendiği doğrulanmadı, sistem fallback'i olabilir.
Hero ad satırı `text-5xl → md:text-7xl`, rol `text-4xl → lg:text-6xl`;
bölüm başlıkları genellikle `text-4xl → md:text-6xl`. Gövde `text-base` ile
`md:text-xl` arasında; bileşene göre değişir, tek ölçek uygulanmış varsayma.

### Yerleşim ve bileşenler

- Ana kapsayıcı `max-w-6xl`, `px-10`, `xl:px-0`; bölümler çoğunlukla
  `py-10 → md:py-14`. Kart arası `gap-6`; iç boşluklar `gap-2/3/4/5`.
  Hero ayrıca `mt-30 pt-40 mb-20` kullanır.
- Radius token'ları: sm `.5rem`, md `.75rem`, lg `1rem`, xl `1.25rem`,
  2xl `1.5rem`. Kartlar çoğunlukla `rounded-2xl`, kontroller `rounded-md`,
  rozetler `rounded-full`. Soft/medium/large gölgeler düşük opaklıkta siyahtır.
- Navbar sabit, `top-5/md:top-6`, `h-20`, `max-w-6xl`; kaydırınca sınır,
  yarı saydam zemin, blur ve gölge alır. Mobil menü `lg` altında gösterilir.
- Hero ve proje kartları mobil tek, `lg` üstünde iki sütun. Proje görselleri
  16:10 ve `object-contain`. Mevcut hero sağ sütunu boş, `aria-hidden` 16:9
  çerçevedir; kullanıcı çalışma ağacı değişikliği kalıcı onay sayılmaz.
- İletişim mobil tek, `lg` üstünde `1fr 3fr`; isim/e-posta `sm` üstünde iki
  sütun. Gizlilik sayfası `max-w-2xl`, proje detayı `max-w-4xl`.
- Butonlar çoğunlukla `h-12`; siyah, mavi, beyaz outline varyantları; hover
  rengi ve active `.98` scale. Form alanları beyaz, sınırlı, mavi odak halkalı.
  Konu seçimi gerçek radio input ile seçili durum gösterir.
- TR/EN seçimi `aria-pressed`, localStorage ve HTML `lang` güncellemesi kullanır.

### Erişilebilirlik ve hareket

Genel `focus-visible`: 2px mavi outline, 3px offset. Menü `aria-expanded`,
`aria-controls`, kapalı panelde `inert/aria-hidden` kullanır. Etiket ve dekoratif
ikon erişilebilirlik özelliklerinin varlığı bütün akışın uygun olduğunu kanıtlamaz.

Intro 1.2 saniyelik sayaç ve .75 saniyelik çıkış; Reveal 32px/.7 saniye ve ilk
görünümde çalışır. Kart hover'ı `-translate-y-1.5`, görsel scale `1.025`.
Reduced-motion durumunda intro atlanır, Lenis başlamaz, CSS süreleri azaltılır.
Yeni işlerde bu mevcut azaltılmış hareket yolunu koru; yeni animasyon için
kullanıcı amacı ve hareket tercihini değerlendir.

## Bu görevde onaylanan tercihler

Ürün tasarımını değiştirmemek ve mevcut durumu belgelemek açıkça istendi.
Renk/font/yerleşim/animasyonların ayrıca onaylandığına dair kanıt yok.
Kodda bulunmaları kullanıcı onayı anlamına gelmez.

## Ayrı öneriler ve doğrulanacak adaylar

Kurulum bu adayları düzeltmez; ayrı ürün görevi gerekir.

| Konum | Gözlem / gerekçe | Öneri ve doğrulama |
| --- | --- | --- |
| `src/main.tsx`, `src/index.css` | Gövde font tanımı ile import'lar farklı | Tarayıcı font yüklemesini kontrol et; gerekiyorsa mevcut Instrument Sans'ı yükle |
| `Hero.tsx` sağ çerçeve | İçerik vermeden alan ayırıyor; görsel süs gibi algılanabilir | Kullanıcı kararıyla gerçek proje görseli veya metin ağırlıklı düzen |
| `Hero.tsx` `lg:Text-8xl` | Büyük T içeren utility sınıfı şüpheli | Üretilen CSS ve gerçek geniş ekran ölçüsünü kontrol et |
| `Contact.tsx` submitState | success/error saklanıyor, JSX'te yalnız sending görünüyor | Başarı/hata geri bildirimini ve ekran okuyucu duyurusunu ürün görevinde doğrula |
| `Zoom.tsx` | Dialog/Escape var; focus trap ve odak iadesi kodda görünmüyor | Gerçek klavye testi, gerekiyorsa odak yönetimi |
| `Projects.tsx` GitHub bağlantısı | Dekoratif ikonun yanında erişilebilir ad görünmüyor | Erişilebilirlik ağacında adı doğrula; gerekiyorsa açık ad ver |

İkon kütüphanesi, mavi vurgu veya kart kullanımı tek başına AI görünümü kusuru değildir.

## Kontrol sınırı

Yerel Vite sunucusu başlatıldı. Kullanılabilir tarayıcı aracıyla açma girişimi
"The browser access host is unavailable" hatası verdi; Playwright CLI de kurulu
değil. Yeni araç kurulmadı. Çalışan ekran, viewport'lar, gerçek font, kontrast
oranları, klavye akışı ve animasyon performansı **doğrulanmadı**. Yukarıdaki
bilgiler statik kod incelemesidir; görsel denetim PASS sonucu değildir.
