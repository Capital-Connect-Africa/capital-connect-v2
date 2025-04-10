import { Question, Answer } from "../../features/questions/interfaces";



export interface Submission {
  id?: number;
  userId?: number;
  questionId: number;
  answerId: number;
  answerIds?: number[];
  text?:string;
}

export enum RequestType{
  SAVE ='save',
  EDIT ='edit'
}

export interface SubmissionResponse {
  answer: {
    id: number;
  };
  id: number;
  question: {
    id: number;
  };
  user: {
    id: number;
  };
}

export interface UserSubmissionResponse {
  id: number;
  answer: Answer;
  answers?: Answer[];
  question: Question;
  text: string;
  explanation : string;
}

export interface GeneralSummary{
  id: number,
  score: string,
  comment: string,
  implication: string,
  action: string,
  recommendation : string
  type : string
}