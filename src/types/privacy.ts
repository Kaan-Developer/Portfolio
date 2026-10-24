export type PrivacyPart =
  | string
  | { type: "name" }
  | { type: "email" }
  | { type: "link"; text: string; href: string };

export interface PrivacyNotice {
  language: "en" | "tr";
  title: string;
  introduction: string;
  updatedLabel: string;
  updatedDate: string;
  updatedAt: string;
  sections: {
    id: string;
    title: string;
    paragraphs: PrivacyPart[][];
  }[];
}
