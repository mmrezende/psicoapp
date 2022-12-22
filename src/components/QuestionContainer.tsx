import { useState } from "react";
import { View } from "react-native";
import { TextInput, Title } from "react-native-paper";
import { Question, QuestionType } from "../models/Question";
import { BinaryInput } from "./BinaryInput";
import { CheckboxGroup } from "./CheckboxGroup";
import { RadioGroup } from "./RadioGroup";

type Props = {question: Question, onChange: Function};


export const QuestionContainer = ({question, onChange} : Props) => {
    const [binaryAnswer, setBinaryAnswer] = useState<boolean>();
    const [singleChoiceAnswer, setSingleChoiceAnswer] = useState<number>();
    const [multipleChoiceAnswer, setMultipleChoiceAnswer] = useState<number[]>();
    const [textAnswer, setTextAnswer] = useState<string>();

    const questionContent = () => {
        switch(question.type) {
            case QuestionType.BINARY:
                return (
                    <BinaryInput
                        value={binaryAnswer}
                        setValue={setBinaryAnswer}
                    />
                );
            case QuestionType.MULTIPLE_CHOICE:
                return (
                    <CheckboxGroup
                        value={multipleChoiceAnswer}
                        setValue={setMultipleChoiceAnswer}
                        options={question.options}
                    />
                );
            case QuestionType.SINGLE_CHOICE:
                return (
                    <RadioGroup 
                        value={singleChoiceAnswer}
                        setValue={setSingleChoiceAnswer}
                        options={question.options}
                    />
                );
            case QuestionType.TEXT:
                return (
                    <TextInput 
                        value={textAnswer}
                        onChangeText={setTextAnswer}
                    />
                );
        }
    }

    return (
        <View>
            <Title>{question.title}</Title>
            {questionContent()}
        </View>
    );
}