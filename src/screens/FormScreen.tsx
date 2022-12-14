import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { AuthContext } from "../auth/AuthContext";
import { Spinner } from "../components/Spinner";
import { getForms } from "../helpers/queries";

export default function FormScreen({navigation, route}) {
    const { axios } = useContext(AuthContext);
    const { clinic } = route.params;

    const query = useQuery({ 
        queryKey: ['forms', clinic.id],
        queryFn: () => getForms(axios, clinic),
    });

    return(
        <View style={styles.container}>
            {query.isLoading ?
                <Spinner/> :
                query.data.length === 0 ?
                    <Text style={styles.warning}>Não há formulários pendentes para este consultório.</Text> :
                    <FlatList
                        data={query.data}
                        renderItem={({item}) => <Text>{JSON.stringify(item)}</Text>}
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