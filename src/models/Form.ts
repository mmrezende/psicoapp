import { Question } from "./Question";

export class Form {
    id: number;
    name: string;
    recurrence_days: number;
    questions?: Question[];
    description?: string;
    code: string;
    type_code: string;
}