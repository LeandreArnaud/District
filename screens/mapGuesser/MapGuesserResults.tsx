import React, { Dispatch, SetStateAction, useEffect } from 'react'
import MapView from 'react-native-maps';
import {Marker, Polygon} from 'react-native-maps';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal, ActivityIndicator, Image} from 'react-native'
import {getEvaluation} from '../../API/mvp-district-API'
import icons from '../../assets/icons/iconManager';

type results = {
    latAdress: number;
    lonAdress: number;
    distance: number;
    score: number;
} | undefined;

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


export type Props = {
    adress: adress;
    cursor: cursor;
    closeModalFunction: () => void;
  };

// modal showing the results of the guess and a map with the right point
export const MapGuesserResults: React.FC<Props> = ({
    adress,
    cursor,
    closeModalFunction,
}) => {
    const [results, setResults]: [results, Dispatch<SetStateAction<results>>] = React.useState();

    const evaluate = () => {
        getEvaluation({
            id: adress.id, 
            lat: parseFloat(cursor.latitude.toFixed(5)), 
            lon: parseFloat(cursor.longitude.toFixed(5)),
        }).then(data => {
            setResults({
                score: data.score,
                distance: data.distance,
                latAdress: data.lat,
                lonAdress: data.lon
            })
        });
    }

    useEffect(() => {
        evaluate()
    }, [])

    return(
        <View style={styles.modalContainer}>
            <View style={styles.mapContainer}>
                {results?.score==null ?
                    <ActivityIndicator
                    color='#000000'
                    size='large'>
                    </ActivityIndicator>
                :
                    <MapView 
                    style={styles.map} 
                    region={{
                        latitude: (cursor.latitude+results.latAdress)/2,
                        longitude: (cursor.longitude+results.lonAdress)/2,
                        latitudeDelta: ((cursor.latitude-results.latAdress)**2)**0.5+0.005,
                        longitudeDelta: ((cursor.longitude-results.lonAdress)**2)**0.5+0.005,
                        }}> 
                        {/* guessed */}
                        <Marker
                        coordinate={{ latitude : cursor.latitude , longitude : cursor.longitude }}
                        title={'guessed'}
                        description={'descr'}>
                            <Image
                                style={styles.truckPointeur}
                                source={icons["firetruck"]}
                            />
                        </Marker>
                        {/* true */}
                        <Marker
                        coordinate={{ latitude : results.latAdress , longitude : results.lonAdress }}
                        title={'true'}
                        description={'descr'}>
                            <Image
                                style={styles.fireGifMarker}
                                source={icons["fireGif"]}
                            />
                        </Marker>

                        <Polygon
                        coordinates={[
                            { latitude : cursor.latitude , longitude : cursor.longitude },
                            { latitude : results.latAdress , longitude : results.lonAdress }
                        ]}>
                        </Polygon>
                    </MapView>
                }
            </View>

            <TouchableOpacity
            style={styles.closeButtonContainer}
            onPress={closeModalFunction}>
                <Image
                    style={styles.closeButtonIcon}
                    source={icons["refresh"]}
                />
            </TouchableOpacity>

        </View>
        
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    mapContainer: {
        width: '100%',
        height: '100%',
    },
    map: {
        width: '100%',
        height: '100%',
        },
    closeButtonContainer:{
        position: 'absolute',
        bottom: 30, 
        right: 20,  
        backgroundColor: "#DAAC08",
        borderRadius: 40,
        padding: 10
    },
    closeButtonIcon: {
        width: 25,
        height: 25,
    },
    truckPointeur:{
        width: 25,
        height: 25,
    },
    fireGifMarker:{
        width: 40,
        height: 40,
    },
});


export default MapGuesserResults
