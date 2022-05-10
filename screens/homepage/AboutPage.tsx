import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

export const AboutPage: React.FC = () => {
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.h1}>District</Text>
            <Text style={styles.p}>DISTRICT est une application au service des sapeurs pompiers. Elle a pour objectif d'aider l'homme de terrain dans ses missions et son entrainement à travers d'outils évolutifs.</Text>
            <Text style={styles.a}>Nous contacter</Text>
            <Text style={styles.a}>Signaler un bug</Text>
            <View style={styles.sep}/>

            <Text style={styles.h2}>Conditions générales d’utilisation (CGU)</Text>
            <Text style={styles.h3}>Consistence</Text>
            <Text style={styles.p}>Les données présentes dans l'application DISTRICT et leur présentation peuvent comporter des erreurs. Les services de secours ne doivent en aucun cas se fier uniquement aux information de l'application pour leurs activités</Text>
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
