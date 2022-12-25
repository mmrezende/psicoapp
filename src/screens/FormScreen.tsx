import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { AuthContext } from "../auth/AuthContext";
import { QuestionContainer } from "../components/QuestionContainer";
import { Spinner } from "../components/Spinner";
import { getForms, postAnswerGroup } from "../helpers/queries";
import { Answer, AnswerGroup, FormattedAnswer, FormattedAnswerGroup } from "../helpers/types";

export default function FormScreen({navigation, route}) {
    const { axios } = useContext(AuthContext);
    const { clinic } = route.params;

    const query = useQuery({ 
        queryKey: ['forms', clinic.id],
        queryFn: () => getForms(axios, clinic),
    });

    const [answerGroup] = useState<AnswerGroup>(new Map());

    const handleSubmit = () => {
        const valid = true // TODO
        if(!valid) return;
        const formattedAnswers: FormattedAnswerGroup = new Map();
        answerGroup.forEach((val, key) => {
            const question = query.data.find(item => item.id === key);
            let answer: FormattedAnswer;
            if(val instanceof Array) {
                answer = val.map((optionId) => 
                    question.options
                        .find(option => option.id === optionId)
                );
            }else if(typeof val === "number") {
                answer = question.options
                    .find(option => option.id === val);
            } else {
                answer = val;
            }

            formattedAnswers.set(key, answer);
        });
        postAnswerGroup(axios, formattedAnswers);
    }

    return(
        <View style={styles.container}>
            {query.isLoading ?
                <Spinner/> :
                query.data.length === 0 ?
                    <Text style={styles.warning}>Não há formulários pendentes para este consultório.</Text> :
                    <FlatList
                        data={query.data}
                        renderItem={({item}) => {
                            return (
                            <View style={styles.questionContainer}>
                                <QuestionContainer
                                    question={item}
                                    setValue={(answer: Answer) => {
                                        answerGroup.set(item.id, answer);
                                        console.log(answerGroup);
                                    }}
                                />
                            </View>)
                        }}
                        keyExtractor={(item) => String(item.id)}
                        style={styles.flatList}
                    />
            }
            <Button onPress={handleSubmit}>
                Enviar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        flex: 1,
        width: '100%'
    },
    warning: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    questionContainer: {
        marginBottom: 32,
        padding: 8
    }
});