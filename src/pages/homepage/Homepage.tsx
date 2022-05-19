import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import text from '../../../assets/text/text-fr.json'
import BottomModal from '../../components/general/BottomModal';
import CenteredModal from '../../components/general/CenteredModal';
import CGUModalContent from '../../components/homepage/CGUModalContent';
import DistrictSelectorModal from '../../components/homepage/DistrictSelectorModal';
import HomepageHeader from '../../components/homepage/HomepageHeader';
import ToolCell from '../../components/homepage/ToolCell';
import UpdateModalContent from '../../components/homepage/UpdateModalContent';
import { getAcceptedCGU, getDistricts } from '../../services/LocalStorage';

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
    const [districtSelectionModalEnabled, setDistrictSelectionModalEnabled] = useState<boolean>(false);
    const [toolToOpen, setToolToOpen] = useState<string>();
    const [savedDistricts, setSavedDistricts] = useState<districts>();
    const [isUpdateModalOpened, setIsUpdateModalOpened] = useState<boolean>(false);
    const [isCGUModalOpened, setIsCGUModalOpened] = useState<boolean>(false);

    const openTool = (district: district) => {
        setDistrictSelectionModalEnabled(false)
        navigation.navigate(toolToOpen, {district: district});
    };

    useEffect(()=>{
        navigation.addListener('focus', () => {
            getDistricts().then(res => {
                setSavedDistricts(res)
            });
        })
        getAcceptedCGU().then(res => setIsCGUModalOpened(!res))
    }, [])

    return(
        <View style={styles.mainContainer}>
            {/* TODO: open it if an update is available */}
            {isUpdateModalOpened &&
                <CenteredModal hideModal={() => setIsUpdateModalOpened(false)}>
                    <UpdateModalContent onCloseModal={() => setIsUpdateModalOpened(false)}/>
                </CenteredModal>}

            {isCGUModalOpened &&
                <CenteredModal hideModal={() => {}}>
                    <CGUModalContent onCloseModal={() => setIsCGUModalOpened(false)}/>
                </CenteredModal>}

            <HomepageHeader onSettings={() => navigation.navigate("Settings")} />

            <View style={styles.toolsContainer}>
            {text.homepage.tools.map(tool => 
                <ToolCell tool={tool} key={tool.title} onPress={() => {
                    setToolToOpen(tool.pushingPage)
                    setDistrictSelectionModalEnabled(true)
                }}/>
            )}
            </View>

            {districtSelectionModalEnabled && <BottomModal 
                hideModal={() => setDistrictSelectionModalEnabled(false)}>
                <DistrictSelectorModal 
                    districts={savedDistricts}
                    opentool={openTool}
                    navigation={navigation}/>
            </BottomModal>}

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
