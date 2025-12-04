
export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

export interface QuranApiResponse {
  code: number;
  status: string;
  data: {
    surahs: Surah[];
    edition: any;
  };
}

export interface SurahAudioApiResponse {
    code: number;
    status: string;
    data: Surah;
}
