import { en, i18nOptionsTypes } from "./i18n";

export const geti18n = (str: i18nOptionsTypes): string => {
  return en[str];
};