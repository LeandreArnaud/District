import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, ColorPropType} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { getComs } from '../../API/mvp-district-API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CityCell } from '../../components/districtSelector/CityCell';

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

const initialDistrict = {
    name: "",
    centerLat: 0,
    centerLon: 0,
    cities: [
        {
            COM: "rambouillet",
            CP: "78120",
            COM_NORM: "Rambouillet",
        },
        {
            COM: "trappes",
            CP: "78190",
            COM_NORM: "Trappes",
        },
    ]
};

type DistrictCreatorProps = { navigation: any };

export const DistrictCreator: React.FC<DistrictCreatorProps> = ({ navigation }) => {
    const [district, setDistrict] = useState<district>(initialDistrict);

    const handleTitleChange = (text: string) => {
        console.log('text', text);
        setDistrict({...district, name: text.toUpperCase()});
    };

    const handleRemovesCity = (COM:string) => {
        setDistrict({...district, cities: district.cities.filter(ci => ci.COM !== COM)})
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Nouveau district</Text>
            </View>

            <View style={styles.formContainer}>
                <Text>Nom du district (3 lettres max) :</Text>
                <TextInput 
                    onChangeText={handleTitleChange} 
                    placeholder='NOM'
                    style={styles.textInput}
                    value={district?.name}
                    maxLength={3}
                />
                <Text>Communes :</Text>
                <View style={styles.citiesListContainer}>
                    <View style={styles.citiesList}>
                        {district?.cities?.map(city => 
                            <CityCell city={city} onRemove={() => handleRemovesCity(city.COM)}/>
                        )}
                    </View>
                    <Text>add</Text>
                </View>
            </View>
            
            <TouchableOpacity style={styles.submitContainer}>
                <Text style={styles.submitText}>Créer le district</Text>
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
    },
    titleContainer: {
        width: "100%",
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
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
    submitContainer:{
        position: "absolute",
        bottom: 40,
        backgroundColor: "#DAAC08",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 6,
        elevation: 3,
        shadowColor: "#000000",
    },
    submitText:{
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
    }
});


export default DistrictCreator
