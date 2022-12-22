import { useEffect, useState } from "react";
import { View } from "react-native";
import { TextInput, Title } from "react-native-paper";
import { Question, QuestionType } from "../models/Question";
import { BinaryInput } from "./BinaryInput";
import { CheckboxGroup } from "./CheckboxGroup";
import { RadioGroup } from "./RadioGroup";
import { TextArea } from "./TextArea";

type Props = {question: Question, setValue: Function};

export const QuestionContainer = ({question, setValue} : Props) => {
    const [binaryAnswer, setBinaryAnswer] = useState<boolean>(false);
    const [singleChoiceAnswer, setSingleChoiceAnswer] = useState<number>(null);
    const [multipleChoiceAnswer, setMultipleChoiceAnswer] = useState<number[]>([]);
    const [textAnswer, setTextAnswer] = useState<string>("");

    useEffect(() => {
        switch(question.type) {
            case QuestionType.BINARY:
                return setValue(binaryAnswer);
            case QuestionType.MULTIPLE_CHOICE:
                return setValue(multipleChoiceAnswer);
            case QuestionType.SINGLE_CHOICE:
                return setValue(singleChoiceAnswer);
            case QuestionType.TEXT:
                return setValue(textAnswer);
        }
    }, [question.type, binaryAnswer, singleChoiceAnswer, multipleChoiceAnswer, textAnswer])

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
                    <TextArea
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