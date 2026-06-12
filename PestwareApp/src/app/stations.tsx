import {View,Text,StyleSheet,ScrollView,TouchableOpacity,} from 'react-native';
import { router } from 'expo-router';
import BottomMenu from './BottomMenu';

export default function Estaciones() {
    const inspections = [
        {
        id: 1,
        code: 'CL-64210',
        date: 'May 27',
        time: '02:08 pm',
        inspectionCode: 'I-64210-2',
        customer: 'Molinos San Miguel',
        phone: '3011565483',
        address: 'Molinos San Miguel 00, Zona franca Tayrona. Magdalena',
        inspectionsCount: '2 Inspecciones',
        },
    ];

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Control de Inspecciones</Text>
        </View>

        <ScrollView style={styles.list}>
            {inspections.map((inspection) => (
            <InspectionCard
                key={inspection.id}
                code={inspection.code}
                date={inspection.date}
                time={inspection.time}
                inspectionCode={inspection.inspectionCode}
                customer={inspection.customer}
                phone={inspection.phone}
                address={inspection.address}
                inspectionsCount={inspection.inspectionsCount}
            />
            ))}
        </ScrollView>

        <BottomMenu active="stations" />
        </View>
    );
    }

    function InspectionCard({
    code,
    date,
    time,
    inspectionCode,
    customer,
    phone,
    address,
    inspectionsCount,
    }: {
    code: string;
    date: string;
    time: string;
    inspectionCode: string;
    customer: string;
    phone: string;
    address: string;
    inspectionsCount: string;
    }) {
    return (
        <TouchableOpacity 
        style={styles.card}
        onPress={() => router.push('/inspections')}>
        <View style={styles.leftSection}>
            <Text style={styles.leftCode}>{code}</Text>
            <Text style={styles.leftDate}>{date}</Text>
            <Text style={styles.leftTime}>{time}</Text>
            <Text style={styles.leftInspection}>{inspectionCode}</Text>
        </View>

        <View style={styles.infoSection}>
            <Text style={styles.customer}>{customer}</Text>
            <Text style={styles.phone}>{phone}</Text>
            <Text style={styles.address}>{address}</Text>
            <Text style={styles.count}>{inspectionsCount}</Text>
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
        height: 80,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5,
    },

    headerTitle: {
        fontSize: 20,
        color: '#222222',
        marginTop: 25,
    },

    list: {
        flex: 1,
        paddingTop: 16,
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 18,
        minHeight: 95,
        borderRadius: 5,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 5,
        shadowOffset: {
        width: 0,
        height: 3,
        },
        borderRightWidth: 5,
        borderRightColor: '#438FC2',
    },

    leftSection: {
        width: 95,
        backgroundColor: '#438FC2',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },

    leftCode: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    leftDate: {
        color: '#FFFFFF',
        fontSize: 13,
        marginTop: 10,
    },

    leftTime: {
        color: '#FFFFFF',
        fontSize: 13,
        marginTop: 8,
    },

    leftInspection: {
        color: '#FFFFFF',
        fontSize: 12,
        marginTop: 8,
    },

    infoSection: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },

    customer: {
        fontSize: 18,
        color: '#222222',
        fontWeight: '600',
    },

    phone: {
        fontSize: 14,
        color: '#438FC2',
        marginTop: 5,
    },

    address: {
        fontSize: 13,
        color: '#444444',
        marginTop: 5,
    },

    count: {
        fontSize: 14,
        color: '#3D5A96',
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: 5,
    },

    bottomMenu: {
        height: 82,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },

    menuIcon: {
        fontSize: 34,
        color: '#666666',
    },

    activeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 35,
    },

    activeIcon: {
        fontSize: 34,
        color: '#222222',
        marginRight: 10,
    },

    activeText: {
        fontSize: 20,
        color: '#222222',
    },
    
    });