import type { enSite } from "./enSite";
import portfolioHero from "../assets/images/portfolioHero.png";
import { trPrivacy } from "./trPrivacy";

export const trSite: typeof enSite = {
  name: "Kaan Hamitler",
  role: "Frontend Geliştirici",

  littleDesc:
    "React ve Tailwind CSS ile responsive web arayüzleri geliştiriyorum.",

  links: {
    github: "https://github.com/Kaan-Developer",
  },

  bubbles: [
    { label: "Ana Sayfa", target: "home" },
    { label: "Projeler", target: "projects" },
    { label: "Hakkımda", target: "about" },
  ],

  projects: [
    {
      title: "Portfolyo",
      image: portfolioHero,
      slug: "portfolio",
      description:
        "Proje notları ve Supabase iletişim formu içeren, Türkçe ve İngilizce React portfolyosu.",
      tech: ["React", "TypeScript", "Tailwind", "Supabase"],
      github: "https://github.com/Kaan-Developer/Portfolio",
      caseStudy: {
        problem:
          "Frontend çalışmalarımı sunabileceğim ve iletişim taleplerini alabileceğim tek bir yere ihtiyacım vardı.",
        contribution:
          "Arayüz tasarımını, responsive düzenleri, gezinmeyi, proje sayfalarını ve iletişim formunun sunucu fonksiyonunu geliştirdim.",
        decisions: [
          "Proje kartları ve detay sayfaları aynı veriyi kullanıyor; açıklama ve bağlantılar tek yerden güncelleniyor. Türkçe ve İngilizce içerikler ayrı dosyalarda tutuluyor.",
          "Ana sayfada bölüm bağlantıları, proje detaylarında React Router kullanıyorum. Böylece ana sayfadaki gezinme sade kalırken detaylar doğrudan bir bağlantıyla paylaşılabiliyor.",
          "İletişim fonksiyonu isteği doğrulayıp mesajı kaydettikten sonra Resend bildirimini deniyor. Bildirim başarısız olursa veritabanı kaydı korunuyor; e-posta tesliminin ayrıca izlenmesi gerekiyor.",
          "Tarayıcıda Supabase'in publishable anahtarı kullanılıyor. Veritabanına yazma işlemi ve Resend anahtarı sunucu fonksiyonunda kalıyor.",
        ],
        outcome:
          "Portfolyo; Türkçe ve İngilizce içerik, doğrudan açılabilen proje sayfaları ve e-posta bildirimi başarısız olsa da mesajı saklayabilen bir iletişim akışı içeriyor.",
      },
      blogs: [
        {
          title: "Proje içeriği",
          content:
            "Proje kartları ve detay sayfaları, seçili dilin proje verisini kullanıyor. Başlık veya bağlantı bu veride değiştirildiğinde iki görünüm de güncelleniyor.\n\nOrtak Project tipi her kaydın yapısını denetlerken metinler veri dosyalarında tutuluyor. Böylece metin değişiklikleri için render bileşenlerini düzenlemek gerekmiyor. Çeviriler ayrı dosyalarda olduğundan slug ve bağlantıları eşleşmiş tutmak gerekiyor.",
        },
      ],
    },
    {
      title: "Portfolyo",
      image: portfolioHero,
      slug: "portfolio-2",
      description:
        "Proje notları ve Supabase iletişim formu içeren, Türkçe ve İngilizce React portfolyosu.",
      tech: ["React", "TypeScript", "Tailwind", "Supabase"],
      github: "https://github.com/Kaan-Developer/Portfolio",
      caseStudy: {
        problem:
          "Frontend çalışmalarımı sunabileceğim ve iletişim taleplerini alabileceğim tek bir yere ihtiyacım vardı.",
        contribution:
          "Arayüz tasarımını, responsive düzenleri, gezinmeyi, proje sayfalarını ve iletişim formunun sunucu fonksiyonunu geliştirdim.",
        decisions: [
          "Proje kartları ve detay sayfaları aynı veriyi kullanıyor; açıklama ve bağlantılar tek yerden güncelleniyor. Türkçe ve İngilizce içerikler ayrı dosyalarda tutuluyor.",
          "Ana sayfada bölüm bağlantıları, proje detaylarında React Router kullanıyorum. Böylece ana sayfadaki gezinme sade kalırken detaylar doğrudan bir bağlantıyla paylaşılabiliyor.",
          "İletişim fonksiyonu isteği doğrulayıp mesajı kaydettikten sonra Resend bildirimini deniyor. Bildirim başarısız olursa veritabanı kaydı korunuyor; e-posta tesliminin ayrıca izlenmesi gerekiyor.",
          "Tarayıcıda Supabase'in publishable anahtarı kullanılıyor. Veritabanına yazma işlemi ve Resend anahtarı sunucu fonksiyonunda kalıyor.",
        ],
        outcome:
          "Portfolyo; Türkçe ve İngilizce içerik, doğrudan açılabilen proje sayfaları ve e-posta bildirimi başarısız olsa da mesajı saklayabilen bir iletişim akışı içeriyor.",
      },
      blogs: [
        {
          title: "Proje içeriği",
          content:
            "Proje kartları ve detay sayfaları, seçili dilin proje verisini kullanıyor. Başlık veya bağlantı bu veride değiştirildiğinde iki görünüm de güncelleniyor.\n\nOrtak Project tipi her kaydın yapısını denetlerken metinler veri dosyalarında tutuluyor. Böylece metin değişiklikleri için render bileşenlerini düzenlemek gerekmiyor. Çeviriler ayrı dosyalarda olduğundan slug ve bağlantıları eşleşmiş tutmak gerekiyor.",
        },
      ],
    },
  ],

  projectDetails: {
  problem: "Problem",
  contribution: "Geliştirdiklerim",
  decisions: "Teknik kararlar",
  outcome: "Sonuç",
  blogs: "Geliştirme notları",
  imageAlt: "proje görünümü",
},

  privacy: trPrivacy,

  accessibility: {
    home: "Kaan - Ana sayfa",
    openMenu: "Gezinme menüsünü aç",
    closeMenu: "Gezinme menüsünü kapat",
    primaryNavigation: "Ana gezinme",
    mobileNavigation: "Mobil gezinme",
    contactNavigation: "İletişim bağlantıları",
    footerNavigation: "Alt bilgi bağlantıları",
    language: "Dil",
    opensInNewTab: "(yeni sekmede açılır)",
    backToTop: "Sayfanın başına dön",
    enlargeImage: "Proje görselini büyüt",
    imagePreview: "Görsel önizlemesi",
    closePreview: "Önizlemeyi kapat",
  },

  notFound: {
    title: "Sayfa bulunamadı",
    description: "Aradığınız sayfa mevcut değil.",
    backToHome: "Ana sayfaya dön",
  },

  buttons: {
    projectBtn: "Projeleri gör",
    letsContactBtn: "Konuşalım",
    contactBtn: "İletişime geç",
    viewDetailsBtn: "Detayları gör",
    liveDemoBtn: "Canlı demo",
    copyEmailBtn: "E-posta adresini kopyala",
    copyLoading: "Kopyalanıyor...",
    succesCopy: "Kopyalandı",
    sendBtn: "Mesaj gönder",
  },

  dashbord: {
    allProjects: "Tüm Projeler",
    privacyNote: "İletişim Aydınlatma Metni",
    backto: "Portfolyoya dön.",
  },

  projectsSection: {
    title: "Geliştirdiklerim",
    description: "Kaynak kodu ve geliştirme notlarıyla frontend projeleri.",
  },

  footer: {
    Allrightsreserved: "Tüm hakları saklıdır.",
  },

  about: [
    {
      hi: "Merhaba, ben Kaan.",
      description:
        "Web arayüzleri geliştiriyorum. React ve TypeScript öğrenirken öğrendiklerimi projelerimde uyguluyorum.",
      description2:
        "Şu sıralar erişilebilirlik, API kullanımı ve daha iyi kullanıcı deneyimleri üzerine çalışıyorum.",
      techTitle: "Kullandığım Teknolojiler",
      tech: ["React", "TypeScript", "JavaScript", "Tailwind", "HTML", "CSS"],
      tools: ["Git", "GitHub", "Figma", "Vite"],
    },
  ],

  skills: {
    title: "Yeteneklerim",
    technologies: "Teknolojiler",
    tools: "Araçlar",
  },

  contact: {
    email: "kaandeveloperr07@gmail.com",
    title: "İletişime geçin",
    description:
      "Bir proje, iş fırsatı veya başka bir konu hakkında mesaj gönderin. 24 saat içinde yanıt vermeyi hedefliyorum.",

    form: {
      nameLabel: "Ad",
      namePlaceholder: "Adınız",
      emailLabel: "E-posta",
      emailPlaceholder: "you@example.com",
      subjectLabel: "Konu",
      subjectOptionalLabel: "İsteğe bağlı",
      subjectPlaceholder: "Bir konu seçin",
      otherSubjectPlaceholder: "Konuyu kısaca belirtin",
      otherSubjectLabel: "Diğer konu",
      characters: "karakter",
      subjectOptions: [
        { label: "Proje Talebi", value: "project" },
        { label: "İş Fırsatı", value: "job" },
        { label: "İş Birliği", value: "collaboration" },
        { label: "Diğer", value: "other" },
      ],
      messageLabel: "Mesaj",
      messagePlaceholder: "Üzerinde ne çalışıyorsunuz?",
      submitLabel: "Mesaj gönder",
      submittingLabel: "Gönderiliyor…",
      successMessage: "Mesaj kaydedildi. Teşekkürler.",
      errorMessage:
        "Mesaj gönderilemedi. Alanları kontrol edip tekrar deneyin.",
      privacyNote:
        "Bilgileriniz yalnızca talebinize yanıt vermek için kullanılır.",
      privacyTitle: "İletişim gizlilik bildirimi",
    },
  },
};
