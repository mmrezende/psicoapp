import { Image, View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { Option } from '../models/Option';

type Props = {option: Option};

export const RadioOption = ({option}: Props) => (
	<View>
        <RadioButton.Item
            value={String(option.id)}
            label={option.text}
            position={'leading'}
            labelStyle={{textAlign: 'left'}}
            labelVariant='labelLarge'
            style={{paddingLeft: 0}}
        />
        {option.image && <Image 
            source={{
                uri: option.image.url,
                width: 500,
                height: 500
            }}
        />}
	</View>
);