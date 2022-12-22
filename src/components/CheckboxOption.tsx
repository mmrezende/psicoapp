import { Image, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import { Option } from '../models/Option';

type Props = {checked: boolean, onChange: Function, option: Option};

export const CheckboxOption = ({checked, onChange, option}: Props) => (
	<View>
        <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => onChange(!checked)}
        />
        <Text>{option.text}</Text>
        {option.image && <Image 
            source={{
                uri: option.image.url,
                width: 500,
                height: 500
            }}
        />}
	</View>
);