import React from 'react'
import {StyleSheet, View, Text, Linking} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import text from '../../assets/text/text-fr.json'

export const AboutPage: React.FC = () => {
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.h1}>{text.CGU.about.title1}</Text>
            <Text style={styles.p}>{text.CGU.about.p1}</Text>
            <Text onPress={() => Linking.openURL(text.CGU.about.a1link)} style={styles.a}>{text.CGU.about.a1}</Text>
            <Text onPress={() => Linking.openURL(text.CGU.about.a2link)} style={styles.a}>{text.CGU.about.a2}</Text>
            <View style={styles.sep}/>

            <Text style={styles.h2}>{text.CGU.cgu.title}</Text>
            <Text style={styles.h3}>{text.CGU.cgu.part1title}</Text>
            <Text style={styles.p}>{text.CGU.cgu.part1text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    h1: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    h3: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%',
    },
    p: {
        fontSize: 15,
        width: '100%',
        marginBottom: 10,
        textAlign: 'justify',
    },
    a: {
        fontSize: 15,
        color: '#DAAC08',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    sep: {
        height: 40,
    }
});


export default AboutPage
