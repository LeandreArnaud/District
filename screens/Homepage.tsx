import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'


type HomePageProps = { navigation: any };

export const Homepage: React.FC<HomePageProps> = ({ navigation }) => {

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.h1}>Tools</Text>
            <View style={styles.toolsContainer}>
            <TouchableOpacity style={styles.tool} onPress={()=>navigation.navigate('DistrictCreator')}>
                <Text style={styles.toolText}>🌎 MapGuesser</Text>
            </TouchableOpacity>
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
    h1: {
        fontSize: 40,
    },
    toolsContainer: {
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    tool: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#aaaaaa',
        width: '80%',
        borderRadius: 4,
    },
    toolText: {
        fontSize: 20,
    }
});


export default Homepage
