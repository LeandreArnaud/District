import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native'
import icons from '../../assets/icons/iconManager';

type toolType = {
    title: string,
    description: string,
    icon: string,
    pushingPage: string,
};
type HomePageProps = { tool: toolType, onPress: () => void };

export const ToolCell: React.FC<HomePageProps> = ({ tool, onPress }) => {
    return(
        <TouchableOpacity style={styles.toolCardBody} onPress={onPress} key={tool.title}>
            <Image
                style={styles.toolIcon}
                // @ts-ignore
                source={icons[tool.icon]}
            />
            <View style={styles.toolCardBodyRight}>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                <Text style={styles.toolSubtitle}>{tool.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    toolCardBody: {
        backgroundColor: "#FFFFFF",
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 15,
        width: '95%',
        borderRadius: 6,
        overflow: "hidden",
        elevation: 4,
        shadowColor: "#000000",
    },
    toolIcon: {
        width: '20%',
        height: 40,
        resizeMode: 'center',
    },
    toolCardBodyRight: {
        width: '80%',
        paddingRight: 10,
    },
    toolTitle: {
        fontSize: 20,
        fontWeight: "700",
        paddingBottom: 3,
    },
    toolSubtitle: {
        fontSize: 13,
    },
});


export default ToolCell
