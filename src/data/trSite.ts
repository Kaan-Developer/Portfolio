import type { enSite } from "./enSite";

export const trSite: typeof enSite = {
  name: "Kaan Hamitler",
  role: "Frontend Geliştirici",

  littleDesc: "React ve Tailwind CSS ile responsive web arayüzleri geliştiriyorum.",

  links: {
    github: "https://github.com/Kaan-Developer",
  },

  bubbles: [
    { label: "Ana Sayfa", target: "home" },
    { label: "Projeler", target: "projects" },
    { label: "Hakkımda", target: "about" },
  ],

  projectsSection: {
    title: "Geliştirdiklerim",
    description: "Kaynak kodu ve geliştirme notlarıyla frontend projeleri.",
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
      subjectLabel: "Konu (isteğe bağlı)",
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
      errorMessage: "Mesaj gönderilemedi. Alanları kontrol edip tekrar deneyin.",
      privacyNote: "Bilgileriniz yalnızca talebinize yanıt vermek için kullanılır.",
    },
  },
};