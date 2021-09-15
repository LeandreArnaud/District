import React from 'react'
import MapView from 'react-native-maps';
import {Marker, Polygon} from 'react-native-maps';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal, ActivityIndicator} from 'react-native'
import {get_evaluation} from '../API/mvp-district-API.js'




// modal showing the results of the guess and a map with the right point
class MapGuesserResults extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        latAdress: 48.77687769018972,
        lonAdress: 2.000842701780273,
        distance: null,
        score: null
    }
  }

  
    _get_evaluation(){
        this.setState({
            score: null,
            distance: null
        })        
        get_evaluation(this.props.token, 
            this.props.id, 
            this.props.latGuessed, 
            this.props.lonGuessed).then(data => this.setState({
                score: data.score,
                distance: data.distance,
                latAdress: parseFloat(data.lat),
                lonAdress: parseFloat(data.lon)
            }))
    }


  // TODO: add PROVIDER_GOOGLE for GM on iOS
  render(){
    return(
        <Modal
        transparent={true}
        animationType='fade'
        visible={this.props.visible}
        onShow={() => this._get_evaluation()}>
            <View 
            style={styles.centeredView}>
                <View style={styles.container}>
                    <View style={styles.scoreContainer}>
                        {this.state.score!=null?
                            
                            <Text style={styles.scoreText}>
                                Your score is {Math.round(this.state.score*100)/100} !!{"\n"}
                                (Distance is ({Math.round(this.state.distance)}m)
                            </Text>
                            
                        :
                            <ActivityIndicator
                            color='#000000'
                            size='large'>
                            </ActivityIndicator>
                        }
                    </View>
                    
                    <View style={styles.mapContainer}>
                        {this.state.score=null?
                            <ActivityIndicator
                            color='#000000'
                            size='large'>
                            </ActivityIndicator>
                        :
                            <MapView 
                            style={styles.map} 
                            region={{
                                latitude: (this.props.latGuessed+this.state.latAdress)/2,
                                longitude: (this.props.lonGuessed+this.state.lonAdress)/2,
                                latitudeDelta: ((this.props.latGuessed-this.state.latAdress)**2)**0.5+0.005,
                                longitudeDelta: ((this.props.lonGuessed-this.state.lonAdress)**2)**0.5+0.005,
                                }}> 
                                <Marker
                                coordinate={{ latitude : this.props.latGuessed , longitude : this.props.lonGuessed }}
                                title={'guessed'}
                                description={'descr'}>
                                </Marker>

                                <Marker
                                coordinate={{ latitude : this.state.latAdress , longitude : this.state.lonAdress }}
                                title={'true'}
                                description={'descr'}>
                                </Marker>

                                <Polygon
                                coordinates={[
                                    { latitude : this.props.latGuessed , longitude : this.props.lonGuessed },
                                    { latitude : this.state.latAdress , longitude : this.state.lonAdress }
                                ]}>
                                </Polygon>
                            </MapView>
                        }
                    </View>

                    <TouchableOpacity
                    style={styles.closeButtonContainer}
                    onPress={() => this.props.closeModalFunction()}>
                        <Text style={styles.closeButtonText}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        
    );
  }
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
