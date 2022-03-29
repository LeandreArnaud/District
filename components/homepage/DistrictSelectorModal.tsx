import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import icons from '../../assets/icons/iconManager'
import text from '../../assets/text/text-fr.json'

type cityType = {name: string, CP: string}
type districtType = {shortname: string, cities: cityType[]}

type DistrictSelectorModalProps = { hideModal: () => void, districts: districtType[] };

export const DistrictSelectorModal: React.FC<DistrictSelectorModalProps> = ({hideModal, districts}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.backgroundBlur} onPress={hideModal}/>
            <View style={styles.modaleContainter}>

                <View style={styles.modaleTitleContainter}>
                    <Image
                        style={styles.titleIcon}
                        // @ts-ignore
                        source={icons[text.DistrictSelectorModal.icon]}
                    />
                    <View style={styles.modaleTitleTextContainter}>
                        <Text style={styles.h1}>{text.DistrictSelectorModal.title}</Text>
                        <Text style={styles.h2}>{text.DistrictSelectorModal.subtitle}</Text>
                    </View>
                </View>

                {districts.map(dis => 
                    <View style={styles.districtCellContainer}>
                        <Text style={styles.districtCellTitle}>{dis.shortname}</Text>
                        <View style={styles.districtCitiesContainer}>
                            {dis.cities.map(cit => 
                                <View style={styles.districtCityContainer}>
                                    <Text>{cit.name}</Text>
                                    <Text>{cit.CP}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 6,
        width: "100%",
        height: "110%",
    },
    backgroundBlur: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        opacity: 0.4,
    },
    modaleContainter: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: 300,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    modaleTitleContainter: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    titleIcon: {
        width: 40,
        height: 40,
        resizeMode: "center",
    },
    modaleTitleTextContainter: {
        paddingLeft: 10,
        flex: 0,
        flexDirection: "column",
        justifyContent: "flex-start",
        height: 40,
    },
    h1: {
        fontSize: 22,
        fontWeight: "bold",
        lineHeight: 22,
    },
    h2: {
        fontSize: 15,
        lineHeight: 15,
    },
    districtCellContainer: {
        height: 70,
        flex: 0,
        flexDirection: "row",
        paddingRight: 10,
        paddingVertical: 5,
        borderRadius: 7,
        elevation: 4,
        shadowColor: "#000000",
    },
    districtCellTitle: {
        textAlign: "center",
        textAlignVertical: "center",
        color: "red",
        fontSize: 30,
        fontWeight: "bold",
        paddingHorizontal: 10,
    },
    districtCitiesContainer: {
        flex: 1,
        justifyContent: "center",
    },
    districtCityContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between"
    },
});


export default DistrictSelectorModal
