export interface Inspiration {
  name: string;
  years: string;
  role: string;
  /** Factual summary of who they were. */
  about: string;
  /** Optional: in your own words, why they inspire you. Shown under the summary when set. */
  why?: string;
  link: string;
}

export const inspirations: Inspiration[] = [
  {
    name: "Mustafa Kemal Atatürk",
    years: "1881–1938",
    role: "Founder of the Republic of Türkiye",
    about:
      "Founded the Republic of Türkiye and served as its first president from 1923 until 1938. He led sweeping reforms in education, law and society that modernised the country.",
    link: "https://en.wikipedia.org/wiki/Mustafa_Kemal_Atat%C3%BCrk",
  },
  {
    name: "Mahammad Amin Rasulzade",
    years: "1884–1955",
    role: "Founder of the Azerbaijan Democratic Republic",
    about:
      "Politician and journalist who led the Azerbaijani National Council and is considered the founder of the Azerbaijan Democratic Republic in 1918 and the father of its statehood.",
    link: "https://en.wikipedia.org/wiki/Mahammad_Amin_Rasulzade",
  },
  {
    name: "Lotfi A. Zadeh",
    years: "1921–2017",
    role: "Mathematician and computer scientist",
    about:
      "Born in Baku, he became a professor of computer science at UC Berkeley and introduced fuzzy sets and fuzzy logic, ideas now used in control systems and artificial intelligence.",
    link: "https://en.wikipedia.org/wiki/Lotfi_A._Zadeh",
  },
];
