export enum Language {
  English = 'English',
  Bulgarian = 'Bulgarian',
}

export const languageToTranslateKey = {
  [Language.English]: 'english',
  [Language.Bulgarian]: 'bulgarian',
};

export const languageToLocale = {
  [Language.English]: 'en',
  [Language.Bulgarian]: 'bg',
};
