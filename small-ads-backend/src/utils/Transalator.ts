export enum Language {
  FRENCH = "FRENCH",
  GERMAN = "GERMAN"
}

export interface Word {
  french: string;
  german: string;
}

export default class Translator {
  static t(key: string, language: Language) {
    const word = Translator.words[key];

    if (word) {
      switch (language) {
        case Language.GERMAN:
          return word.german;
        case Language.FRENCH:
          return word.french;
        default:
          return key;
      }
    }
    return key;
  }

  static words: { [key: string]: Word } = {
    "example.firstName": {
      french: "Prénom",
      german: "Vorname"
    },
    "global.on": {
      french: "sur",
      german: "sur DE"
    },
    "exportResultCampaign.campaignCreate": {
      french: "Création de la campagne",
      german: "Création de la campagne DE"
    },
    "exportResultCampaign.sendMail": {
      french: "Mail envoyé",
      german: "Mail envoyé DE"
    },
    "exportResultCampaign.mailOpen": {
      french: "Mail ouvert",
      german: "Mail ouvert DE"
    },
    "exportResultCampaign.clickedLink": {
      french: "Lien cliqué",
      german: "Lien cliqué"
    },
    "exportResultCampaign.dataSend": {
      french: "Donnée envoyée",
      german: "Donnée envoyée DE"
    }
  };
}
