import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import text from '../assets/text/text-fr.json'


type HomePageProps = { navigation: any };

export const Homepage: React.FC<HomePageProps> = ({ navigation }) => {

    return(
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <Text>icon</Text>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.h1}>{text.homepage.title}</Text>
                    <Text style={styles.h2}>{text.homepage.subtile}</Text>
                </View>
            </View>

            <View style={styles.toolsContainer}>
            {text.homepage.tools.map(tool => 
                <TouchableOpacity style={styles.toolCardBody} onPress={()=>navigation.navigate('DistrictCreator')}>
                    <Text>{tool.icon}</Text>
                    <View style={styles.toolCardBodyRight}>
                        <Text style={styles.toolTitle}>{tool.title}</Text>
                        <Text style={styles.toolSubtitle}>{tool.description}</Text>
                    </View>
                </TouchableOpacity>
            )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40,
    },
    header: {
        backgroundColor: "green",
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        height: 80,
    },
    headerTextContainer: {
        backgroundColor: "red",
    },
    h1: {
        fontSize: 40,
    },
    h2: {
        fontSize: 20,
    },
    toolsContainer: {
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    toolCardBody: {
        backgroundColor: "yellow",
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        height: 80,
        width: '90%',
        borderRadius: 10,
        overflow: "hidden",
    },
    toolCardBodyRight: {
        backgroundColor: "pink",
    },
    toolTitle: {
        fontSize: 20,
    },
    toolSubtitle: {
        fontSize: 15,
    },
});


export default Homepage
