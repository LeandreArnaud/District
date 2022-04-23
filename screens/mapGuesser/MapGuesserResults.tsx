import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react'
import MapView from 'react-native-maps';
import {Marker, Polygon} from 'react-native-maps';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal, ActivityIndicator, Image} from 'react-native'
import {getEvaluation} from '../../API/mvp-district-API'
import icons from '../../assets/icons/iconManager';
import gifs from '../../assets/gifs/gifManager';
import text from '../../assets/text/text-fr.json'

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


type Props = {
    adress: adress;
    cursor: cursor;
    closeModalFunction: () => void;
  };

const ResultLine = ({checked, title}) => (
    <View style={styles.postItRow}>
        <Image
            style={styles.checkedIcon}
            source={checked? icons["ckbChecked"]: icons["ckbUnchecked"]}
        />
        <Text style={styles.resultLineText}>{title}</Text>
    </View>
);

const ResultPostIt = ({score}) => (
    <View style={styles.postItContainer}>
        <View style={styles.scoreText}>
            <Text style={styles.scoreTextText}>{`${score}%`}</Text>
        </View>
        <ResultLine checked={score > 50} title={text.geoguesser.results.close} />
        <ResultLine checked={score > 80} title={text.geoguesser.results.street} />
        <ResultLine checked={score > 85} title={text.geoguesser.results.atDoor} />
    </View>
);

// modal showing the results of the guess and a map with the right point
export const MapGuesserResults: React.FC<Props> = ({
    adress,
    cursor,
    closeModalFunction,
}) => {
    const [results, setResults]: [results, Dispatch<SetStateAction<results>>] = React.useState();
    const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(true);

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
                {results?.score!=null &&
                    <MapView 
                    style={styles.map} 
                    region={{
                        latitude: (cursor.latitude+results.latAdress)/2,
                        longitude: (cursor.longitude+results.lonAdress)/2,
                        latitudeDelta: ((cursor.latitude-results.latAdress)**2)**0.5+0.005,
                        longitudeDelta: ((cursor.longitude-results.lonAdress)**2)**0.5+0.005,
                        }}> 
                        <Marker
                        coordinate={{ latitude : cursor.latitude , longitude : cursor.longitude }}
                        // TODO: add guessed adress
                        // </MapView>description={'descr'}
                        title={text.geoguesser.results.markers.guessed}>
                            <Image
                                style={styles.truckPointeur}
                                source={icons["firetruck"]}
                            />
                        </Marker>
                        <Marker
                        coordinate={{ latitude : results.latAdress , longitude : results.lonAdress }}
                        title={text.geoguesser.results.markers.true}
                        description={`${adress.num} ${adress.rue}\n${adress.com}`}>
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
            
            {isResultModalOpen ? (
                <View style={styles.resultsModal}>
                    <TouchableOpacity 
                    onPress={() => setIsResultModalOpen(false)} 
                    style={styles.chevronDownContainer}>
                        <Image
                            style={styles.chevronDown}
                            source={icons["chevron"]}
                        />
                    </TouchableOpacity>
                    <View style={styles.resultsModalContent}>
                        <View style={styles.leftContainer}>
                            <ResultPostIt score={results?.score ? Math.round(results.score*100) : 0}/>
                        </View>
                        <View style={styles.rightContainer}>
                            <View style={styles.gifContainer}>
                                <Image
                                    style={styles.gif}
                                    source={gifs["amazing"]}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            ) : (
                <TouchableOpacity 
                style={styles.chevronUpContainer} 
                onPress={() => setIsResultModalOpen(true)}>
                    <Image
                        style={styles.chevronUp}
                        source={icons["chevron"]}
                    />
                </TouchableOpacity>
            )}

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
        padding: 10,
        elevation: 100,
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
    resultsModal: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 200,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        elevation: 40,
        flex: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chevronDownContainer: {
        height: '10%',
    },
    chevronDown: {
        transform: [{rotate: '90deg'}],
        height: '100%',
        resizeMode: "center",
    },
    chevronUpContainer: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        flex: 0,
        alignItems: 'center'
    },
    chevronUp: {
        resizeMode: "center",
        transform: [{rotate: '270deg'}],
    },
    resultsModalContent: {
        width: '100%',
        height: '90%',
        flex: 0,
        flexDirection: 'row',
    },
    leftContainer: {
        width: '40%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postItContainer: {
        backgroundColor: '#FFF5D1',
        height: '70%',
        width: '60%',
        borderRadius: 4,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    scoreText: {
        position: 'absolute',
        top: -10,
        right: -10,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#C3FFB9',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    scoreTextText: {
        fontWeight: 'bold',
    },
    postItRow:{
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginTop: 5,
    },
    checkedIcon: {
        height: 20,
        width: 20,
    },
    resultLineText: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
    rightContainer: {
        width: '60%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gifContainer: {
        height: '80%',
        width: '80%',
        borderRadius: 10,
        overflow: 'hidden',
    },
    gif: {
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
    }
});


export default MapGuesserResults
