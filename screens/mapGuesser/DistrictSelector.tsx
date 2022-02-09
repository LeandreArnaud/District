import React, { Dispatch, SetStateAction, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { getComs } from '../../API/mvp-district-API';


type DistrictSelectorProps = { navigation: any };

export const DistrictSelector: React.FC<DistrictSelectorProps> = ({ navigation }) => {
    const [research, setResearch]: [any, any] = React.useState('init');
    const [coms, setCOms]: [any, any] = React.useState([]);

    const fetchCities = () => {
        getComs().then(data => setCOms(data?.communes?.map(elt => {
            return {...elt, selected: false}
        })));
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

            <View style={styles.availableCitiesContainer}>
                <ScrollView>
                    {coms.length>0 && 
                        coms.map(elt => 
                            <TouchableOpacity style={styles.availableCityCell}>
                                <Text>{elt.selected ? '-' : '+' }</Text>
                                <Text>{elt.COM}</Text>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
            </View>
            
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
    availableCitiesContainer: {
        height: 200,
    },
    availableCityCell: {
        height: 20,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'gray',
        marginVertical: 3
    }
});


export default DistrictSelector
