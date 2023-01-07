import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Switch, Text } from "react-native-paper";

type Props = {value: boolean, setValue: Function, label?: string};

export const BinaryInput = ({value, setValue, label} : Props) => {
    return (
        <TouchableWithoutFeedback onPress={() => setValue(!value)}>
            <View style={styles.container}>
                {label && <Text variant="labelLarge">{label}</Text>}
                <Switch 
                    value={value}
                    style={styles.switch}
                    onChange={() => setValue(!value)}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    switch: {
        marginHorizontal: 8
    }
});