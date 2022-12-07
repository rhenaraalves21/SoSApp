import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'

const Landing = () => {

    type IUser = {
        login: {
            user: {
                id: number
                name: string
                subject: string
                avatar: string
                whatsapp: string
                bio: string
                email: string
            }
        }
    }

    const navigation = useNavigation()

    const [connections, setConnections] = useState(0)

    useEffect(() => {
        api.get('/connections').then(resp => {
            setConnections(resp.data.total)
        }).catch(err => console.log(err))
    }, [])

    const route = useRoute<RouteProp<IUser, 'login'>>()

    const handleNavigateToGiveClassesPage = () => {
        navigation.navigate('OfferServiceClasses')
    }

    const handleNavigateStudyTabsPage = () => {
        navigation.navigate('ServiceTabs')
    }

    const logout = () => {
        AsyncStorage.setItem('token', '')
        navigation.navigate('Login')
    }

    let [fontsLoaded] = useFonts({
        Archivo_400Regular,
        Archivo_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold
    })

    if(!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileInfo}>
                    <Image style={styles.profileImage} source={{
                        uri: `http://localhost:3333/uploads/${route.params.user.avatar}`
                    }} />
                    <Text style={styles.profileName}>{route.params.user.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout} style={styles.logout}>
                    <Feather size={20} color="black" name='log-out' />
                </TouchableOpacity>
            </View>
            <Image style={styles.banner} source={require('../../../assets/images/main.png')} />

            <View style={styles.buttonsContainer}>
                <RectButton  onPress={handleNavigateStudyTabsPage} style={[styles.button, styles.buttonPrimary]}>
                    <Image style={styles.icon} source={require('../../../assets/images/icons/iconperson.png')} />
                    <Text style={styles.buttonText}>
                        Buscar serviços
                    </Text>
                </RectButton>

                <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image style={styles.icon} source={require('../../../assets/images/icons/icon_config.png')} />
                    <Text style={styles.buttonText}>
                        Oferecer serviços
                    </Text>
                </RectButton>
            </View>
        </View>
    )
}

export default Landing

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 40,
        paddingLeft: 40,
        paddingRight: 40
    },
    banner: {
        height: '50%',
        resizeMode: 'contain'
    },
    icon: {
        height: '50%',
        resizeMode: 'contain'
    },
    title: {
        fontSize: 20,
        color: '#fff',
        lineHeight: 30,
        marginTop: 80,
        fontFamily: 'Poppins_400Regular'
    },
    titleBold: {
        fontFamily: 'Poppins_600SemiBold'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between'
    },
    button: {
        height: 150,
        width: '48%',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between'
    },
    buttonPrimary: {
        backgroundColor: '#EE823C'
    },
    buttonSecondary: {
        backgroundColor: '#00B86B'
    },
    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: 'white',
        fontSize: 20
    },
    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 40
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileName: {
        color: "black",
        fontSize: 14,
        fontFamily: "Poppins_400Regular"
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        marginRight: 20
    },
    logout: {
        backgroundColor: "white",
        borderRadius: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})