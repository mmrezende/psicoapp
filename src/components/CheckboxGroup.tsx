import { FlatList } from "react-native";
import { Option } from "../models/Option";
import { CheckboxOption } from "./CheckboxOption";

type Props = {options: Option[], value: number[], setValue: Function};

export const CheckboxGroup = ({options, value, setValue}: Props) => (
	<FlatList
        data={options}
        renderItem={({item}) => {
            return (
                <CheckboxOption
                    checked={value.includes(item.id)}
                    option={item}
                    onChange={(checked: boolean) => {
                        if(checked) { 
                            setValue(value.concat([item.id]));
                        } else {
                            setValue(value.filter(val => val === item.id));
                        }
                    }}
                />
            );
        }}
    />
);
