import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Picker } from 'react-native'
import PageHeader from '../../Components/PageHeader'
import TeacherItem from '../../Components/TeacherItem'
import { ScrollView, TextInput, BorderlessButton, RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

interface Teacher {
    id: number
    avatar: string
    bio: string
    cost: number
    name: string
    subject: string
    whatsapp: string
}

const TeacherList = () => {

    const date = new Date()

    const navigation = useNavigation()

    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [subject, setSubject] = useState('Física')
    const [weekDay, setWeekDay] = useState('0')
    const [time, setTime] = useState('12:00')
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [showPicker, setShowPicker] = useState(false)
    const [schedules, setSchedules] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])

    useEffect(() => {
        const listener = navigation.addListener('focus', () => {
            setTeachers([])
        })
    })


    const handleToggleFiltersVisible = () => {
        setIsFiltersVisible(!isFiltersVisible)
    }

    const handleFilterSubmit = async () => {
        const resp = await api.get('/classes', {
            params: {
                subject,
                time,
                week_day: weekDay
            }
        })
        setIsFiltersVisible(false)
        setTeachers(resp.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader label='Serviços'
            headerRight={(
                <>
                    <View style={styles.options}>
                        <TouchableOpacity onPress={handleToggleFiltersVisible}>
                            <Feather color='white' name='filter' size={20} />
                        </TouchableOpacity>
                        <Text style={styles.filterDescription}>Filtrar por serviço</Text>
                    </View>
                </>
            )}
            title="Serviços disponíveis">
                {isFiltersVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>Serviço</Text>
                    
                    <View style={styles.pickerContainer}>
                        <Picker onValueChange={val => setSubject(val)} selectedValue={subject}
                        style={styles.picker}>
                            <Picker.Item value='Pedreiro' label='Pedreiro' />
                            <Picker.Item value='Eletricista' label='Eletricista' />
                            <Picker.Item value='Encanador' label='Encanador' />
                            <Picker.Item value='Pintor' label='Pintor' />
                        </Picker>
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={weekDay} onValueChange={val => setWeekDay(val)}
                                style={styles.picker}>
                                    <Picker.Item color="#c1bccc" value='0' label='Segunda-feira' />
                                    <Picker.Item color="#c1bccc" value='1' label='Terça-feira' />
                                    <Picker.Item color="#c1bccc" value='2' label='Quarta-feira' />
                                    <Picker.Item color="#c1bccc" value='3' label='Quinta-feira' />
                                    <Picker.Item color="#c1bccc" value='4' label='Sexta-feira' />
                                    <Picker.Item color="#c1bccc" value='5' label='Sábado' />
                                    <Picker.Item color="#c1bccc" value='6' label='Domingo' />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
                                <Text style={styles.inputText}>{time}</Text>
                            </TouchableOpacity>
                        </View>
                        {showPicker && (
                            <DateTimePicker mode="time" is24Hour={true} value={new Date()} onChange={(event, date) => {
                                setShowPicker(false)
                                if(date) {
                                    const stringDate = String(date)
                                    const newDate = stringDate.split(' ')
                                    const time = newDate[4].split(':')
                                    setTime(`${time[0]}:${time[1]}`)
                                }

                            }} ></DateTimePicker>
                        )}
                    </View>
                    <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>)}
            </PageHeader>
            <ScrollView contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }} style={styles.teacherList} >
                {teachers.map(teacher => {
                    return (
                        (
                            <TeacherItem favorited={favorites.includes(teacher.id)}
                            teacher={teacher} key={teacher.id} />
                        )
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7'
    },
    icon: {
        height: '50%',
        resizeMode: 'contain'
    },
    teacherList: {
        marginTop: -40
    },
    searchForm: {
        marginBottom: 24
    },
    label: {
        color: 'white',
        fontFamily: 'Poppins_400Regular'
    },
    input: {
        height: 54,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 4,
        borderRadius: 8,
        marginBottom: 16
    },
    inputGroup: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    inputBlock: {
        width: "48%"
    },
    submitButton: {
        backgroundColor: '#04d363',
        height: 56,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    submitButtonText: {
        color: "#fff",
        fontFamily: "Archivo_700Bold",
        fontSize: 16
    },
    options: {
        marginBottom: 30,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'white',
        paddingBottom: 20
    },
    filterDescription: {
        color: "white",
        fontFamily: "Archivo_400Regular",
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20
    },
    filterIcon: {
        position: 'relative',
        top: 5
    },
    proffys: {
        position: 'absolute',
        right: 1,
        bottom: 100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    proffysDescription: {
        marginLeft: 12,
        color: "#D4C2FF",
        fontFamily: 'Poppins_400Regular'
    },
    picker: {
        height: 54,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 16
    },
    pickerContainer: {
        overflow: 'hidden',
        borderRadius: 8,
        marginBottom: 8,
        marginTop: 4
    },
    inputText: {
        color: "#C1BCCC"
    }
})

export default TeacherList