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

  projects: [{
    title: "Portfolyo",
    image: portfolioHero,
    slug: "portfolio",
    description:
      "Çalışmalarımı tanıtmak ve benimle iletişime geçilmesini sağlamak için tasarlayıp tek başıma geliştirdiğim kişisel portfolyom.",
    tech: ["React", "TypeScript", "Tailwind", "Supabase"],
    github: "https://github.com/Kaan-Developer/Portfolio",
    caseStudy: {
      problem:
        "Ziyaretçilerin beni tanıyabileceği, projelerimi ve becerilerimi görebileceği ve benimle iletişime geçebileceği kişisel bir web sitesine ihtiyacım vardı.",
      contribution:
        "Bu web sitesini tek başıma tasarlayıp geliştirdim. Farklı ekran boyutlarına uyum sağlayan React arayüzünü, gezinme menüsünü, proje detay sayfalarını ve iletişim formunu hazırladım. Mesajları kaydeden ve gerekli yapılandırma yapıldığında Resend üzerinden e-posta bildirimi gönderen Supabase sunucu fonksiyonunu da geliştirdim.",
      decisions: [
        "Metinleri sayfa bileşenlerine dokunmadan güncelleyebilmek için site ve proje içeriklerini TypeScript veri dosyalarında tutuyorum.",
        "Ana sayfada bölüm bağlantıları, proje detay sayfalarında ise React Router kullanıyorum. Böylece her projeye doğrudan bir adres üzerinden erişilebiliyor.",
        "Farklı ekran boyutlarına uyum sağlayan düzenler ve site genelinde ortak stiller oluşturmak için Tailwind CSS kullanıyorum.",
        "İletişim formundan gelen verileri, istekleri doğrulayıp mesajları kaydeden bir Supabase sunucu fonksiyonuna gönderiyorum. E-posta bildirimleri, API anahtarı tanımlandığında Resend üzerinden gönderiliyor; bu anahtar tarayıcı kodunda yer almıyor.",
      ],
      outcome:
        "Site; kendimi tanıttığım bölümü, becerilerimi ve proje bağlantılarımı bir araya getiriyor. Her proje için ayrı bir detay sayfası bulunuyor. İletişim formu, veri doğrulaması ve mesajları kaydetmek için Supabase entegrasyonu içeriyor.",
    },
    blogs: [
      {
        title: "Portfolyomu geliştirirken",
        content:
          "Bu portfolyoyu React, TypeScript, Vite ve Tailwind CSS kullanarak kendim tasarlayıp geliştirdim. Ana sayfada kendimi tanıtıyor, projelerimi ve becerilerimi paylaşıyorum. Sayfada bir iletişim formu da bulunuyor.\n\nProje içerikleri TypeScript veri dosyalarında tutuluyor. Proje kartları ve detay sayfaları aynı veriyi kullandığı için bir projenin açıklamasını, kullandığı teknolojileri ve geliştirme notlarını tek bir yerden güncelleyebiliyorum. React Router, her projenin adres tanımlayıcısını kullanarak ilgili detay sayfasını açıyor.\n\nİletişim formu, gönderilen verileri bir Supabase sunucu fonksiyonuna iletiyor. Bu fonksiyon verileri doğruluyor, gönderim sıklığı sınırlarını kontrol ediyor ve kabul edilen mesajları veritabanına kaydediyor. API anahtarı tanımlanmışsa Resend üzerinden e-posta bildirimi göndermeyi de deniyor.",
      },
    ],
  }],

  projectDetails: {
    problem: "Problem",
    contribution: "Geliştirdiklerim",
    decisions: "Teknik kararlar",
    outcome: "Sonuç",
    blogs: "Geliştirme notları",
    imageAlt: "proje görünümü",
  },

  privacy: trPrivacy,

  buttons: {
    projectBtn: "Projeleri gör",
    letsContactBtn: "Konuşalım",
    contactBtn: "İletişime geç",
    viewDetailsBtn: "Detayları gör",
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
      hi: "Hakkımda",
      description:
        "React ve Tailwind CSS ile responsive arayüzler geliştiriyorum. HTML, CSS ve JavaScript ile başladım, şimdi React projelerime TypeScript ekliyorum.",
      description2:
        "Bu portfolyoyu; navigasyonu, proje sayfaları ve iletişim formu dahil olmak üzere tasarladım ve geliştirdim. Şu anki odağım JavaScript ve React temellerimi geliştirmek.",
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
