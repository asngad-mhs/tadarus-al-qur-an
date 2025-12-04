
import { Surah, QuranApiResponse } from '../types';

const BASE_API_URL = 'https://api.alquran.cloud/v1';

export const getSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(`${BASE_API_URL}/surah`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // The public API wraps data in `data.surahs`, we simplify it
    return data.data; 
  } catch (error) {
    console.error("Failed to fetch surahs:", error);
    throw error;
  }
};

export const getSurahAudioUrl = (surahNumber: number, edition: string = 'ar.alafasy'): string => {
  return `https://cdn.islamic.network/quran/audio-surah/128/${edition}/${surahNumber}.mp3`;
};
