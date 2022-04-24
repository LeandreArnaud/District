import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import text from '../assets/text/text-fr.json'
import DistrictSelectorModal from '../components/homepage/DistrictSelectorModal';
import HomepageHeader from '../components/homepage/HomepageHeader';
import ToolCell from '../components/homepage/ToolCell';
import { getDistricts } from '../utile/LocalStorage';

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

type districts = district[]

type HomePageProps = { navigation: any };

export const Homepage: React.FC<HomePageProps> = ({ navigation }) => {
    const [districtSelectionModalEnable, setDistrictSelectionModalEnable] = useState(false);
    const [toolToOpen, setToolToOpen] = useState<string>();
    const [savedDistricts, setSavedDistricts] = useState<districts>();

    const openTool = (district: district) => {
        setDistrictSelectionModalEnable(false)
        navigation.navigate(toolToOpen, {district: district});
    };

    useEffect(()=>{
        navigation.addListener('focus', () => {
            getDistricts().then(res => {
                setSavedDistricts(res)
            });
        })
    }, [])

    return(
        <View style={styles.mainContainer}>
            <HomepageHeader onSettings={() => navigation.navigate("Settings")} />

            <View style={styles.toolsContainer}>
            {text.homepage.tools.map(tool => 
                <ToolCell tool={tool} key={tool.title} onPress={() => {
                    setToolToOpen(tool.pushingPage)
                    setDistrictSelectionModalEnable(true)
                }}/>
            )}
            </View>

            {districtSelectionModalEnable && <DistrictSelectorModal 
                hideModal={() => setDistrictSelectionModalEnable(false)}
                districts={savedDistricts}
                opentool={openTool}
                navigation={navigation}
            />}
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
        zIndex: 1,
    },
});


export default Homepage
