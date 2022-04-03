import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'
import icons from '../../assets/icons/iconManager';

interface city {
    COM: string;
    CP: string;
    COM_NORM: string;
};
type CityCellProps = { city: city, onRemove: () => void, add?: boolean };

export const CityCell: React.FC<CityCellProps> = ({ city, onRemove, add }) => {
    return(
        <View style={styles.cityCell} key={city.COM}>
            <View style={styles.cityCellText}>
                <Text>{city.CP}   -   </Text>
                <Text>{city.COM_NORM}</Text>
            </View>
            <TouchableOpacity onPress={onRemove}>
                <Text>{add ? 'add' : 'suppr'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cityCell: {
        height: 30,
        marginTop: 5,
        paddingHorizontal: 10,
        backgroundColor: "#F0F0F0",
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '98%',
        borderRadius: 3,
        overflow: "hidden",
    },
    cityCellText: {
        flex:  0,
        flexDirection: "row",
    },
});


export default CityCell
