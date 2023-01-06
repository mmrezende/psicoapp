import { QuestionType } from "../helpers/types";
import { Option } from "./Option";

export class Question {
    id: number;
    type: QuestionType;
    title: string;
    description?: string;
    options?: Option[];
}