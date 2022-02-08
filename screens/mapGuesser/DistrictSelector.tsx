import React, { Dispatch, SetStateAction, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { getComs } from '../../API/mvp-district-API';

const initComs = [
    {com: 'Trappes', com_norm: 'trappes', cp: '78190'},
    {com: 'Rambouillet', com_norm: 'rambouillet', cp: '78120'},
];
type DistrictSelectorProps = { navigation: any };

export const DistrictSelector: React.FC<DistrictSelectorProps> = ({ navigation }) => {
    const [research, setResearch]: [any, any] = React.useState('init');
    const [coms, setCOms]: [any, any] = React.useState([]);

    const fetchCities = () => {
        // getComs().then(data => setCOms(data))
        setCOms(initComs);
        getComs().then(data => console.log('data', data));
        console.log('research', research);
    };

    return(
        <View style={styles.mainContainer}>
            <Text>Enter a city name</Text>
            <TextInput 
                onChangeText={text => setResearch(text)} 
                placeholder='City name' 
                onSubmitEditing={() => fetchCities()}
            />
            <TouchableOpacity onPress={() => fetchCities()}>
                <Text>Search</Text>
            </TouchableOpacity>

            {coms.length>0 && 
                coms.map(elt => 
                    <Text>{elt.com}</Text>
                )
            }
            <TouchableOpacity onPress={() => navigation.navigate('MapGuesser')}>
                <Text>start</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40,
        },
});


export default DistrictSelector
