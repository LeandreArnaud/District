import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import icons from '../../assets/icons/iconManager'
import text from '../../assets/text/text-fr.json'


export const DistrictSelectorModal: React.FC = () => {

    return(
        <View style={styles.container}>
            <View style={styles.backgroundBlur} />
            <View style={styles.modaleContainter}>
                <View style={styles.modaleTitleContainter}>
                    <Image
                        style={styles.titleIcon}
                        // @ts-ignore
                        source={icons[text.DistrictSelectorModal.icon]}
                    />
                    <View style={styles.modaleTitleTextContainter}>
                        <Text style={styles.h1}>{text.DistrictSelectorModal.title}</Text>
                        <Text style={styles.h2}>{text.DistrictSelectorModal.subtitle}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 6,
        width: "100%",
        height: "110%",
    },
    backgroundBlur: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        opacity: 0.4,
    },
    modaleContainter: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: 300,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    modaleTitleContainter: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    titleIcon: {
        width: 40,
        height: 40,
        resizeMode: "center",
    },
    modaleTitleTextContainter: {
        paddingLeft: 10,
        flex: 0,
        flexDirection: "column",
        justifyContent: "flex-start",
        height: 40,
    },
    h1: {
        fontSize: 22,
        fontWeight: "bold",
        lineHeight: 22,
    },
    h2: {
        fontSize: 15,
        lineHeight: 15,
    },
});


export default DistrictSelectorModal
