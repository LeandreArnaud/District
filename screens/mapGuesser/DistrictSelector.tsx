import React, { useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { getComs } from '../../API/mvp-district-API';


type DistrictSelectorProps = { navigation: any };

export const DistrictSelector: React.FC<DistrictSelectorProps> = ({ navigation }) => {
    const [research, setResearch]: [any, any] = React.useState();
    const [coms, setComs]: [any, any] = React.useState([]);
    const [comsFiltered, setComsFiltered]: [any, any] = React.useState([]);

    const fetchCities = () => {
        getComs().then(data => setComs(data?.communes?.map(elt => {
            return {...elt, selected: false}
        })));
    };

    const toggleCity = (com, cp) => {
        setComs(coms.map(elt => {
            if (elt.COM === com && elt.CP === cp) {
                return {...elt, selected: !elt.selected}
            }
            return elt
        }));
    };

    useEffect(()=>{
        fetchCities();
    }, [])

    useEffect(()=>{
        if (research) {
            setComsFiltered(coms.filter(elt => elt.COM.toUpperCase().includes(research.toUpperCase())));
        } else {
            setComsFiltered(coms);
        }
    }, [research, coms])

    return(
        <View style={styles.mainContainer}>
            <Text>Enter a city name</Text>
            <TextInput 
                onChangeText={text => setResearch(text)} 
                placeholder='City name' 
                onSubmitEditing={() => {}}
            />

            <View style={styles.availableCitiesContainer}>
                <ScrollView>
                    {comsFiltered.length>0 && 
                        comsFiltered.map(elt => 
                            <TouchableOpacity style={styles.availableCityCell} onPress={() => toggleCity(elt.COM, elt.CP)} key={elt.COM.concat(elt.CP)}>
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
