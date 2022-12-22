import { Option } from "./Option";

export enum QuestionType {
    BINARY = "BINARY",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    SINGLE_CHOICE = "SINGLE_CHOICE",
    TEXT = "TEXT"
}

export class Question {
    id: number;
    type: QuestionType;
    title: string;
    description?: string;
    options?: Option[];
}