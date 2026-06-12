import {View,Text,StyleSheet,TouchableOpacity,} from 'react-native';
import BottomMenu from './BottomMenu';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Areas() {
const areaData = {
    code: 'M-2031',
    client: '',
    date: '2026-06-03',
};

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.close} onPress={() => router.push('/areas')}>x</Text>
            <Text style={styles.code}>{areaData.code}</Text>
        </View>

        <View style={styles.content}>
            <TouchableOpacity style={styles.clientButton}>
            <Text style={styles.clientIcon}></Text>
            <Text style={styles.clientButtonText}>Seleccionar Cliente</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.qrContainer}
                onPress={() => router.push('/qr-scanner')}
                >
                <MaterialIcons
                    name="qr-code-scanner"
                    size={80}
                    color="#438FC2"
                />
            </TouchableOpacity>

            <Text style={styles.label}>Cliente:</Text>

            <View style={styles.dateRow}>
                <Text style={styles.dateLabel}>Fecha:</Text>
                <Text style={styles.date}>{areaData.date}</Text>
            </View>

            <TouchableOpacity style={styles.manualButton}>
            <Text style={styles.manualIcon}></Text>
            <Text style={styles.manualText}>ESCANEO MANUAL</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.bottomButtons}>
            <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/areas')}>
            <Text style={styles.backButtonText}>REGRESAR</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.finishButton}
            onPress={() => router.push('/inspections')}>
            <Text style={styles.finishButtonText}>FINALIZAR INSPECCIÓN</Text>
            </TouchableOpacity>
        </View>
        <BottomMenu active="areas" />
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
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 25,
    },

    close: {
        color: '#FFFFFF',
        fontSize: 55,
        fontWeight: '300',
    },

    code: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '500',
    },

    content: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 18,
    },

    clientButton: {
        backgroundColor: '#70B8A7',
        width: 310,
        maxWidth: '100%',
        height: 40,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        elevation: 3,
    },

    clientIcon: {
        color: '#FFFFFF',
        fontSize: 20,
        marginRight: 18,
    },

    clientButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        letterSpacing: 4,
    },

    qrContainer: {
        position: 'absolute',
        right: 15,
        top: 20,
    },

    qrIcon: {
        color: '#438FC2',
        fontSize: 50,
    },

    label: {
        fontSize: 25,
        color: '#222222',
        marginTop: 30,
    },

    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },

    date: {
        fontSize: 18,
        color: '#438FC2',
        marginLeft: 10,
    },

    manualButton: {
        alignSelf: 'flex-end',
        marginTop: -8,
        width: 420,
        maxWidth: '55%',
        height: 40,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },

    manualIcon: {
        color: '#438FC2',
        fontSize: 35,
        marginRight: 12,
    },

    manualText: {
        color: '#438FC2',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 3,
    },

    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        paddingBottom: 40,
        backgroundColor: '#FFFFFF',
    },

    backButton: {
        width: 230,
        maxWidth: '35%',
        height: 50,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    backButtonText: {
        color: '#438FC2',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 3,
    },

    finishButton: {
        width: 450,
        maxWidth: '60%',
        height: 70,
        borderRadius: 5,
        backgroundColor: '#438FC2',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },

    finishButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 3,
    },
    dateLabel: {
    fontSize: 25,
    color: '#222222',
    },
    });