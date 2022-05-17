import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native'
import text from '../../../assets/text/text-fr.json'

type adress = {
    id: string;
    num: string;
    rue: string;
    cp: string;
    com: string;
} | undefined;

type TicketProps = { adressToGuess: adress, hideTicket: () => void };

export const Ticket: React.FC<TicketProps> = ({adressToGuess, hideTicket }) => {

    return(
        <View style={styles.modalContainer} >
            <TouchableOpacity style={styles.blurredBackground} onPress={hideTicket} />
            <View style={styles.ticketContainer} >
                <View style={styles.ticket} >
                    <View
                    style={styles.ticketHole}>
                        {[...Array(20)].map((e, i) => <View style={styles.circle} key={i}></View>)}
                    </View>

                    <View
                    style={styles.ticketTextZone}>
                        <Text style={styles.ticketText}>
                            {`${text.geoguesser.guesser.ticket.title}\n\n\n`}
                            {`${text.geoguesser.guesser.ticket.adress}${adressToGuess?.num} ${adressToGuess?.rue}\n`}
                            {`${text.geoguesser.guesser.ticket.com}${adressToGuess?.cp} ${adressToGuess?.com}\n`}
                        </Text>
                    </View>
                    
                    <View
                    style={styles.ticketHole}>
                        {[...Array(20)].map((e, i) => <View style={styles.circle} key={i}></View>)}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1,
        flex: 0,
        alignItems:'center',
        justifyContent: 'center',
    },
    blurredBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        top: 0,
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
        overflow: 'hidden',
        borderRadius: 20,
    },
    ticketTextZone: {
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
});


export default Ticket
