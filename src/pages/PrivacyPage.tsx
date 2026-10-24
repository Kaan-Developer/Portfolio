import { useSite } from "../hooks/useSite";
import Footer from "../components/sections/Footer";

const PrivacyPage = () => {
  const site = useSite();
  return (
  <main className="min-h-screen bg-bg px-6 py-8 text-ink md:px-10 md:py-12">
    <article lang="tr" className="mx-auto max-w-2xl">

      <header className="mt-20 border-b border-border pb-8">
        <p className="text-sm font-medium text-muted">{site.name}</p>
        <h1 className="mt-3 text-balance font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          İletişim Formu Aydınlatma Metni
        </h1>
        <p className="mt-5 leading-7 text-muted">
          Bu metin, iletişim formu üzerinden paylaştığınız kişisel verilerin nasıl
          işlendiğini 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
          kapsamında açıklar. Yurt dışına aktarım ve silme süreçlerinde henüz
          tamamlanmayan düzenlemeler aşağıda ayrıca belirtilmiştir.
        </p>
        <p className="mt-4 text-sm text-muted">
          Son güncelleme: <time dateTime="2026-10-20">20 Ekim 2026</time>
        </p>
      </header>

      <div className="space-y-8 py-8 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-3 [&_p]:leading-7 [&_p]:text-muted [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-primary">
        <section aria-labelledby="privacy-controller">
          <h2 id="privacy-controller">Veri sorumlusu</h2>
          <p>
            Bu portfolyonun sahibi ve iletişim formundaki kişisel verilerin
            işlenme amaçlarını ve yöntemlerini belirleyen veri sorumlusu{" "}
            {site.name}&apos;dir. Kişisel verilerinizle ilgili iletişim adresi:{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
        </section>

        <section aria-labelledby="privacy-data">
          <h2 id="privacy-data">Toplanan veriler ve toplama yöntemi</h2>
          <p>
            Formu gönderdiğinizde adınız, e-posta adresiniz, seçtiğiniz veya
            yazdığınız konu ve mesajınız doğrudan sizden elektronik ortamda,
            otomatik yollarla alınır. Veritabanında mesaj kaydı için bir kimlik
            ve gönderim zamanı alanı da bulunur. E-posta adresiniz, art arda
            gönderimleri sınırlayan kontrol için de kullanılır.
          </p>
          <p>
            Mesajınız için gerekli olmayan kimlik belgesi, parola, ödeme bilgisi
            veya sağlık bilgisi gibi özel nitelikli kişisel verileri paylaşmayın.
          </p>
        </section>

        <section aria-labelledby="privacy-purposes">
          <h2 id="privacy-purposes">İşleme amaçları ve hukuki sebepler</h2>
          <p>
            Genel iletişim taleplerini okuyup yanıtlamak ve formun kötüye
            kullanımını sınırlamak için KVKK madde 5/2-f kapsamındaki meşru menfaat
            dayanağı esas alınır. Buradaki menfaat, gelen yazışmaları yönetmek ve
            iletişim kanalını kullanılabilir tutmaktır. Bu dayanak, temel hak ve
            özgürlüklerinize zarar vermemek ve işlemenin bu amaçlar için zorunlu
            olması şartıyla uygulanabilir.
          </p>
          <p>
            Talebiniz, tarafı olduğunuz bir sözleşmenin kurulması veya yerine
            getirilmesiyle doğrudan ilgiliyse, bunun için gerekli veriler KVKK
            madde 5/2-c kapsamında işlenir. KVKK haklarınıza ilişkin başvuruların
            değerlendirilmesinde ise Kanunun 13. maddesindeki yükümlülüğün yerine
            getirilmesi için madde 5/2-ç esas alınır.
          </p>
          <p>
            Bu işleme sebepleri, yurt dışına aktarım için gereken ayrı hukuki
            şartların yerine geçmez. Formu göndermek veya bu metni okumak açık
            rıza verdiğiniz anlamına gelmez.
          </p>
        </section>

        <section aria-labelledby="privacy-providers">
          <h2 id="privacy-providers">Verilerin aktarıldığı hizmetler</h2>
          <p>
            Mesajınızın kaydedilmesi için form bilgileri Supabase hizmetine
            iletilir. Ana veritabanı İrlanda&apos;daki eu-west-1 bölgesinde barınır.
            Adınız, e-posta adresiniz, konu ve mesajınız ayrıca bildirim e-postası
            oluşturulması ve iletilmesi için Resend&apos;e, bildirimin alınması ve
            yazışmanın yürütülmesi için Google&apos;ın Gmail hizmetine aktarılır.
          </p>
          <p>
            Bu hizmetlerin kullanımı yurt dışına veri aktarımı içerir. Ana
            veritabanının İrlanda&apos;da olması, bütün işlemlerin yalnızca bu
            ülkede gerçekleştiği anlamına gelmez. Hizmetlerin veri işleme
            uygulamaları için{" "}
            <a href="https://supabase.com/legal/privacy-resources/data-residency-and-transfers-faq">
              Supabase&apos;in veri konumu açıklamasını
            </a>{" "}
            ve{" "}
            <a href="https://resend.com/legal/privacy-policy">
              Resend&apos;in gizlilik politikasını
            </a>{" "}
            inceleyebilirsiniz.
          </p>
          <p>
            Bu aktarımlar için KVKK kapsamında bir standart sözleşme
            imzalanmamıştır. Aktarımları karşılayan başka bir 9. madde
            mekanizmasının varlığı da doğrulanmış değildir. Dolayısıyla mevcut
            yurt dışı aktarım sürecinin KVKK&apos;ya uygunluğu sağlanmış olarak
            sunulmamaktadır; bu metnin yayımlanması aktarım eksikliğini gidermez.
          </p>
        </section>

        <section aria-labelledby="privacy-retention">
          <h2 id="privacy-retention">Saklama süresi ve silme</h2>
          <p>
            İletişim mesajları için belirlenen saklama süresi, mesajın gelişinden
            itibaren 90 gündür. Veritabanı için hazırlanan günlük silme işlemi,
            90 günü aşan kayıtları sonraki başarılı çalışmada kaldıracak şekilde
            düzenlenmiştir. Ancak bu işlemin canlı sistemde etkin olduğu ve
            çalıştığı henüz doğrulanmamıştır; bu nedenle otomatik silmenin
            uygulandığı taahhüt edilmemektedir.
          </p>
          <p>
            Bu işlem Gmail&apos;deki bildirimleri ve yanıtları, Resend kayıtlarını,
            gönderim sınırlama kayıtlarını, hizmet günlüklerini veya yedekleri
            silmez. Bu kopyalar için ayrı saklama ve silme süreçlerinin
            tamamlanması gerekir. Mevcut bir mesajınız hakkında bilgi veya silme
            talebi için{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{" "}
            adresine ulaşabilirsiniz.
          </p>
        </section>

        <section aria-labelledby="privacy-rights">
          <h2 id="privacy-rights">KVKK kapsamındaki haklarınız</h2>
          <p>
            KVKK&apos;nın 11. maddesi kapsamında verilerinizin işlenip
            işlenmediğini öğrenebilir; işlenmişse bilgi isteyebilir, işleme
            amacını, amacına uygun kullanılıp kullanılmadığını ve verilerin
            aktarıldığı yurt içindeki veya yurt dışındaki üçüncü kişileri
            öğrenebilirsiniz.
          </p>
          <p>
            Eksik veya yanlış verilerin düzeltilmesini, Kanundaki şartlar
            oluştuğunda silinmesini veya yok edilmesini ve bu işlemlerin verilerin
            aktarıldığı üçüncü kişilere bildirilmesini isteyebilirsiniz. Yalnızca
            otomatik analiz sonucunda aleyhinize bir sonuç oluşmasına itiraz
            edebilir, hukuka aykırı işleme nedeniyle zarar doğmuşsa giderilmesini
            talep edebilirsiniz. Ayrıntılar için{" "}
            <a href="https://www.kvkk.gov.tr/Icerik/2036/Ilgili-Kisinin-Haklari">
              Kurumun ilgili kişi hakları açıklamasını
            </a>{" "}
            inceleyebilirsiniz.
          </p>
        </section>

        <section aria-labelledby="privacy-requests">
          <h2 id="privacy-requests">Başvuru ve yanıt süreci</h2>
          <p>
            Daha önce iletişim sırasında bildirdiğiniz ve sistemde kayıtlı
            e-posta adresinizden{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{" "}
            adresine başvurabilirsiniz. Başvurunuzda talebinizi açıkça belirtin
            ve{" "}
            <a href="https://www.kvkk.gov.tr/Icerik/2062/Basvuru-Hakki">
              Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ
            </a>{" "}
            kapsamındaki zorunlu bilgilere yer verin. Başka biri adına veri
            açıklanmaması için kimliğinizi doğrulamaya yetecek ek bilgi
            gerekebilir; normal iletişim mesajınıza kimlik belgesi eklemeyin.
          </p>
          <p>
            Usulüne uygun başvurular, talebin niteliğine göre mümkün olan en kısa
            sürede ve en geç 30 gün içinde sonuçlandırılır. İşlem kural olarak
            ücretsizdir; ayrıca maliyet gerektiren durumlarda yalnızca Kurulun
            belirlediği tarifeye göre ücret alınabilir.
          </p>
        </section>

        <section aria-labelledby="privacy-sources">
          <h2 id="privacy-sources">Metnin dayanağı</h2>
          <p>
            Bu açıklama, Kişisel Verileri Koruma Kurumunun{" "}
            <a href="https://www.kvkk.gov.tr/Icerik/4132/aydinlatma-yukumlulugunun-yerine-getirilmesinde-uyulacak-usul-ve-esaslar-hakkinda-teblig">
              aydınlatma yükümlülüğüne ilişkin Tebliği
            </a>{" "}
            ve{" "}
            <a href="https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim">
              yurt dışına aktarım açıklaması
            </a>{" "}
            esas alınarak bu iletişim formu için hazırlanmıştır. Kurum veya
            e-Devlet tarafından onaylanmış bir belge değildir.
          </p>
        </section>
      </div>
    </article>
    <Footer />
  </main>
);
};

export default PrivacyPage;
