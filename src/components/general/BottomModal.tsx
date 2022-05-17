import React, {useRef, useEffect} from 'react'
import {StyleSheet, View, Image, Dimensions, Animated, TouchableWithoutFeedback} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import icons from '../../../assets/icons/iconManager';

const { height, width } = Dimensions.get('window');


type BottomModalProps = { hideModal: () => void, children: React.ReactNode, hasChevron?: boolean};

export const BottomModal: React.FC<BottomModalProps> = ({children, hideModal, hasChevron=true}) => {
    const fadeAnim = useRef(new Animated.Value(-height)).current

    useEffect(() => {
        return Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }
        ).start();
      }, [fadeAnim])

    const handleCloseModal = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: -height,
                duration: 200,
                useNativeDriver: false
            }
          ).start(() => hideModal());
    }

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleCloseModal}>
                <View style={styles.backgroundBlur} />
            </TouchableWithoutFeedback>
            <Animated.View style={{...styles.modaleContainter, bottom: fadeAnim}}>
                <TouchableOpacity onPress={handleCloseModal} style={styles.chevronContainer}>
                    {hasChevron && 
                        <Image
                            style={styles.chevronDown}
                            source={icons["chevron"]}
                    />}
                </TouchableOpacity>

                <ScrollView>
                    {children}
                </ScrollView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 6,
        width: width,
        // weird:
        height: height*1.1, 
    },
    backgroundBlur: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        opacity: 0.4,
        position: "absolute",
        top: 0,
    },
    modaleContainter: {
        maxHeight: height-20,
        backgroundColor: "#FFFFFF",
        position: "absolute",
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 20,
        paddingBottom: 70,
    },
    chevronContainer: {
        width: '100%',
        height: 30,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chevronDown: {
        transform: [{rotate: '90deg'}],
        resizeMode: "center",
    },
});


export default BottomModal
