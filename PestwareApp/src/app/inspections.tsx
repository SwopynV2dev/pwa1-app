import {View,Text,StyleSheet,ScrollView,TouchableOpacity,} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Inspections() {
    const inspections = [
        {
        id: 1,
        code: 'I-64210-2',
        date: 'May 27',
        time: '02:08 pm',
        stationCode: 'M-64210',
        customer: 'Molinos San Miguel',
        details: [
            '38 Cebadero',
            '28 Estación de ofidios',
            '3 Jaula de Captura',
            '3 Satelite',
        ],
        },
        {
        id: 2,
        code: 'I-64210-1',
        date: 'May 20',
        time: '11:27 am',
        stationCode: 'M-64210',
        customer: 'Molinos San Miguel',
        details: [
            '38 Cebadero',
            '28 Estación de ofidios',
            '3 Jaula de Captura',
            '3 Satelite',
        ],
        },
    ];

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/stations')}
            
            >
            <MaterialIcons name="arrow-back" size={40} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Inspecciones</Text>
        </View>

        <ScrollView style={styles.list}>
            {inspections.map((inspection) => (
            <InspectionItem
                key={inspection.id}
                code={inspection.code}
                date={inspection.date}
                time={inspection.time}
                stationCode={inspection.stationCode}
                customer={inspection.customer}
                details={inspection.details}
            />
            ))}
        </ScrollView>
        </View>
    );
    }

    function InspectionItem({
    code,
    date,
    time,
    stationCode,
    customer,
    details,
    }: {
    code: string;
    date: string;
    time: string;
    stationCode: string;
    customer: string;
    details: string[];
    }) {
    return (
        <TouchableOpacity style={styles.card}>
        <View style={styles.leftSection}>
            <Text style={styles.leftCode}>{code}</Text>
            <Text style={styles.leftDate}>{date}</Text>
            <Text style={styles.leftTime}>{time}</Text>
            <Text style={styles.leftStation}>{stationCode}</Text>
        </View>

        <View style={styles.infoSection}>
            <Text style={styles.customer}>{customer}</Text>

            {details.map((item, index) => (
            <Text key={index} style={styles.detailText}>
                {item}
            </Text>
            ))}
        </View>
        </TouchableOpacity>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        height: 95,
        backgroundColor: '#2094C9',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 25,
        elevation: 4,
    },

    backArrow: {
        color: '#FFFFFF',
        fontSize: 44,
        marginRight: 15,
    },

    headerTitle: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '500',
    },

    list: {
        flex: 1,
        paddingTop: 16,
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginBottom: 14,
        minHeight: 112,
        borderRadius: 4,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 5,
        shadowOffset: {
        width: 0,
        height: 3,
        },
        borderRightWidth: 6,
        borderRightColor: '#3D5A96',
    },

    leftSection: {
        width: 105,
        backgroundColor: '#3D5A96',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },

    leftCode: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },

    leftDate: {
        color: '#FFFFFF',
        fontSize: 17,
        marginTop: 10,
    },

    leftTime: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 10,
    },

    leftStation: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
    },

    infoSection: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    customer: {
        fontSize: 20,
        color: '#222222',
        fontWeight: '500',
        marginBottom: 8,
    },

    detailText: {
        fontSize: 17,
        color: '#3D5A96',
        fontWeight: '500',
        lineHeight: 21,
    },
    backButton: {
    marginRight: 15,
    },
    });