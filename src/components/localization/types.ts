
export interface LocalizationSettings {
  language: string;
  country: string;
  currency: string;
  timezone: string;
  dateFormat: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Timezone {
  code: string;
  name: string;
  offset: string;
}

export interface DateFormat {
  code: string;
  name: string;
  example: string;
}
