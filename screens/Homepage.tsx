import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'
import text from '../assets/text/text-fr.json'


type HomePageProps = { navigation: any };

export const Homepage: React.FC<HomePageProps> = ({ navigation }) => {

    return(
        <View style={styles.mainContainer}>
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

            <View style={styles.toolsContainer}>
            {text.homepage.tools.map(tool => 
                <TouchableOpacity style={styles.toolCardBody} onPress={()=>navigation.navigate('DistrictCreator')} key={tool.title}>
                    {/* <Text style={styles.toolIcon}>{tool.icon}</Text> */}
                    <Image
                        style={styles.toolIcon}
                        source={require('../assets/icons/earth.png')}
                    />
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
    toolsContainer: {
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    toolCardBody: {
        backgroundColor: "#FFFFFF",
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 15,
        width: '95%',
        borderRadius: 6,
        overflow: "hidden",
        elevation: 4,
        shadowColor: "#000000",
    },
    toolIcon: {
        width: '20%',
        height: 40,
        resizeMode: 'center',
    },
    toolCardBodyRight: {
        width: '80%',
        paddingRight: 10,
    },
    toolTitle: {
        fontSize: 20,
        fontWeight: "700",
        paddingBottom: 3,
    },
    toolSubtitle: {
        fontSize: 13,
    },
});


export default Homepage
