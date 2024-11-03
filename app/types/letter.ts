export interface LetterDetails {
  letter: string;
  lowercase: string;
  word: string;
  pronunciation: string;
  audioPath?: string;
}

export type LetterPair = {
  uppercase: string;
  lowercase: string;
} 