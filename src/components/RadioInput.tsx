import { Image, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { Option } from '../models/Option';

type Props = {option: Option};

export const RadioInput = ({option}: Props) => (
	<View>
        <RadioButton value={String(option.id)}/>
        <Text>{option.text}</Text>
        <Image 
            source={{
                uri: option.image.url,
                width: 500,
                height: 500
            }}
        />
	</View>
);