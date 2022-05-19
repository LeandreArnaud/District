import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import text from '../../../assets/text/text-fr.json'

type UpdateModalContentProps = {
    onCloseModal: () => void
};

export const UpdateModalContent: React.FC<UpdateModalContentProps> = ({onCloseModal}) => {

    return(
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.h1}>{text.updateModal.title}</Text>
                <Text style={styles.p}>{text.updateModal.body}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={{...styles.button, backgroundColor: '#DDDDDD' }} onTouchEnd={onCloseModal}>
                    <Text style={styles.buttonText}>{text.updateModal.no}</Text>
                </View>
                <View style={styles.button} onTouchEnd={() => {}}>
                    <Text style={styles.buttonText}>{text.updateModal.yes}</Text>
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
        flex: 1,
    },
    buttonText: {
        fontWeight: 'bold',
    }
});


export default UpdateModalContent
