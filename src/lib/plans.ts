// === Velion Lab — Планове за достъп ===
// Цените и съдържанието на трите тиара. Промениш ли тук — checkout и
// маркетингът се обновяват автоматично.

export type Plan = {
  id: "foundation" | "complete" | "elite";
  name: string;
  tagline: string;
  price: number; // в лв.
  currency: string;
  oneTime: boolean;
  highlight?: boolean;
  perks: string[];
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "foundation",
    name: "Foundation",
    tagline: "Основата",
    price: 49,
    currency: "лв.",
    oneTime: true,
    perks: [
      "Първите три модула — основата на контрола",
      "Дневни упражнения за дишане",
      "Достъп от всяко устройство",
      "Без месечни такси",
    ],
    cta: "Започни от основата",
  },
  {
    id: "complete",
    name: "Complete",
    tagline: "Пълният път",
    price: 99,
    currency: "лв.",
    oneTime: true,
    highlight: true,
    perks: [
      "Всички 8 модула · 40+ урока",
      "Пожизнен достъп — без подновяване",
      "Всички упражнения и трекери",
      "Бъдещи обновления — безплатни",
    ],
    cta: "Влез в системата",
  },
  {
    id: "elite",
    name: "Elite",
    tagline: "Личен подход",
    price: 199,
    currency: "лв.",
    oneTime: true,
    perks: [
      "Всичко от Complete",
      "Един персонален разговор · 60 мин",
      "Личен план за първите 30 дни",
      "Дискретна поддръжка по email",
    ],
    cta: "Заяви Elite",
  },
];

export const getPlan = (id: string): Plan | undefined =>
  plans.find((p) => p.id === id);
