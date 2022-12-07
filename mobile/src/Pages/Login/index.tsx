import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Alert } from 'react-native'
import { TextInput, TouchableOpacity, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import UserContext from '../../Contexts/UserContext'

const Login = () => {

    const navigation = useNavigation()

    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [checkbox, setCheckbox] = useState(false)
    const [eye, setEye] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const User = useContext(UserContext)

    useEffect(() => {
        if(User.user) {
            navigation.navigate('Landing', {
                user: User.user
            })
        }
    }, [])


    const handleLogin = async () => {
        try {
            const resp = await api.post('/profiles', {
                email, password
            })

            if(checkbox) {
                AsyncStorage.setItem('token', resp.data.token)
            }

            User.setToken(resp.data.token)
            User.setUser(resp.data.user)

            navigation.navigate('Landing', {
                user: resp.data.user
            })
        } catch (err) {
            Alert.alert('Erro', 'Usuário ou senha incorretos')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>SoS App.</Text>  
                <Text style={styles.subTitle}>Swift on Service Application.</Text>   
            </View>

            <View style={styles.formContainer}>
                <View style={styles.topBar}>
                    <Text style={styles.formTitle}>Bem vindo!</Text>
                </View>
                <View style={styles.inputs}>
                    <View>
                        <TextInput onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)} value={email} onChangeText={t => setEmail(t)}
                        placeholder='E-mail' style={[styles.input, styles.topInput]} />
                        <View style={[styles.emailBar, { opacity: emailFocus ? 1 : 0 }]} />
                    </View>
                    <View>
                        <TextInput onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)} value={password}
                        secureTextEntry={eye} placeholder='Senha' onChangeText={t => setPassword(t)}
                        style={[styles.input, styles.bottomInput]} />
                        {eye ? <Feather onPress={() => setEye(!eye)}
                        size={20} name='eye-off' style={styles.eye} />
                        : <Feather onPress={() => setEye(!eye)}
                        size={20} name='eye' style={styles.eye} />}
                        <View style={[styles.emailBar, { opacity: passwordFocus ? 1 : 0 }]} />
                    </View>
                </View>
                <View style={styles.options}>
                    <Text style={styles.createAccount}>Não possui conta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.createAccountLink}>Cadastre-se!</Text>
                    </TouchableOpacity>

                </View>
                <RectButton onPress={handleLogin} style={styles.button}>
                    <Text style={styles.textButton}>Entrar</Text>
                </RectButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F7'
    },
    header: {
        padding: 50,
        backgroundColor: '#EE823C',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontFamily: 'Poppins_600SemiBold',
        width: 170
    },
    subTitle: {
        color: 'white',
        fontSize: 12,
        width: 170
    },
    formContainer: {
        flex: 4,
        padding: 30
    },
    topBar: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    formTitle: {
        fontSize: 24,
        color: '#32264D',
        fontFamily: 'Archivo_700Bold'
    },
    createAccount: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
    },
    createAccountLink: {
        fontSize: 16,
        fontFamily: 'Poppins_800Regular',
    },
    inputs: {
        marginTop: 20
    },
    input: {
        width: '100%',
        height: 64,
        backgroundColor: 'white',
        fontSize: 20,
        color: "#9C98A6",
        fontFamily: 'Poppins_400Regular',
        paddingLeft: 20
    },
    topInput: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderColor: '#E6E6F0',
        borderWidth: 1
    },
    bottomInput: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: '#E6E6F0',
        borderTopWidth: 0,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1
    },
    emailBar: {
        width: 2,
        height: 40,
        backgroundColor: '#8257E5',
        position: 'absolute',
        top: 12
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxTrue: {
        backgroundColor: '#04D361'
    },
    checkboxFalse: {
        borderColor: '#e6e6f0',
        borderWidth: 1,
        backgroundColor: "#fff"
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textDescription: {
        marginLeft: 5,
        color: '#9C98A6',
        fontFamily: "Poppins_400Regular"
    },
    button: {
        marginTop: 20,
        width: '100%',
        height: 56,
        backgroundColor: "#00B86B",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    textButton: {
        color: 'white',
        fontFamily: "Archivo_400Regular"
    },
    eye: {
        position: 'absolute',
        right: 20,
        top: 20
    }
})

export default Login