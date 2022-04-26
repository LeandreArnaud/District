import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import {getRandomAdress} from '../../API/mvp-district-API'
import mapStyle from '../../GMStyles/BlindMapStyle.js'
import MapGuesserResults from './MapGuesserResults';
import icons from '../../assets/icons/iconManager';
import Ticket from './Ticket';

type adress = {
    id: string;
    num: string;
    rue: string;
    cp: string;
    com: string;
} | undefined;

interface cursor {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface city {
    COM: string;
    CP: string;
    COM_NORM: string;
    LAT: number;
    LON: number;
};
interface district {
    shortname: string;
    centerLat: number;
    centerLon: number;
    cities: city[];
};

type MapGuesserProps = { route: any, navigation: any };

// screen where you try to guess the location of an adress
export const MapGuesser: React.FC<MapGuesserProps> = ({route, navigation}) => {
    const district: district = route.params.district;
    const initialCursor = {
        latitude: district.centerLat, 
        longitude: district.centerLon,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    };
    const [adressToGuess, setAdressToGuess] = useState<adress>();
    const [cursor, setCursor] = useState<cursor>(initialCursor);
    const [ticketVisible, setTicketVisible] = useState<boolean>(true);
    const [resultVisible, setResult_visible] = useState<boolean>(false);


    const toggleResultVisibility = () =>{
        if (resultVisible) {
            generateRandomAdress();
            setTicketVisible(true);
        }
        setResult_visible(!resultVisible);
    };

    const generateRandomAdress = () => {
        const cities =  district.cities.map(ci => `'${ci.COM_NORM}'`).toString()
        getRandomAdress(cities).then(data => 
            setAdressToGuess(data)
        );
        setCursor(initialCursor);
    }

    // generates random adress when component is mounted
    useEffect(() => {
        generateRandomAdress()
    }, []);

    return(
        <View style={styles.container}>
            
            {(resultVisible && adressToGuess?.id && cursor?.latitude) && (
                <MapGuesserResults
                    adress={adressToGuess}
                    cursor={cursor}
                    closeModalFunction={() => toggleResultVisibility()}
                    navigation={navigation}/>
            )}
            
            {adressToGuess?.id && ticketVisible && (
                <Ticket adressToGuess={adressToGuess} hideTicket={() => setTicketVisible(false)}/>
            )}
            

            <View style={styles.mapContainer}>
                <MapView 
                    // @ts-ignore
                    style={styles.map} 
                    initialRegion={initialCursor}
                    onRegionChangeComplete={(region) => setCursor(region)}
                    customMapStyle={mapStyle}
                >   
                </MapView>
                <View pointerEvents="none" style={styles.staticMarkerContainer}>
                    <Image
                        style={styles.truckPointeur}
                        source={icons["firetruck"]}
                    />
                </View>
                <View 
                    style={styles.topButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Image
                            style={styles.returnChevronIcon}
                            source={icons["chevron"]}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => setTicketVisible(true)} >
                        <Image
                            style={styles.topButtonIcon}
                            source={icons["document"]}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.sendButtonContainer}
                    onPress={() => toggleResultVisibility()}>
                    <Image
                        style={styles.sendButtonIcon}
                        source={icons["check"]}
                    />
                </TouchableOpacity>
            </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapContainer: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: '100%'
        },
    staticMarkerContainer:{
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'transparent',
    },
    truckPointeur:{
        width: 30,
        height: 30,
    },
    sendButtonContainer:{
        position: 'absolute',
        bottom: 30, 
        right: 20,  
        backgroundColor: "#DAAC08",
        borderRadius: 40,
        padding: 10,
    },
    sendButtonIcon: {
        width: 25,
        height: 25,
    },
    topButtonContainer:{
        width: '100%',
        position: 'absolute',
        top: 40,
        paddingHorizontal: 20,
        flex: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    topButtonIcon: {
        height: 25,
        width: 25,
    },
    returnChevronIcon: {
        height: 25,
        width: 25,
        transform: [{rotate: '180deg'}]
    },
});


export default MapGuesser
