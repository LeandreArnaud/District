import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import icons from '../../assets/icons/iconManager'
import text from '../../assets/text/text-fr.json'

interface city {
    COM: string;
    CP: string;
    COM_NORM: string;
};
interface district {
    shortname: string;
    centerLat: number;
    centerLon: number;
    cities: city[];
};

type districts = district[]

type DistrictSelectorModalProps = { hideModal: () => void, districts?: districts|undefined, opentool: () => void, navigation: any };

export const DistrictSelectorModal: React.FC<DistrictSelectorModalProps> = ({hideModal, districts, opentool, navigation}) => {

    const maxCitiesDisplayed = 4;

    const cityLine = (city: city) => (
        <View style={styles.districtCityContainer}>
            <Text numberOfLines={1} style={styles.districtCityName}>{city.COM}</Text>
            <Text>{city.CP}</Text>
        </View>
    );
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

                {districts && districts.map(dis => 
                    <TouchableOpacity style={styles.districtCellContainer} onPress={opentool} key={`${dis.shortname}-${dis.centerLat}`}>
                        <Text style={styles.districtCellTitle}>{dis.shortname.toUpperCase().slice(0,3)}</Text>
                        <View style={styles.districtCitiesContainer}>
                            {dis.cities.length <= maxCitiesDisplayed+1
                                ? dis.cities.map(cit => cityLine(cit))
                                : dis.cities
                                    .slice(0, maxCitiesDisplayed)
                                    .concat([{COM: `${text.DistrictSelectorModal.cityOverflow.and} ${dis.cities.length-maxCitiesDisplayed} ${text.DistrictSelectorModal.cityOverflow.more}`, CP: "", COM_NORM: ""}])
                                    .map(cit => cityLine(cit))
                            }
                        </View>
                    </TouchableOpacity>
                )}

                <View style={styles.addButtonContainer}>
                    <TouchableOpacity style={styles.addButtonTouchable} onPress={() => navigation.navigate("DistrictCreator")}>
                        <Text style={styles.addButtonText}>{text.DistrictSelectorModal.add}</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: "#FFFFFF",
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 20,
        paddingBottom: 70,
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
        height: 80,
        flex: 0,
        flexDirection: "row",
        paddingRight: 10,
        paddingVertical: 5,
        borderRadius: 7,
        elevation: 3,
        shadowColor: "#000000",
        backgroundColor: "#FFFFFF",
        marginBottom: 10,
    },
    districtCellTitle: {
        textAlign: "center",
        textAlignVertical: "center",
        color: "#DAAC08",
        fontSize: 30,
        width: "25%",
        fontWeight: "bold",
        paddingHorizontal: 15,
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
    districtCityName: {
        width: "85%"
    },
    addButtonContainer: {
        marginTop: 20,
        width: "100%",
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    addButtonTouchable: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "#DAAC08",
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000000",
    },
    addButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});


export default DistrictSelectorModal
