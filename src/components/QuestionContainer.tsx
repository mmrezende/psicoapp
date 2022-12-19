import { useContext, useState } from "react";
import { FlatList, View } from "react-native";
import { IconButton, RadioButton, Switch, Text, TextInput, Title } from "react-native-paper";
import { Option } from "../models/Option";
import { Question, QuestionType } from "../models/Question";
import { BinaryOption } from "./BinaryOption";
import { RadioInput } from "./RadioInput";

type Props = {question: Question, onChange: Function};
type Answer = boolean | number | string;

export const QuestionContainer = ({question, onChange} : Props) => {
    const [answer, setAnswer] = useState<boolean | number | string>(null);
    const [selectedOption, setSelectedOption] = useState<string>(null);
    const [text, setText] = useState<string>(null);

    const handleChangeAnswer = (newAnswer: Answer) => {
        setAnswer(newAnswer);
        onChange(answer);
    }

    const handleSelectOption = (option: string) => {
        setSelectedOption(option);
        handleChangeAnswer(Number(option));
    }

    const handleChangeText = (input: string) => {
        setText(input);
        handleChangeAnswer(input);
    }

    const questionContent = () => {
        switch(question.type) {
            case QuestionType.BINARY:
                return <BinaryOption onChange={(val: boolean) => handleChangeAnswer(val)}/>;
            case QuestionType.MULTIPLE_CHOICE:
                return;
            case QuestionType.SINGLE_CHOICE:
                return (
                    <RadioButton.Group value={selectedOption} onValueChange={handleSelectOption}>
                        <FlatList
                            data={question.options}
                            renderItem={({item}) => RadioInput({option: item})}
                        />
                    </RadioButton.Group>
                );
            case QuestionType.TEXT:
                return (
                    <TextInput 
                        value={text}
                        onChangeText={handleChangeText}
                    />
                );
        }
    }

    return (
        <View>
            <Title>{question.title}</Title>
            <Text>{question.description}</Text>

            {questionContent()}
        </View>
    );
}