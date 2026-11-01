# Portfolio ajan iş akışı

## Önce okunacak ortak süreç

Etkin `CODEX_HOME` altındaki `agent-workflow.md` dosyasını oku. `CODEX_HOME`
atanmamışsa varsayılan `~/.codex/agent-workflow.md`; bu kurulumda
`C:/Users/Eray/.codex/agent-workflow.md`. Görev devri, mesajlaşma, dosya sahipliği,
bağımsız inceleme, rapor şablonları ve tamamlanma kuralları orada tek yerde tutulur.
Dosya başka bilgisayarda yoksa otomatik yüklenmiş varsayma; eksik kurulum diye bildir.

Kişisel roller `~/.codex/agents/{researcher,frontend_engineer,backend_engineer,
quality_reviewer,security_reviewer,design_reviewer,compliance_reviewer}.toml`.
Frontend geliştiricisi ve tasarım denetçisi ayrıca kökteki `DESIGN.md` okur.
Gizlilik/lisans denetiminde `docs/contact-privacy-review.md` ve backend
incelemesinde `supabase/README.md` okunur. Dosyanın varlığı otomatik yüklenme kanıtı değildir.

## Proje kontrolleri

| Kontrol | Komut | Kapsam / sınır |
| --- | --- | --- |
| Birim test | `pnpm test` | Menü deposu, mevcut 3 Node testi |
| Lint | `pnpm lint` | Oxlint; tarayıcı davranışını kanıtlamaz |
| Tip | `pnpm exec tsc -b --force` | Frontend ve Vite ayarları |
| Build | `pnpm build` | Frontend `dist/`; Edge Function/SQL dahil değil |
| Yerel UI | `pnpm dev` | Ekran/klavye/viewport kontrolleri ayrıca raporlanır |
| DB | `supabase/README.md` içindeki atıl DB komutları | Yalnız yerel `portfolio_test`; Docker erişimi önce kontrol edilir |

`node supabase/tests/contact-smoke.mjs` gerçek mesaj/e-posta oluşturabilir;
kurulum veya salt inceleme testi olarak çalıştırma. Deno yoksa Edge Function
tip kontrolü doğrulanmadı yaz. Canlı Supabase bağlantısını test izni varsayma.

İletişim sözleşmesi: frontend `name,email,subject,otherSubject,message,website`
alanlarını `contact` Edge Function'a yollar. Değişiklikte doğrulama, rate limit,
kayıt ve e-posta hata davranışı frontend/backend arasında birlikte değerlendirilir.

## Sürüm ve rapor kaydı

Koordinatör bir görev için `git rev-parse HEAD`, başlangıç `git status --short`
ve ilgili çalışma ağacı dosyalarının SHA-256 listesini kaydeder. Dirty dosyalar
varsa yalnız HEAD kimliği yeterli değildir. İnceleme boyunca ilgili dosyalar
değişmez; değişirse yeni manifest ve ayrı tekrar denetimi gerekir.

Yerel geçici görev kaydı ve raporları repoya sır taşımadan etkin Codex ana
dizininin `agent-runs/<görev-kimliği>/` klasöründe tut. `status.md` yalnız
koordinatöre aittir; her ajan `<rol>-<görev>.md` dosyasına yazar. Projeye kalıcı
rapor gerekiyorsa önce kişisel/ortam verilerini ayıkla. Ortak şablonları kopyalama;
kişisel süreç belgesindeki görev devri ve denetçi şablonunu doldur.

## Kurulum kabul planı

1. Ortam/override kaynaklarını ve başlangıç kontrollerini doğrula; mevcut değişiklikleri koru.
2. Kullanıcı ayarını ve talimatları repo dışında yedekle; 7 kişisel rolü ve ortak süreci yaz.
3. Kısa proje talimatı ve mevcut tasarım envanterini oluştur; ürün kodunu değiştirme.
4. Gerçek istemci parser'ı, config katmanları ve model-visible prompt ile yüklemeyi sına.
5. Bir geliştirici ve iki ayrı denetçiyi temiz bağlamlarda çalıştır; takip mesajını ve sonuçları topla.
6. Bulguları düzeltip ilgili bağımsız kontrolü al; proje kontrollerini ve ürün hashlerini tekrar doğrula.

Kurulum kanıtı ve geri alma yolu: `docs/agent-setup-report.md`. Yazıldı, yüklendi
ve çalışması doğrulandı ayrı durumlardır; devam eden oturum yeni dosyaları
otomatik yeniden yükledi varsayılmaz.
