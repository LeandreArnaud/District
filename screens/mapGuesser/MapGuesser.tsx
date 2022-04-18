import React, { Dispatch, SetStateAction, useEffect } from 'react'
import MapView from 'react-native-maps';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal, Image} from 'react-native'
import {getRandomAdress} from '../../API/mvp-district-API'
import mapStyle from '../../GMStyles/BlindMapStyle.js'
import MapGuesserResults from './MapGuesserResults';
import icons from '../../assets/icons/iconManager';

interface adress {
    id: string;
    num: string;
    rue: string;
    cp: string;
    com: string;
};

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
    const [adressToGuess, setAdressToGuess]: [adress, Dispatch<SetStateAction<adress>>] = React.useState();
    const [cursor, setCursor]: [cursor, Dispatch<SetStateAction<cursor>>] = React.useState(initialCursor);
    const [ticketVisible, setTicketVisible]: [boolean, Dispatch<SetStateAction<boolean>>] = React.useState(true);
    const [resultVisible, setResult_visible]: [boolean, Dispatch<SetStateAction<boolean>>] = React.useState(false);


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
                closeModalFunction={() => toggleResultVisibility()}/>
        )}
        
        {adressToGuess?.id && (
            <Modal
            transparent={true}
            animationType='fade'
            visible={ticketVisible}>
                <View 
                style={styles.centeredView}>
                    <View 
                    style={styles.ticketContainer}>
                        <View 
                        style={styles.ticket}>

                            <TouchableOpacity 
                                style={styles.ticketButtonContainer}
                                onPress={() => setTicketVisible(false)}>
                                <Text style={styles.ticketButtonIcon}>
                                    GOT IT !
                                </Text>
                            </TouchableOpacity>

                            <View
                            style={styles.ticketHole}>
                                {[...Array(20)].map((e, i) => <View style={styles.circle} key={i}></View>)}
                            </View>

                            <View
                            style={styles.ticketTextZone}>
                                <Text style={styles.ticketText}>
                                    INTERVENTION N°1234{"\n"}{"\n"}{"\n"}
                                    ADRESSE: {adressToGuess.num} {adressToGuess.rue} {"\n"}
                                    COMMUNE: {adressToGuess.cp} {adressToGuess.com} {"\n"}
                                </Text>
                                <Text>lat: {cursor?.latitude? cursor.latitude : "no"}</Text>
                                <Text>rue: {adressToGuess?.rue? adressToGuess.rue : "no"}</Text>
                            </View>
                            
                            <View
                            style={styles.ticketHole}>
                                {[...Array(20)].map((e, i) => <View style={styles.circle} key={i}></View>)}
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
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
                style={styles.ticketButtonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Image
                        style={styles.returnChevronIcon}
                        source={icons["chevron"]}
                    />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setTicketVisible(true)} >
                    <Image
                        style={styles.ticketButtonIcon}
                        source={icons["document"]}
                    />
                </TouchableOpacity>
            </View>
            <View 
                pointerEvents="box-none"
                style={styles.sendButton}>
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
      </View>
    );
};

const styles = StyleSheet.create({
    centeredView:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    ticketContainer:{
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.5,
    },
    ticket:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FEF9E7',
        overflow: 'hidden'
    },
    ticketTextZone: {
        //backgroundColor:'red',
        width: Dimensions.get('window').width*0.7,
    },
    ticketText: {
        textAlign:'center',
        color: 'black',
        fontFamily: 'monospace'
    },
    ticketHole:{
        backgroundColor:'#FFFFFF',
        paddingHorizontal: 10,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 1
    },
    circle:{
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: "black",
        marginVertical: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        },
    textContainer: {
        backgroundColor: 'green',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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
    sendButton: {
        position: 'absolute',
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        marginBottom: 30,
        marginRight: 20,   
    },
    sendButtonContainer:{
        backgroundColor: "#DAAC08",
        borderRadius: 40,
        padding: 10
    },
    sendButtonIcon: {
        width: 25,
        height: 25,
    },
    ticketButtonContainer:{
        width: '100%',
        position: 'absolute',
        top: 40,
        paddingHorizontal: 20,
        flex: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    ticketButtonIcon: {
        height: 30,
        width: 30,
    },
    returnChevronIcon: {
        height: 30,
        width: 30,
        transform: [{rotate: '180deg'}]
    },
});


export default MapGuesser
