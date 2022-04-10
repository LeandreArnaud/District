import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import text from '../../assets/text/text-fr.json'
import icons from '../../assets/icons/iconManager';

type HomepageHeaderProps = { onSettings: () => void };

export const HomepageHeader: React.FC<HomepageHeaderProps> = ({onSettings}) => {

    return(
        <View style={styles.container}>
            <View style={styles.sideButton} />

            <View style={styles.header}>
                <Image
                    style={styles.headerIcon}
                    source={icons["hydrant"]}
                />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.h1}>{text.homepage.title}</Text>
                    <Text style={styles.h2}>{text.homepage.subtile}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.sideButton} onPress={onSettings}>
                <Image
                    style={styles.paramsIcon}
                    source={icons["dots"]}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
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
    sideButton: {
        paddingTop: 10,
        width: 40,
        height: 60,        
        justifyContent: "center"
    },
    paramsIcon: {
        width: "100%",
        opacity: 0.4,
        resizeMode: "center",
    }
});


export default HomepageHeader
