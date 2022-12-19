import { useState } from "react";
import { Switch } from "react-native-paper";

type Props = {onChange: Function};

export const BinaryOption = ({onChange} : Props) => {
    const [value, setValue] = useState<boolean>(false);

    return (
        <Switch 
            value={value}
            onValueChange={(val: boolean) => {
                setValue(!val);
                onChange(value);
            }}
        />
    );
}