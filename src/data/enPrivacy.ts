import type { PrivacyNotice } from "../types/privacy";

export const enPrivacy: PrivacyNotice = {
  language: "en",
  title: "Contact form privacy notice",
  introduction:
    "This notice explains how personal data you share through the contact form is processed under Turkey's Personal Data Protection Law No. 6698 (KVKK). Arrangements for international transfers and deletion that have not yet been completed are described below.",
  updatedLabel: "Last updated:",
  updatedDate: "20 October 2026",
  updatedAt: "2026-10-20",
  sections: [
    {
      id: "privacy-controller",
      title: "Data controller",
      paragraphs: [[
        "The owner of this portfolio and the data controller who determines the purposes and methods of processing personal data submitted through the contact form is ",
        { type: "name" },
        ". For enquiries about your personal data, contact ",
        { type: "email" },
        ".",
      ]],
    },
    {
      id: "privacy-data",
      title: "Data collected and collection method",
      paragraphs: [
        ["When you submit the form, your name, email address, selected or written subject, and message are collected directly from you electronically by automated means. Each message record in the database also has an identifier and submission timestamp. Your email address is also used to limit repeated submissions."],
        ["Do not share information that is unnecessary for your message, such as identity documents, passwords, payment details, or special categories of personal data such as health information."],
      ],
    },
    {
      id: "privacy-purposes",
      title: "Purposes and legal grounds for processing",
      paragraphs: [
        ["The legitimate interest ground under Article 5/2-f of the KVKK is relied on to read and respond to general enquiries and limit misuse of the form. That interest is managing incoming correspondence and keeping the contact channel available. This ground may be used only if processing is necessary for these purposes and does not harm your fundamental rights and freedoms."],
        ["If your enquiry directly concerns entering into or performing a contract to which you are a party, the necessary data is processed under Article 5/2-c of the KVKK. Requests concerning your rights under the KVKK are handled on the basis of Article 5/2-ç to fulfil the obligation under Article 13 of the Law."],
        ["These grounds for processing do not replace the separate legal requirements for international transfers. Submitting the form or reading this notice does not mean that you have given explicit consent."],
      ],
    },
    {
      id: "privacy-providers",
      title: "Services that receive your data",
      paragraphs: [
        ["Form data is sent to Supabase to save your message. The primary database is hosted in the eu-west-1 region in Ireland. Your name, email address, subject, and message are also transferred to Resend to create and send email notifications, and to Google's Gmail service to receive notifications and manage correspondence."],
        [
          "Using these services involves international data transfers. Hosting the primary database in Ireland does not mean that all processing takes place only in that country. For information about the services' data processing practices, see ",
          {
            type: "link",
            text: "Supabase's explanation of data residency",
            href: "https://supabase.com/legal/privacy-resources/data-residency-and-transfers-faq",
          },
          " and ",
          {
            type: "link",
            text: "Resend's privacy policy",
            href: "https://resend.com/legal/privacy-policy",
          },
          ".",
        ],
        ["No standard contract under the KVKK has been signed for these transfers. The existence of another mechanism under Article 9 covering these transfers has not been verified either. The current international transfer process is therefore not presented as compliant with the KVKK; publishing this notice does not remedy the missing transfer arrangements."],
      ],
    },
    {
      id: "privacy-retention",
      title: "Retention and deletion",
      paragraphs: [
        ["The defined retention period for contact messages is 90 days from receipt. A daily database deletion operation has been prepared to remove records older than 90 days on its next successful run. However, it has not yet been verified that this operation is enabled and running in production, so automatic deletion is not promised."],
        [
          "This operation does not delete Gmail notifications and replies, Resend records, rate limit records, service logs, or backups. Separate retention and deletion processes must be completed for these copies. For information about an existing message or to request its deletion, contact ",
          { type: "email" },
          ".",
        ],
      ],
    },
    {
      id: "privacy-rights",
      title: "Your rights under the KVKK",
      paragraphs: [
        ["Under Article 11 of the KVKK, you may learn whether your personal data has been processed; request information about processing; learn its purpose and whether it is used for that purpose; and learn which third parties in Turkey or abroad have received it."],
        [
          "You may request correction of incomplete or inaccurate data, deletion or destruction when the conditions in the Law are met, and notification of these actions to third parties that received the data. You may object to a result against you arising solely from automated analysis and request compensation for damage caused by unlawful processing. For details, see ",
          {
            type: "link",
            text: "the Authority's explanation of data subject rights",
            href: "https://www.kvkk.gov.tr/Icerik/2036/Ilgili-Kisinin-Haklari",
          },
          ".",
        ],
      ],
    },
    {
      id: "privacy-requests",
      title: "Requests and response process",
      paragraphs: [
        [
          "You may submit a request to ",
          { type: "email" },
          " from the email address you previously provided during correspondence and that is recorded in the system. Clearly describe your request and include the required information under the ",
          {
            type: "link",
            text: "Communiqué on the Principles and Procedures for Requests to the Data Controller",
            href: "https://www.kvkk.gov.tr/Icerik/2062/Basvuru-Hakki",
          },
          ". Additional information sufficient to verify your identity may be needed to avoid disclosing someone else's data; do not attach an identity document to an ordinary contact message.",
        ],
        ["Requests submitted in accordance with the applicable procedure are answered as soon as possible, depending on their nature, and within 30 days at the latest. The process is generally free of charge; where it creates an additional cost, a fee may be charged only in accordance with the tariff set by the Board."],
      ],
    },
    {
      id: "privacy-sources",
      title: "Basis of this notice",
      paragraphs: [[
        "This notice was prepared for this contact form based on the Turkish Personal Data Protection Authority's ",
        {
          type: "link",
          text: "Communiqué on the obligation to inform",
          href: "https://www.kvkk.gov.tr/Icerik/4132/aydinlatma-yukumlulugunun-yerine-getirilmesinde-uyulacak-usul-ve-esaslar-hakkinda-teblig",
        },
        " and ",
        {
          type: "link",
          text: "explanation of international transfers",
          href: "https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim",
        },
        ". It is not a document approved by the Authority or Turkey's e-Government service.",
      ]],
    },
  ],
};
