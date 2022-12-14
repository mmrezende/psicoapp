import { AxiosInstance } from "axios";
import { Clinic } from "../models/Clinic";

export async function getClinics(axios: AxiosInstance) {
    const { data } = await axios.get<{data: Clinic[]}>('/psicoapp/app/clinic');
    
    return data.data;
}