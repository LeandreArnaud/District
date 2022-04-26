import React, { useEffect, useState } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, ColorPropType} from 'react-native'
import text from '../assets/text/text-fr.json'
import DistrictSelectorModal from '../components/homepage/DistrictSelectorModal';
import HomepageHeader from '../components/homepage/HomepageHeader';
import ToolCell from '../components/homepage/ToolCell';
import { resetDistricts, getDistricts } from '../utile/LocalStorage';

interface city {
    COM: string;
    CP: string;
    COM_NORM: string;
    LAT: number;
    LON: number;
};
interface district {
    shortname: string;
    centerLat: number;
    centerLon: number;
    cities: city[];
};


export const Settings: React.FC = () => {
    const [districts, setDistricts] = useState<Array<district>>();

    useEffect(() => {
        getDistricts().then(res => setDistricts(res))
    }, [])

    const handleResetDistrict = async () => {
        await resetDistricts();
        getDistricts().then(res => setDistricts(res))
    }
 
    return(
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={handleResetDistrict} disabled={!districts} style={styles.cell}>
                {districts 
                    ? <Text style={styles.enable}> effacer les districts </Text>
                    : <Text style={styles.disable}> Aucun district </Text>
                }
            </TouchableOpacity>
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
        paddingHorizontal: 10,
    },
    cell: {
        width: "100%",
        height: 50,
        flex: 0,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: "#D0D0D0"
    },
    enable: {
        color: "#000000"
    },
    disable: {
        color: "#808080"
    },
});


export default Settings
