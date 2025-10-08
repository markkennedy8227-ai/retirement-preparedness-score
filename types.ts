
export interface QuestionOption {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface UserData {
  email: string;
  mobile: string;
}

export interface Answer {
  questionId: number;
  questionText: string;
  answerText: string;
  score: number;
}
