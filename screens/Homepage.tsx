import React, { useEffect, useState } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'
import text from '../assets/text/text-fr.json'
import DistrictSelectorModal from '../components/homepage/DistrictSelectorModal';
import HomepageHeader from '../components/homepage/HomepageHeader';
import ToolCell from '../components/homepage/ToolCell';
import { getDistricts } from '../utile/LocalStorage';

type districts = {
    shortname: string,
    cities: {
        name: string,
        CP: string,
    }[]
}[]

type HomePageProps = { navigation: any };

export const Homepage: React.FC<HomePageProps> = ({ navigation }) => {
    const [districtSelectionModalEnable, setDistrictSelectionModalEnable] = useState(false);
    const [toolToOpen, setToolToOpen] = useState<string>();
    const [savedDistricts, setSavedDistricts] = useState<districts>();

    const openTool = () => navigation.navigate(toolToOpen);

    useEffect(()=>{
        getDistricts().then(res => setSavedDistricts(res));
    }, [])

    return(
        <View style={styles.mainContainer}>
            <HomepageHeader />

            <View style={styles.toolsContainer}>
            {text.homepage.tools.map(tool => 
                <ToolCell tool={tool} onPress={() => {
                    setToolToOpen(tool.pushingPage)
                    setDistrictSelectionModalEnable(true)
                }}/>
            )}
            </View>

            {districtSelectionModalEnable && <DistrictSelectorModal 
                hideModal={() => setDistrictSelectionModalEnable(false)}
                districts={savedDistricts}
                opentool={openTool}
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
