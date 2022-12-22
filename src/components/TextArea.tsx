import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Error } from "../helpers/types";


export const TextArea = ({ ...inputProps } : TextInputProps) => (
    <TextInput
        style={styles.input}
        multiline={true}
        {...inputProps}
      />
);

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        paddingVertical: 32,
        paddingHorizontal: 10,
        borderColor: '#777'
    },
});