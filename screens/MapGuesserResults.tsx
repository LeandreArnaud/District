import React, { Dispatch, SetStateAction } from 'react'
import MapView from 'react-native-maps';
import {Marker, Polygon} from 'react-native-maps';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal, ActivityIndicator} from 'react-native'
import {getEvaluation} from '../API/mvp-district-API'


interface results {
    latAdress: number;
    lonAdress: number;
    distance: number;
    score: number;
}

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
    const [results, setResults]: [results, Dispatch<SetStateAction<results>>] = React.useState(null);

    const evaluate = () => {
        getEvaluation({
            id: adress.id, 
            lat: cursor.latitude, 
            lon: cursor.longitude,
        }).then(data => {
            setResults({
                score: data.score,
                distance: data.distance,
                latAdress: data.lat,
                lonAdress: data.lon
            })
        });
    }


    return(
        <Modal
        transparent={true}
        animationType='fade'
        onShow={evaluate}>
            <View 
            style={styles.centeredView}>
                <View style={styles.container}>
                    <View style={styles.scoreContainer}>
                        {results?.score!=null ?
                            <Text style={styles.scoreText}>
                                Your score is {Math.round(results.score*100)/100} !!{"\n"}
                                (Distance is ({Math.round(results.distance)}m)
                            </Text>
                        :
                            <ActivityIndicator
                            color='#000000'
                            size='large'>
                            </ActivityIndicator>
                        }
                    </View>
                    
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
                                </Marker>
                                {/* true */}
                                <Marker
                                coordinate={{ latitude : results.latAdress , longitude : results.lonAdress }}
                                title={'true'}
                                description={'descr'}>
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
                        <Text style={styles.closeButtonText}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        
    );
}

const styles = StyleSheet.create({
    centeredView:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        alignItems: 'center',
        justifyContent: 'center',
        },
    scoreContainer:{
        backgroundColor: 'rgba('+255+', 0, 0, 1.0)',
        width: Dimensions.get('window').width*0.9,
        alignItems: 'center',
        paddingVertical:10
    },
    scoreText:{
        color:'white',
        fontWeight:'bold',
    },
    mapContainer: {
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.7,
    },
    map: {
        width: '100%',
        height: '100%',
        },
    closeButtonContainer:{
        backgroundColor:'green',
        borderRadius: 40,
        padding: 15,
        marginTop: 10
    },
    closeButtonText:{
        fontWeight:'bold',
        color:'white'
    }
});


export default MapGuesserResults
