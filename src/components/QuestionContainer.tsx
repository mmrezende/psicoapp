import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Title } from "react-native-paper";
import { QuestionType } from "../helpers/types";
import { Question } from "../models/Question";
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
    }, [binaryAnswer, singleChoiceAnswer, multipleChoiceAnswer, textAnswer])

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
                        setValue={setTextAnswer}
                    />
                );
        }
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title} >{question.title} <Text style={{color: 'red'}}>*</Text></Title>
            {questionContent()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    title: {
        marginBottom: 8
    },
    line: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});