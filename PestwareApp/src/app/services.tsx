import {View,Text,StyleSheet,ScrollView,TouchableOpacity,} from 'react-native';
import { router } from 'expo-router';
import BottomMenu from './BottomMenu';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Services() {
    const [selectedDay, setSelectedDay] = useState('Hoy');

const services = [
    {
        id: 1,
        date: 'Jun 02',
        time: '04:00 am',
        title: 'Hotel Santorini Casa Blanca - Servicio MIPU',
        phone: '3176000359',
        address: 'Km 17 Via Cienaga, Piedra Hincada',
        type: 'MIPU',
        status: 'Finalizado',
        paymentStatus: 'Pagado',
        },
        {
        id: 2,
        date: 'Jun 02',
        time: '09:00 am',
        title: 'RM Chinook - Servicio de Desinsectación',
        phone: '301727048',
        address: 'Carrera 4 Calle 26, Prado',
        type: 'DES',
        status: 'Finalizado',
        paymentStatus: 'Pagado',
        },
    ];

    return (
    <View style={styles.container}>

        <View style={styles.header}>
            <Text style={styles.headerTitle}>Mis Servicios</Text>

            <TouchableOpacity
                style={styles.headerCenter}
                onPress={() => console.log('Abrir selector de día')}
            >
                <Text style={styles.today}>{selectedDay}</Text>
                <MaterialIcons
                    name="keyboard-arrow-down"
                    size={30}
                    color="#1D98D1"
                    style={styles.arrowIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.searchButton}
                onPress={() => router.push('/search-services')}
            >
                <MaterialIcons name="search" size={36} color="#1D98D1" />
            </TouchableOpacity>
        </View>

        <ScrollView>
            {services.map((service) => (
                <ServiceCard
                    key={service.id}
                    date={service.date}
                    time={service.time}
                    title={service.title}
                    phone={service.phone}
                    address={service.address}
                    type={service.type}
                    status={service.status}
                    paymentStatus={service.paymentStatus}
                />
            ))}
        </ScrollView>

        <BottomMenu active="services" />
    </View>
    );
    }

    function ServiceCard({
    date,
    time,
    title,
    phone,
    address,
    type,
    status,
    paymentStatus,
    }: {
    date: string;
    time: string;
    title: string;
    phone: string;
    address: string;
    type: string;
    status: string;
    paymentStatus: string;
    }) {
    return (
        <TouchableOpacity 
        style={styles.card}
        onPress={() => router.push('/service-detail')}>
        <View style={styles.dateSection}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.time}>{time}</Text>
        </View>

        <View style={styles.infoSection}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.phone}>{phone}</Text>
            <Text style={styles.address}>{address}</Text>
        </View>

        <View style={styles.statusSection}>
            <Text style={styles.type}>{type}</Text>

            <Text style={styles.finished}>
            {status}
            </Text>

            <Text style={styles.paid}>
            {paymentStatus}
            </Text>

            <Text style={styles.arrowDown}>⌄</Text>
        </View>
        </TouchableOpacity>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1',
    },

    header: {
        height: 70,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        paddingHorizontal: 24,
    },

    headerTitle: {
        fontSize: 22,
        color: '#222',
    },

    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    today: {
        color: '#1D98D1',
        fontSize: 28,
        fontWeight: 'bold',
    },

    arrow: {
        color: '#1D98D1',
        marginLeft: 10,
    },

    search: {
        fontSize: 32,
        color: '#1D98D1',
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginHorizontal: 8,
        marginTop: 10,
        elevation: 3,
        minHeight: 120,
    },

    dateSection: {
        width: 95,
        backgroundColor: '#0F6E31',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    date: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    time: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },

    infoSection: {
        flex: 1,
        padding: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    phone: {
        fontSize: 16,
        marginTop: 5,
    },

    address: {
        fontSize: 14,
        marginTop: 3,
        color: '#444',
    },

    statusSection: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },

    type: {
        fontWeight: 'bold',
        fontSize: 20,
    },

    finished: {
        color: '#0F8C35',
        fontSize: 18,
        fontWeight: 'bold',
    },

    paid: {
        color: '#D6402F',
        fontSize: 18,
        fontWeight: 'bold',
    },

    arrowDown: {
        color: '#1D98D1',
        fontSize: 26,
    },

    bottomMenu: {
        height: 70,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#DDD',
    },

    menuIcon: {
        fontSize: 16,
    },
    arrowIcon: {
        marginLeft: 8,
    },
    searchButton: {
        padding: 4,
    },
    });