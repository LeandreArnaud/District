import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, ColorPropType} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { getComs } from '../../API/mvp-district-API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CityCell } from '../../components/districtSelector/CityCell';
import { CityAdderModal } from '../../components/districtSelector/CityAdderModal';
import { addDistrict } from '../../utile/LocalStorage';

interface city {
    COM: string;
    CP: string;
    COM_NORM: string;
};
interface district {
    shortname: string;
    centerLat: number;
    centerLon: number;
    cities: city[];
};

const initialDistrict = {
    shortname: "",
    centerLat: 0,
    centerLon: 0,
    cities: []
};

const exCities = [
    {
        COM: "rambouillet",
        CP: "78120",
        COM_NORM: "Rambouillet",
    },
    {
        COM: "clairfontaine",
        CP: "78120",
        COM_NORM: "ClairFontaine",
    },
    {
        COM: "trappes",
        CP: "78190",
        COM_NORM: "Trappes",
    },
    {
        COM: "villecorse",
        CP: "2B190",
        COM_NORM: "VilleCorse",
    },
];

type DistrictCreatorProps = { navigation: any };

export const DistrictCreator: React.FC<DistrictCreatorProps> = ({ navigation }) => {
    const [district, setDistrict] = useState<district>(initialDistrict);
    const [districtValidity, setDistrictValidity] = useState<boolean>(false);
    const [addCityModal, setAddCityModal] = useState<boolean>(false);
    const [availablecities, setAvailablecities] = useState<Array<city>>(exCities);

    const handleTitleChange = (text: string) => {
        setDistrict({...district, shortname: text.toUpperCase()});
    };
    const handleRemovesCity = (city:city) => {
        setDistrict({...district, cities: district.cities.filter(ci => ci.COM !== city.COM || ci.CP !== city.CP)})
        setAvailablecities([...availablecities, city])
    }
    const handleAddCity = (city:city) => {
        setDistrict({...district, cities: [...district.cities, city]})
        setAvailablecities(availablecities.filter(ci => ci.COM_NORM !== city.COM_NORM || ci.CP !== city.CP ))
    }
    const handleCreateDistrict = () => {
        // TODO: search for lat lon
        addDistrict(district).then(() => navigation.navigate("Homepage"))
    }
    useEffect(() => {
        if (district.shortname.length && district.cities.length) {
            setDistrictValidity(true)
        }
        else {
            setDistrictValidity(false)
        }
    }, [district])

    return(
        <View style={styles.mainContainer}>
            {addCityModal && <CityAdderModal cities={availablecities} onClose={() => setAddCityModal(false)} onAdd={handleAddCity} />}
            
            <View style={styles.scrollableContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Nouveau district</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text>Nom du district (3 lettres max) :</Text>
                    <TextInput 
                        onChangeText={handleTitleChange} 
                        placeholder='Ex: MLB'
                        style={styles.textInput}
                        value={district?.shortname}
                        maxLength={3}
                    />
                    <Text>Communes :</Text>
                    <View style={styles.citiesListContainer}>
                        <View style={styles.citiesList}>
                            {district?.cities?.map(city => 
                                <CityCell city={city} onRemove={() => handleRemovesCity(city)}/>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => setAddCityModal(true)}>
                            <Text>add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            <TouchableOpacity 
            style={[styles.submitContainer, districtValidity && styles.submitContainerValid]} 
            disabled={!districtValidity}
            onPress={handleCreateDistrict}>
                <Text style={styles.submitText}>Créer le district</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 0,
        alignItems: 'center',
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
    },
    scrollableContainer: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
    },
    titleContainer: {
        width: "100%",
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    titleText:{
        width: "40%",
        fontSize: 30,
        fontWeight: "bold",
        color: "#DAAC08",
        textAlign: "center",
    },
    formContainer: {
        paddingHorizontal: 10,
        width: "100%",
        height: 300,
    },
    textInput:{
        width: "100%",
        height: 40,
        backgroundColor: "#E0E0E0",
        fontSize: 25,
        paddingHorizontal: 5,
        borderRadius: 5,
        fontWeight: "bold",
        color: "#DAAC08",
        marginBottom: 20,
    },
    citiesListContainer: {
        backgroundColor: "#E0E0E0",
        width: "100%",
        borderRadius: 5,
        flex: 0,
        alignItems: "center",
        justifyContent: "space-between",
    },
    citiesList: {
        width: "100%",
        paddingBottom: 60,
        flex: 0,
        alignItems: "center",
    },
    submitContainerValid: {
        backgroundColor: "#DAAC08",
    },
    submitContainer:{
        marginBottom: 40,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: "#D0D0D0",
    },
    submitText:{
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
    }
});


export default DistrictCreator
