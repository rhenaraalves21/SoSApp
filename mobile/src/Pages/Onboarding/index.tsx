import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Image, AsyncStorage } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

interface Onboarding {
    boardType: 'service' | 'offer-service'
    number: string
    description: string
}

const Onboarding: React.FC<Onboarding> = ({ boardType, number, description }) => {

    const navigation = useNavigation()

    const handleNavigate = async () => {
        if(boardType === 'service') {
            navigation.navigate('OfferServiceBoard')
        } else {
            await AsyncStorage.setItem('firstTime', 'false')
            navigation.navigate('Login')
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, {
                backgroundColor: boardType === 'service' ? '#EE823C' : '#00B86B'
            }]}>
                {boardType === 'service' ? (
                    <ImageBackground resizeMode='contain' source={require('../../../assets/images/background.png')} style={styles.background}>
                       <Image style={styles.icon} source={require('../../../assets/images/icons/iconperson.png')} />
                     </ImageBackground>
                ) : (
                    <ImageBackground resizeMode='contain' source={require('../../../assets/images/background.png')} style={styles.background}>
                      <Image style={styles.icon} source={require('../../../assets/images/icons/icon_config.png')} />
                    </ImageBackground>
                )}
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionTitle}>{number}</Text>
                <Text style={styles.descriptionSubTitle}>{description}</Text>
                <View style={styles.bottom}>
                    <View style={styles.balls}>
                        <View style={boardType === 'service' ? styles.ballActivated : styles.ball}></View>
                        <View style={boardType === 'service' ? styles.ball : styles.ballActivated}></View>
                    </View>
                    <TouchableOpacity onPress={handleNavigate}>
                        <Image source={require('../../../assets/images/icons/arrowRight.png')} style={styles.arrowRight}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 2,
        padding: 50
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 130,
        height: 120
    },
    description: {
        flex: 3,
        padding: 50
    },
    descriptionTitle: {
        color: '#bbb',
        fontSize: 40,
        fontFamily: 'Poppins_400Regular'
    },
    descriptionSubTitle: {
        fontSize: 26,
        fontFamily: 'Poppins_400Regular',
        width: 206,
        color: '#6A6180'
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    arrowRight: {
        width: 74,
        height: 40
    },
    balls: {
        flexDirection: 'row'
    },
    ball: {
        width: 4,
        height: 4,
        backgroundColor: '#C1BCCC',
        borderRadius: 2,
        marginLeft: 3
    },
    ballActivated: {
        width: 4,
        height: 4,
        backgroundColor: '#8257e5',
        borderRadius: 2,
        marginLeft: 3
    } 
})

export default Onboarding