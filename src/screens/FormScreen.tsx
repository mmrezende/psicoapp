import { useEffect } from "react";
import { Text } from "react-native-paper";

export default function FormScreen({navigation, route}) {
    const { clinic } = route.params;

    useEffect(() => {
        
    }, [clinic]);

    return (
        <Text>{clinic.name}</Text>
    )
}