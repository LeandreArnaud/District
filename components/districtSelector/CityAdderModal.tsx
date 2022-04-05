import React, { useState } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native'
import icons from '../../assets/icons/iconManager';
import CityCell from './CityCell';

interface city {
    COM: string;
    CP: string;
    COM_NORM: string;
};
type CityAdderModalProps = { cities: city[], onClose: () => void, onAdd: (city: city) => void };

export const CityAdderModal: React.FC<CityAdderModalProps> = ({ cities, onClose, onAdd }) => {
    const [displayedCities, setDisplayedCities] = useState<Array<city>>(cities);

    const handleCitySearch = (search: string) => {
        setDisplayedCities(cities.filter(ci => ci.COM.includes(search.toLowerCase()) || ci.CP.includes(search.toUpperCase())))
    }

    return(
        <View style={styles.cityAdderContainer}>
            <TouchableOpacity onPress={onClose} style={styles.backgroundBlur} />
            <View style={styles.modalContainer}>
                <Text>Rechercher une ville</Text>
                <TextInput 
                    onChangeText={handleCitySearch} 
                    placeholder='Ex: Versailles'
                    style={styles.searchTextInput}
                />
                <Text>Ajouter la ville de votre choix</Text>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.citiesContainer}>
                        {displayedCities.map(city => 
                            <CityCell 
                                key={`${city.COM_NORM}-${city.CP}`} 
                                city={city} 
                                add
                                onRemove={() => {
                                    onAdd(city)
                                    onClose()
                                }} 
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cityAdderContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 6,
    },
    backgroundBlur: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        opacity: 0.2,
    },
    modalContainer:{
        width: "95%",
        height: "80%",
        paddingHorizontal: 15,
        paddingVertical: 30,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        borderRadius: 20,
        elevation: 4,
        shadowColor: "#000000"
    },
    searchTextInput: {
        width: "100%",
        height: 40,
        backgroundColor: "#E0E0E0",
        fontSize: 20,
        paddingHorizontal: 5,
        borderRadius: 5,
        fontWeight: "bold",
        marginBottom: 20,
    },
    scrollContainer: {
        width: "100%",
        flex: 1,
    },
    citiesContainer: {
        backgroundColor: "#E0E0E0",
        width: "100%",
        paddingHorizontal: 3,
        paddingBottom: 5,
        flex: 1,
        alignItems: "center",
    }
});


export default CityAdderModal
