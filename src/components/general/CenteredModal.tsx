import React from 'react'
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native'

type CenteredModalProps = { hideModal: () => void, children: React.ReactNode};

export const CenteredModal: React.FC<CenteredModalProps> = ({children, hideModal}) => {

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={hideModal}>
                <View style={styles.backgroundBlur} />
            </TouchableWithoutFeedback>
                {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 6,
        width: "100%",
        height: "110%",
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundBlur: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        opacity: 0.4,
        position: "absolute",
        top: 0,
    },
});


export default CenteredModal
