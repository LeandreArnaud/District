import React, { Dispatch, SetStateAction, useEffect } from 'react'
import MapView from 'react-native-maps';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal} from 'react-native'
import {getRandomAdress} from '../../API/mvp-district-API'
import mapStyle from '../../GMStyles/BlindMapStyle.js'
import MapGuesserResults from './MapGuesserResults';


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
    const [adressToGuess, setAdressToGuess]: [adress, Dispatch<SetStateAction<adress>>] = React.useState();
    const [cursor, setCursor]: [cursor, Dispatch<SetStateAction<cursor>>] = React.useState();
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
        getRandomAdress("'trappes'").then(data => 
            setAdressToGuess(data)
        );
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
                            <View 
                                pointerEvents="box-none"
                                style={styles.ticketButton}>
                                <TouchableOpacity 
                                    style={styles.ticketButtonContainer}
                                    onPress={() => setTicketVisible(false)}>
                                    <Text style={styles.ticketButtonText}>
                                        GOT IT !
                                    </Text>
                                </TouchableOpacity>
                            </View>

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
                region={cursor}
                onRegionChangeComplete={(region) => setCursor(region)}
                customMapStyle={mapStyle}
            >   
            </MapView>
            <View pointerEvents="none" style={styles.staticMarkerContainer}>
                <Text style={styles.textPointeur}>🚒</Text>
            </View>
            <View 
                pointerEvents="box-none"
                style={styles.ticketButton}>
                <TouchableOpacity 
                    style={styles.ticketButtonContainer}
                    onPress={() => setTicketVisible(true)}>
                    <Text style={styles.ticketButtonText}>
                        WATCH TICKET
                    </Text>
                </TouchableOpacity>
            </View>
            <View 
                pointerEvents="box-none"
                style={styles.sendButton}>
                <TouchableOpacity 
                    style={styles.sendButtonContainer}
                    onPress={() => toggleResultVisibility()}>
                    <Text style={styles.sendButtonText}>
                        SEND
                    </Text>
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.95,
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
    textPointeur: {
        fontSize: 20
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
        backgroundColor:'green',
        borderRadius: 40,
        padding: 15
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    ticketButton: {
        position: 'absolute',
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        marginTop: 10,   
    },
    ticketButtonContainer:{
        backgroundColor:'brown',
        borderRadius: 40,
        padding: 15
    },
    ticketButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});


export default MapGuesser
