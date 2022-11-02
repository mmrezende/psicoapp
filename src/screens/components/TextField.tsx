import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Error } from "../../helpers/types";

interface Props {
    label: string;
    error?: Error;
}

export const TextField = ({ label, error, ...inputProps } : Props & TextInputProps) => (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        {...inputProps}
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    label: {
        marginVertical: 8
    },
    input: {
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: '#777'
    },
    errorMessage: {
        paddingVertical: 5,
        color: '#F00'
    }
});