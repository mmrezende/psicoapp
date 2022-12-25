import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Switch, Text } from "react-native-paper";

type Props = {value: boolean, setValue: Function};

export const BinaryInput = ({value, setValue} : Props) => {
    return (
        <TouchableWithoutFeedback onPress={() => setValue(!value)}>
            <View style={styles.container}>
                <Text variant="labelLarge">Não</Text>
                <Switch 
                    value={value}
                    style={styles.switch}
                />
                <Text variant="labelLarge">Sim</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 8
    },
    switch: {
        marginHorizontal: 8
    }
});