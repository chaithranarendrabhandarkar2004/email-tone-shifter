
export enum ToneType {
  PROFESSIONAL = 'Professional',
  EMPATHETIC = 'Empathetic',
  DIRECT = 'Direct & Concise',
  EXECUTIVE = 'Executive Brief',
  SINCERE_APOLOGY = 'Sincere Apology'
}

export enum LengthType {
  SHORT = 'Short',
  STANDARD = 'Standard',
  DETAILED = 'Detailed'
}

export interface ShiftHistory {
  id: string;
  original: string;
  shifted: string;
  tone: ToneType;
  timestamp: number;
}
