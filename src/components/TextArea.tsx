import {  StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {value: string, setValue: (text: string) => void};

export const TextArea = ({value, setValue}: Props) => (
    <TextInput
        style={styles.input}
        multiline={true}
        mode="outlined"
        value={value}
        onChangeText={setValue}
    />
);

const styles = StyleSheet.create({
    input: {
        height: 120,
    },
});