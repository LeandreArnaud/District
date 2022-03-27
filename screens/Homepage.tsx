import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'
import text from '../assets/text/text-fr.json'
import HomepageHeader from '../components/homepage/HomepageHeader';
import ToolCell from '../components/homepage/ToolCell';


type HomePageProps = { navigation: any };

export const Homepage: React.FC<HomePageProps> = ({ navigation }) => {

    return(
        <View style={styles.mainContainer}>
            <HomepageHeader />

            <View style={styles.toolsContainer}>
            {text.homepage.tools.map(tool => 
                <ToolCell tool={tool} navigation={navigation}/>
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
    toolsContainer: {
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
});


export default Homepage
