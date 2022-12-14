import { Text } from "react-native-paper";

export default function FormScreen({navigation, route}) {
    const { clinic } = route.params;

    return (
        <Text>{clinic.name}</Text>
    )
}