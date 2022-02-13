import React, { Dispatch, SetStateAction, useEffect } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { getComs } from '../../API/mvp-district-API';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface city {
    COM: string;
    CP: string;
    COM_NORM: string;
};
interface district {
    name: string;
    centerLat: number;
    centerLon: number;
    cities: city[];
};

type DistrictCreatorProps = { navigation: any };

export const DistrictCreator: React.FC<DistrictCreatorProps> = ({ navigation }) => {
    const [research, setResearch]: [any, any] = React.useState();
    const [districtName, setDistrictName]: [string, Dispatch<SetStateAction<string>>] = React.useState('');
    const [coms, setComs]: [any, any] = React.useState([]);
    const [comsFiltered, setComsFiltered]: [any, any] = React.useState([]);
    const [submitIsProcessing, setSubmitIsProcessing]: [any, any] = React.useState(false);
    const [existingDistricts, setExistingDistricts]: [district[]|undefined, Dispatch<SetStateAction<district[]|undefined>>] = React.useState();

    // submit a new district
    const submitDistrict = async () => {
        setSubmitIsProcessing(true);

        if (!coms.filter(ci => ci.selected).length || !districtName){
            console.log('no coms or district name')
            setSubmitIsProcessing(false);
            return
        };

        const myDistricts: district = {
            name: districtName,
            centerLat: 1.0,
            centerLon: 1.0,
            cities: coms.filter(ci => ci.selected).map(ci => {
                return {'COM': ci.COM, 'CP': ci.CP, 'COM_NORM': ci.COM_NORM}
            }),
        };
        let newDistricts: district[];
        if (existingDistricts){
            newDistricts = [...existingDistricts.filter(di => di.name!==districtName), myDistricts];
        } else {
            newDistricts = [myDistricts];
        }
        try {
            await AsyncStorage.setItem('savedDistricts', JSON.stringify(newDistricts))
        } catch (e) {
            console.log('impossible to write existings districts')
        }

        navigation.navigate('MapGuesser');
        setSubmitIsProcessing(false);
    };

    // read existing savec districts
    const readExistringsDistricts = async () => {
        try {
            const value = await AsyncStorage.getItem('savedDistricts')
            if(value !== null) {
                setExistingDistricts(JSON.parse(value));
                console.log('existings districts: ', JSON.parse(value))
            }
        } catch(e) {
            console.log('impossible to read existings districts')
        }
    };

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
        readExistringsDistricts();
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
            <Text>Creating new district:</Text>
            <TextInput 
                onChangeText={text => setDistrictName(text)} 
                placeholder='District name' 
            />

            <Text>Enter a city name</Text>
            <TextInput 
                onChangeText={text => setResearch(text)} 
                placeholder='City name' 
            />

            <View style={styles.availableCitiesContainer}>
                <ScrollView>
                    {comsFiltered.length>0 && 
                        comsFiltered.filter(elt => !elt.selected).map(elt => 
                            <TouchableOpacity style={styles.availableCityCell} onPress={() => toggleCity(elt.COM, elt.CP)} key={elt.COM.concat(elt.CP)}>
                                <Text>{`add ${elt.COM} - ${elt.CP}`}</Text>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
            </View>
            
            <Text>Selected cities</Text>
            <View style={styles.availableCitiesContainer}>
                <ScrollView>
                    {comsFiltered.length>0 && 
                        comsFiltered.filter(elt => elt.selected).map(elt => 
                            <TouchableOpacity style={styles.availableCityCell} onPress={() => toggleCity(elt.COM, elt.CP)} key={elt.COM.concat(elt.CP)}>
                                <Text>{`remove ${elt.COM} - ${elt.CP}`}</Text>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>
            </View>
            
            {submitIsProcessing
                ? <Text>processing...</Text> 
                : !coms.filter(ci => ci.selected).length || !districtName 
                    ? <Text>fill district name and select minimum 1 city</Text> 
                    : <TouchableOpacity onPress={submitDistrict}>
                        <Text>start</Text>
                      </TouchableOpacity>
            }
            
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


export default DistrictCreator
