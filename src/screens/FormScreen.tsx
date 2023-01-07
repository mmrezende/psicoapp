import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { AuthContext } from "../auth/AuthContext";
import { QuestionContainer } from "../components/QuestionContainer";
import { Spinner } from "../components/Spinner";
import { getForms, postAnswerGroup } from "../helpers/queries";
import { Answer, AnswerGroup, FormattedAnswer, FormattedOption } from "../helpers/types";
import { Option } from "../models/Option";

export default function FormScreen({navigation, route}) {
    const { axios } = useContext(AuthContext);
    const { clinic } = route.params;

    const query = useQuery({ 
        queryKey: ['forms', clinic.id],
        queryFn: () => getForms(axios, clinic),
    });

    const [answerGroup] = useState<AnswerGroup>(new Map());

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = () => {
        const valid = Array.from(answerGroup.values())
            .every(answer => answer !== null && answer !== "");

        if(!valid) {
            return Alert.alert('Erro', 'Verifique as respostas preenchidas');
        }
        const formattedAnswers: FormattedAnswer[] = new Array();
        const optionFormat = (option: Option) => ({text: option.text, image: option.image});

        answerGroup.forEach((val, key) => {
            const question = query.data.find(item => item.id === key);
            let content: FormattedOption[];
            if(val instanceof Array) {
                const options = val.map((optionId) => 
                    question.options
                        .find(option => option.id === optionId)
                );

                content = options.map(optionFormat);
            }else if(typeof val === "number") {
                const options = [
                    question.options
                    .find(option => option.id === val)
                ];
                content = options.map(optionFormat);
            } else if(typeof val === "boolean"){
                content = [{text: val ? "Sim" : "Não"}];
            } else {
                content = [{text: val}]
            }

            formattedAnswers.push({question: key, type: question.type, content});
        });
        setIsSubmitting(true);

        postAnswerGroup(axios, clinic, formattedAnswers)
            .then(() => navigation.navigate('Home'))
            .catch((err: AxiosError) => {
                Alert.alert('Falha na requisição com o servidor', `Motivo: ${err.message}`);
            })
            .finally(() => setIsSubmitting(false));
    }

    return(
        <View style={styles.container}>
            {query.isLoading ?
                <Spinner/> :
                query.data.length === 0 ?
                    <Text style={styles.warning}>Não há formulários pendentes para este consultório.</Text> :
                    <View style={styles.container}>
                        <FlatList
                            data={query.data}
                            removeClippedSubviews={false}
                            renderItem={({item}) => {
                                return (
                                <View style={styles.questionContainer}>
                                    <QuestionContainer
                                        question={item}
                                        setValue={(answer: Answer) => {
                                            answerGroup.set(item.id, answer);
                                        }}
                                    />
                                </View>)
                            }}
                            keyExtractor={(item) => String(item.id)}
                            style={styles.flatList}
                        />
                        <Button
                            onPress={handleSubmit}
                            mode='contained'
                            style={styles.button}
                            loading={isSubmitting}
                            disabled={isSubmitting}>
                            Enviar
                        </Button>
                    </View>
            }
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
    },
    button: {
        marginVertical: 8,
        position: 'relative'
    }
});