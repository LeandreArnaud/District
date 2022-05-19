import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import text from '../../../assets/text/text-fr.json'
import { saveAcceptedCGU } from '../../services/LocalStorage';

type CGUModalContentProps = {
    onCloseModal: () => void
};

export const CGUModalContent: React.FC<CGUModalContentProps> = ({onCloseModal}) => {

    const handleAcceptedButton = async () => {
        await saveAcceptedCGU();
        onCloseModal();
    }

    return(
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.h1}>CGU</Text>
                <Text style={styles.p}>content</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.button} onTouchEnd={handleAcceptedButton}>
                    <Text style={styles.buttonText}>Accepter</Text>
                </View>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '90%',
        height: '60%',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        overflow: 'hidden',
    },
    body: {
        width: '90%',
    },
    h1: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    p: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'justify',
    },
    buttonsContainer: {
        height: 50,
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        backgroundColor: '#DAAC08',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0,
        width: 100,
        height: 40,
        borderRadius: 10,
        elevation: 5,
    },
    buttonText: {
        fontWeight: 'bold',
    }
});


export default CGUModalContent
