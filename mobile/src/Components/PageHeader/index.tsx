import React, { ReactNode } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'


interface PageHeaderProps {
    title?: string
    headerRight?: ReactNode
    label: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children, headerRight, label }) => {

    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.navigate('Landing')
    }

    return (
        <>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather color='white' name='arrow-left' size={25} />
                </TouchableOpacity>
                <Text style={styles.topBarText}>{label}</Text>
            </View>
            <View style={styles.container}>

                {title && (
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        {headerRight}
                    </View>
                )}
                {children}
            </View>
         </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 40,
        paddingTop: 0,
        backgroundColor: '#00B86B'
    },
    icon: {
        height: '50%',
        resizeMode: 'contain'
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#00B86B",
        padding: 40,
        paddingBottom: 20,
    },
    title: {
        fontFamily: 'Archivo_700Bold',
        color: 'white',
        fontSize: 24,
        lineHeight: 32,
        maxWidth: 200,
        marginVertical: 40
    },
    header: {
        justifyContent: 'space-between'
    },
    topBarText: {
        color: "white",
        fontSize: 14,
        fontFamily: "Archivo_400Regular"
    }
})

export default PageHeader