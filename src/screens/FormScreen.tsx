import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { AuthContext } from "../auth/AuthContext";
import { QuestionContainer } from "../components/QuestionContainer";
import { Spinner } from "../components/Spinner";
import { getForms } from "../helpers/queries";

type AnswerType = boolean | number | number[] | string;

export default function FormScreen({navigation, route}) {
    const { axios } = useContext(AuthContext);
    const { clinic } = route.params;

    const query = useQuery({ 
        queryKey: ['forms', clinic.id],
        queryFn: () => getForms(axios, clinic),
    });

    const [answerGroup, setAnswerGroup] = useState<Map<Number,AnswerType>>(new Map());

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
                            <>
                                <QuestionContainer
                                    question={item}
                                    setValue={(answer: AnswerType) => {
                                        const newState = new Map(answerGroup);
                                        newState.set(item.id, answer);
                                        setAnswerGroup(newState);
                                        console.log(answerGroup);
                                    }}
                                />
                                <Text>{JSON.stringify(item)}</Text>
                            </>)
                        }}
                        keyExtractor={(item) => String(item.id)}
                        style={styles.flatList}
                    />
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
    }
});