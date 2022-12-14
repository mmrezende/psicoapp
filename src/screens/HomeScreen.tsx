import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { ClinicCard } from '../components/ClinicCard';
import { Spinner } from '../components/Spinner';
import { getClinics } from '../helpers/queries';
import { Clinic } from '../models/Clinic';

export default function HomeScreen({navigation}) {
    const { axios } = useContext(AuthContext);

    const query = useQuery({ 
        queryKey: ['clinics'],
        queryFn: () => getClinics(axios)
    });

    function handleOpenForm(clinic: Clinic) {
        navigation.navigate({
            name: 'Form',
            params: {clinic}
        });
    }

    return(
        <View style={styles.container}>
            {query.isLoading ?
                <Spinner/> :
                <FlatList
                    data={query.data}
                    renderItem={({item}) => <ClinicCard clinic={item} openForm={handleOpenForm}/>}
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
    }
});