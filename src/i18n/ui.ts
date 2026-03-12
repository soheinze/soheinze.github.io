export const languages = {
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
};

export const defaultLang = 'de';

export const ui = {
  de: {
    'nav.home': 'Home',
    'nav.about': 'Über mich',
    'nav.lebenslauf': 'Chronik',
    'nav.contact': 'Kontakt',
    'footer.imprint': 'Impressum',
    'footer.note': 'Gebaut mit Astro, Obsidian & viel Kaffee ☕️',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Me',
    'nav.contact': 'Contact',
    'nav.lebenslauf': 'Lebenslauf',
    'footer.imprint': 'Imprint',
    'footer.note': 'Built with Astro, Obsidian & lots of coffee ☕️',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.lebenslauf': 'Lebenslauf',
    'footer.imprint': 'Mentions légales',
    'footer.note': 'Construit avec Astro, Obsidian & beaucoup de café ☕️',
  },
} as const;
