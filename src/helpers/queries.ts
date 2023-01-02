import { AxiosInstance } from "axios";
import { Clinic } from "../models/Clinic";
import { Form } from "../models/Form";
import { AnswerGroup, FormattedAnswerGroup } from "./types";

export async function getClinics(axios: AxiosInstance) {
    const { data } = await axios.get<{data: Clinic[]}>('/psicoapp/app/clinic');
    
    return data.data;
}

export async function getForms(axios: AxiosInstance, clinic: Clinic) {
    const { data } = await axios.get<{data: Form[]}>(`/psicoapp/app/${clinic.id}/form`);
    
    return data.data
        .flatMap(form => form.questions) // Join all the forms
        .filter((val, index, arr) => { // Don't render duplicate questions
            return arr.findIndex(val2 => val2.id === val.id) === index;
        });
}

export async function postAnswerGroup(axios: AxiosInstance, answerGroup: FormattedAnswerGroup) {
    return axios.post('/psicoapp/app/answerGroup', answerGroup);
}