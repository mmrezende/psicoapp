import { View, StyleSheet, } from "react-native";
import { Text, TextInput, TextInputProps } from "react-native-paper";
import { Error } from "../helpers/types";

type Props = {errorMessage: Error}

export const TextField = ({ errorMessage, error, ...inputProps } : Props & TextInputProps) => (
    <View style={styles.container}>
      <TextInput
        {...inputProps}
        error={error}
        mode='outlined'
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage instanceof Array ? errorMessage[0] : errorMessage}</Text>}
    </View>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginBottom: 16
    },
    label: {
        marginVertical: 8
    },
    errorMessage: {
        paddingVertical: 5,
        color: '#F00'
    }
});