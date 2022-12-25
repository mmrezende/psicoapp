import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { Option } from '../models/Option';

type Props = {checked: boolean, onChange: Function, option: Option};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4
    }
});

export const CheckboxOption = ({checked, onChange, option}: Props) => (
    <TouchableWithoutFeedback onPress={() => onChange(!checked)}>
        <View style={styles.container}>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
            />
            <Text variant='labelLarge'>{option.text}</Text>
            {option.image && <Image 
                source={{
                    uri: option.image.url,
                    width: 500,
                    height: 500
                }}
            />}
        </View>
    </TouchableWithoutFeedback>
);