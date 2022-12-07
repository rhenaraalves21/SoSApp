import React, { useEffect, useState, createContext } from 'react'
import { AppLoading } from 'expo'
import { YellowBox, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Landing from '../Pages/Landing'
import OfferServiceClasses   from '../Pages/OfferServiceClasses'
import ServiceTabs from './ServiceTabs'
import Login from '../Pages/Login'
import Onboarding from '../Pages/Onboarding'
import AsyncStorage from '@react-native-community/async-storage'
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import Register from '../Pages/Register'
import Register2 from '../Pages/Register2'
import Success from '../Pages/Success'
import Profile from '../Pages/Profile'

YellowBox.ignoreWarnings(['Looks like'])
const { Navigator, Screen } = createStackNavigator()


const AppStack = () => {

    useEffect(() => {
        AsyncStorage.getItem('firstTime').then(resp => {
            if(resp) {
                setFirstTime(resp)
            }
        }).catch(err => {})
    
    }, [])

    const [firstTime, setFirstTime] = useState('true')

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
        <NavigationContainer>
            <Navigator initialRouteName={firstTime === 'true' ? 'ServiceBoard' : 'Login'} headerMode='none'>
                <Screen name='ServiceBoard' component={() => <Onboarding number='01.' boardType='service'
                description='Encontre vários profissionais para ajudar você.' />} />
                
                <Screen name='OfferServiceBoard' component={() => <Onboarding number='02.' boardType='offer-service'
                description='Ou ofereça seus serviços online.' />} />
                
                <Screen name='Landing' component={Landing} />
                <Screen name='Profile' component={Profile} />
                <Screen name='OfferServiceClasses' component={OfferServiceClasses} />
                <Screen name='ServiceTabs' component={ServiceTabs} />
                <Screen name='Login' component={Login} />
                <Screen name='Register' component={Register} />
                <Screen name='Register2' component={Register2} />
                <Screen name='RegisterSuccess' component={() => <Success title='Cadastro concluído!'
                navigateTo='Login' button='Fazer login' description='Agora você faz parte da
                plataforma da SoS App'/>} />
                
                <Screen name='ForgotPasswordSuccess' component={() => <Success title='Redefinição Enviada!'
                navigateTo='Login' button='Fazer login' description='Boa, agora é só checar o e-mail que foi
                enviado para você redefinir sua senha
                e aproveitar.'/>} />
                
                <Screen name='RegisterClassSuccess' component={() => <Success title='Cadastro salvo!'
                navigateTo='Landing' button='Voltar para o perfil' description='Tudo certo, seu cadastro está
                na nossa lista de profissionais. Agora é
                só ficar de olho no seu WhatsApp.'/>} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack