export interface Question {
  id: number;
  text: string;
  category: string;
  weight: number;
}

export interface Answer {
  questionId: number;
  response: string;
  score: number;
}

export interface Evaluation {
  score: number;
  feedback: string;
  recommendation: string;
}

export interface CategoryScore {
  [key: string]: number;
}