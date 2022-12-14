import { AxiosInstance } from "axios";
import { Clinic } from "../models/Clinic";
import { Form } from "../models/Form";

export async function getClinics(axios: AxiosInstance) {
    const { data } = await axios.get<{data: Clinic[]}>('/psicoapp/app/clinic');
    
    return data.data;
}

export async function getForms(axios: AxiosInstance, clinic: Clinic) {
    const { data } = await axios.get<{data: Form[]}>(`/psicoapp/app/${clinic.id}/form`);
    
    return data.data;
}