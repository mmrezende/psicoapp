import { Switch } from "react-native-paper";

type Props = {value: boolean, setValue: Function};

export const BinaryInput = ({value, setValue} : Props) => {
    return (
        <Switch 
            value={value}
            onValueChange={(currentValue: boolean) => {
                setValue(!currentValue);
            }}
        />
    );
}