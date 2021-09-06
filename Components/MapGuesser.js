import React from 'react'
import MapView from 'react-native-maps';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity} from 'react-native'
import {get_random_adress, get_evaluation} from '../API/mvp-district-API.js'
import mapStyle from '../GMStyles/BlindMapStyle.js'



// screen where you try to guess the location of an adress
class MapGuesser extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        region: {
            // beginning location
            latitude: 48.77687769018972,
            longitude: 2.000842701780273,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        // adress to guess
        adresse: {
            id: null,
            num: null,
            rue: null,
            cp: null,
            com: null,
        },
        // beginning score
        distance: 'infinite',
        score: 0
    }
  }


    componentDidMount(){
        get_random_adress().then(data => this.setState({adresse : {
            id: data.id,
            num: data.num,
            rue: data.rue,
            cp: data.cp,
            com: data.com}})); 
    }

    _onRegionChangeComplete(region){
        this.setState({ region:  region})
    }
    
    _getScore(){
        get_evaluation(this.state.adresse.id, 
            this.state.region.latitude, 
            this.state.region.longitude).then(data => this.setState({
                score: data.score,
                distance: data.distance
            }))
    }


  // TODO: add PROVIDER_GOOGLE for GM on iOS
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.ticketText}>
                lat: {this.state.region.latitude}; lon: {this.state.region.longitude}{"\n"}
                {this.state.adresse.num} {this.state.adresse.rue} {this.state.adresse.cp} {this.state.adresse.com}{"\n"}
                score: {this.state.score} distance: {this.state.distance} 
            </Text>
        </View>
        <View style={styles.mapContainer}>
            <MapView 
                style={styles.map} 
                region={this.state.region}
                onRegionChangeComplete={(region) => this._onRegionChangeComplete(region)}
                customMapStyle={mapStyle}
            >   
            </MapView>
            <View pointerEvents="none" style={styles.staticMarkerContainer}>
                <Text style={styles.textPointeur}>🚒</Text>
            </View>
            <View 
                pointerEvents="box-none"
                style={styles.sendButton}>
                <TouchableOpacity 
                style={styles.TO}
                onPress={() => this._getScore()}>
                <Text style={styles.sendButtonText}>
                    SEND
                </Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    ticketText: {
        textAlign:'center'
    },
    mapContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.85,
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
    sendButtonText: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
    },
    TO:{
        backgroundColor:'green'
    }
});

export default MapGuesser
