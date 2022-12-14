import { Option } from "./Option";

export enum QuestionType {
    BINARY,
    MULTIPLE_CHOICE,
    SINGLE_CHOICE,
    TEXT
}

export class Question {
    id: number;
    type: QuestionType;
    title: string;
    description?: string;
    options?: Option[];
}