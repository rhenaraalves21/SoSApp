import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'
import UserContext from '../../Contexts/UserContext'

interface Service {
    service: TeacherProps
    favorited: boolean
}

interface TeacherProps {
    id: number
    avatar: string
    bio: string
    cost: number
    name: string
    subject: string
    whatsapp: string
}

const ServiceItem: React.FC<Service> = ({ service, favorited }) => {

    const User = useContext(UserContext)

    const [isFavorited, setIsFavorited] = useState(favorited)

    const handleWhatsapp = () => {
        Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
            if (supported) {
              return Linking.openURL(
                `whatsapp.com/send?phone=${service.whatsapp}`
              );
            } else {
              return Linking.openURL(
                `https://api.whatsapp.com/send?phone=${service.whatsapp}`
              );
            }
          })
    }

    const handleToggleFavorite = async () => {
        if(isFavorited) {
            await api.delete(`/favorites/${User.user?.id}/${service.id}`)
            setIsFavorited(false)
        } else {
            await api.post('/favorites', {
                user_id: User.user?.id,
                favorite_id: service.id
            })
    
            setIsFavorited(true)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={require('../../../assets/images/icons/iconperson.png')}
                style={styles.avatar} />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{service.name}</Text>
                    <Text style={styles.subject}>{service.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{service.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ {service.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton onPress={handleToggleFavorite}
                    style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}>
                        {isFavorited ? 
                        <Image style={styles.icon} source={require('../../../assets/images/icons/heart-outline.png')} /> :
                        <Image style={styles.icon} source={require('../../../assets/images/icons/unfavorite.png')} />}
                    </RectButton>

                    <RectButton onPress={handleWhatsapp} style={styles.contactButton}>
                        <Image style={styles.icon} source={require('../../../assets/images/icons/whatsapp.png')} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e6e6f0',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden'
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#eee'
    },
    profileInfo: {
        marginLeft: 16
    },
    name: {
        fontFamily: 'Archivo_700Bold',
        color: '#32264d',
        fontSize: 20
    },
    subject: {
        fontFamily: 'Poppins_400Regular',
        color: '#6a6180',
        fontSize: 12,
        marginTop: 4
    },
    bio: {
        marginHorizontal: 24,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        lineHeight: 24,
        color: '#6a6180'
    },
    footer: {
        backgroundColor: '#fafafc',
        padding: 24,
        alignItems: 'center',
        marginTop: 24
    },
    price: {
        fontFamily: 'Poppins_400Regular',
        color: '#6a6180',
        fontSize: 14
    },
    priceValue: {
        fontFamily: 'Archivo_700Bold',
        color: '#8257e5',
        fontSize: 16
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    favoriteButton: {
        backgroundColor: '#8257e5',
        width: 56,
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    contactButton: {
        backgroundColor: '#04d363',
        flex: 1,
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    contactButtonText: {
        color: '#fff',
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
        marginLeft: 10
    },
    favorited: {
        backgroundColor: '#e33d3d'
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    }
})

export default ServiceItem