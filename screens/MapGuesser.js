import React from 'react'
import MapView from 'react-native-maps';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal} from 'react-native'
import {get_random_adress, get_evaluation} from '../API/mvp-district-API.js'
import mapStyle from '../GMStyles/BlindMapStyle.js'
import { connect } from 'react-redux'




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
        score: 0,
        // components
        ticket_visible: true
    }
  }
   n = 20

  


    componentDidMount(){
        get_random_adress(this.props.token).then(data => this.setState({adresse : {
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
        get_evaluation(this.props.token, 
            this.state.adresse.id, 
            this.state.region.latitude, 
            this.state.region.longitude).then(data => this.setState({
                score: data.score,
                distance: data.distance
            }))
    }

    _toggleTicketVisibility(){
        this.setState({ticket_visible: !this.state.ticket_visible})
    }


  // TODO: add PROVIDER_GOOGLE for GM on iOS
  render(){
    return(
      <View style={styles.container}>
        
    
        <Modal
        transparent={true}
        animationType='fade'
        visible={this.state.ticket_visible}>
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
                                onPress={() => this._toggleTicketVisibility()}>
                                <Text style={styles.ticketButtonText}>
                                    CLOSE
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                        style={styles.ticketHole}>
                            {[...Array(this.n)].map((e, i) => <View style={styles.circle}></View>)}
                        </View>

                        <View
                        style={styles.ticketTextZone}>
                            <Text style={styles.ticketText}>
                                INTERVENTION N°1234{"\n"}{"\n"}{"\n"}
                                ADRESSE: {this.state.adresse.num} {this.state.adresse.rue} {"\n"}
                                COMMUNE: {this.state.adresse.cp} {this.state.adresse.com}{"\n"}
                            </Text>
                        </View>
                        
                        <View
                        style={styles.ticketHole}>
                            {[...Array(this.n)].map((e, i) => <View style={styles.circle}></View>)}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
        

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
                style={styles.ticketButton}>
                <TouchableOpacity 
                    style={styles.ticketButtonContainer}
                    onPress={() => this._toggleTicketVisibility()}>
                    <Text style={styles.ticketButtonText}>
                        TICKET
                    </Text>
                </TouchableOpacity>
            </View>
            <View 
                pointerEvents="box-none"
                style={styles.sendButton}>
                <TouchableOpacity 
                    style={styles.sendButtonContainer}
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
        //backgroundColor:'red'
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
        backgroundColor:'red',
        borderRadius: 40,
        padding: 15
    },
    ticketButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});


const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(MapGuesser)
