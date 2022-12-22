import { FlatList } from "react-native";
import { RadioButton } from "react-native-paper";
import { Option } from "../models/Option";
import { RadioOption } from "./RadioOption";

type Props = {options: Option[], value: number, setValue: Function};

export const RadioGroup = ({options, value, setValue}: Props) => (
	<RadioButton.Group value={String(value)} onValueChange={(val: string) => setValue(Number(val))}>
        <FlatList
            data={options}
            renderItem={({item}) => <RadioOption option={item}/>}
        />
    </RadioButton.Group>
);
