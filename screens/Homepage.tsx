import React from 'react'
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, Modal} from 'react-native'



// screen where you try to guess the location of an adress
export const Homepage: React.FC = ({}) => {

    return(
        <View style={styles.container}>
            <Text>Homepage</Text>
            <TouchableOpacity onPress={()=>console.log('coucou')}>
                <Text>Go to MapGuesser</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        },
});


export default Homepage
