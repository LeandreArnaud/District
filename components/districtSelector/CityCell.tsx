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
                {add ? (
                    <Image
                        style={styles.addIcon}
                        // @ts-ignore
                        source={icons['add']}
                    />
                ) : (
                    <Image
                        style={styles.removeIcon}
                        // @ts-ignore
                        source={icons['remove']}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cityCell: {
        height: 40,
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
    addIcon: {
        width: 30,
        height: 30,
    },
    removeIcon: {
        width: 20,
        height: 20,
    },
});


export default CityCell
