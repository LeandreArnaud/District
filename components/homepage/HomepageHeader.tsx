import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import text from '../../assets/text/text-fr.json'


export const HomepageHeader: React.FC = () => {

    return(
        <View style={styles.header}>
            <Image
                style={styles.headerIcon}
                source={require('../assets/icons/hydrant.png')}
            />
            <View style={styles.headerTextContainer}>
                <Text style={styles.h1}>{text.homepage.title}</Text>
                <Text style={styles.h2}>{text.homepage.subtile}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        height: 80,
    },
    headerIcon: {
        height: "70%",
        width: 50,
        resizeMode: "center",
    },
    headerTextContainer: {
        height: "100%",
        flex: 0,
        alignItems: "center",
    },
    h1: {
        color: "#DAAC08",
        fontSize: 40,
        fontWeight: "bold",
        letterSpacing: 2,
    },
    h2: {
        color: "#DAAC08",
        fontSize: 25,
        fontWeight: "bold",
        letterSpacing: 2,
        lineHeight: 25,
    },
});


export default HomepageHeader
