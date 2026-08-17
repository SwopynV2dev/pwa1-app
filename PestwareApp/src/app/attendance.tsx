import { useState } from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Attendance() {
    const [type, setType] = useState('Entrada');
    const [showOptions, setShowOptions] = useState(false);

    const attendanceData = {
        title: 'Nueva Asistencia',
        placeholder: 'Ingresa el código de validación',
        buttonText: 'REGISTRAR MI ASISTENCIA',
    };

    const selectType = (value: string) => {
        setType(value);
        setShowOptions(false);
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.close} onPress={() => router.push('/menu')}>×</Text>
            <Text style={styles.headerTitle}>{attendanceData.title}</Text>
        </View>

        <View style={styles.content}>
            <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowOptions(!showOptions)}
            >
            <Text style={styles.dropdownText}>{type}</Text>
            <MaterialIcons
                name="keyboard-arrow-down"
                size={30}
                color="#1D98D1"
                style={styles.arrowIcon}
            />
            </TouchableOpacity>

            {showOptions && (
            <View style={styles.optionsBox}>
                <TouchableOpacity
                style={styles.option}
                onPress={() => selectType('Entrada')}
                >
                <Text style={styles.optionText}>Entrada</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.option}
                onPress={() => selectType('Salida')}
                >
                <Text style={styles.optionText}>Salida</Text>
                </TouchableOpacity>
            </View>
            )}

            <TextInput
            placeholder={attendanceData.placeholder}
            placeholderTextColor="#3D5A96"
            style={styles.input}
            />

            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{attendanceData.buttonText}</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        height: 105,
        backgroundColor: '#438FC2',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 28,
        paddingTop: 25,
    },

    close: {
        color: '#FFFFFF',
        fontSize: 55,
        fontWeight: '300',
        marginRight: 95,
    },

    headerTitle: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '500',
        letterSpacing: 2,
    },

    content: {
        paddingHorizontal: 18,
        paddingTop: 35,
    },

    dropdown: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    dropdownText: {
        fontSize: 26,
        color: '#222222',
    },

    dropdownArrow: {
        fontSize: 28,
        color: '#666666',
        marginRight: 35,
    },

    optionsBox: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        marginBottom: 15,
        elevation: 4,
    },

    option: {
        paddingVertical: 14,
        paddingHorizontal: 15,
    },

    optionText: {
        fontSize: 22,
        color: '#222222',
    },

    input: {
        height: 62,
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 5,
        paddingHorizontal: 22,
        fontSize: 22,
        color: '#3D5A96',
        marginTop: 28,
    },

    button: {
        height: 70,
        backgroundColor: '#438FC2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 65,
        elevation: 4,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 3,
    },
    arrowIcon: {
        marginLeft: 8,
    },
    });