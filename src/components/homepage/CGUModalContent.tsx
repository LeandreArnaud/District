import React, { useState } from 'react'
import {StyleSheet, View, Text} from 'react-native'
import text from '../../../assets/text/text-fr.json'
import { saveAcceptedCGU } from '../../services/LocalStorage';
import cguText from '../../../assets/text/cgu.json'
import { ScrollView } from 'react-native-gesture-handler';

type CGUModalContentProps = {
    onCloseModal: () => void
};

export const CGUModalContent: React.FC<CGUModalContentProps> = ({onCloseModal}) => {

    // disable for now to avoid user blocked on modal
    const [hasScrollToBottom, setHasScrollToBottom] = useState<boolean>(true);

    const handleAcceptedButton = async () => {
        if (hasScrollToBottom) {
            await saveAcceptedCGU();
            onCloseModal();
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.body}>
                <ScrollView onScrollEndDrag={() => setHasScrollToBottom(true)}>
                    <View>
                        <Text style={styles.h1}>{text.CGU.cgu.title}</Text>
                        {Object.keys(cguText).map((key, index) => 
                            <View key={`view-${index}`}>
                                <Text style={styles.h2} key={`${index}`}>{key}</Text>
                                {Object.values(cguText)[index].map((para, subindex) => 
                                    <Text style={styles.p} key={`${subindex}-${index}`}>{para}</Text>
                                )}
                            </View>
                        )}
                        <View style={styles.bottomMargin}/>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={hasScrollToBottom 
                    ? styles.button 
                    : {...styles.button, backgroundColor:'#CCCCCC'}} 
                onTouchEnd={handleAcceptedButton}>
                    <Text style={ hasScrollToBottom 
                        ? styles.buttonText
                        : {...styles.buttonText, color:'gray'}}>
                            {text.CGU.cgu.acceptedButton}
                    </Text>
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
        height: '100%',
        overflow: 'hidden',
    },
    bottomMargin: {
        marginBottom: 60,
    },
    h1: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    h2: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    p: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'justify',
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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
        color: 'black'
    }
});


export default CGUModalContent
