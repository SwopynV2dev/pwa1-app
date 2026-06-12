import { useState } from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Agenda() {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1));
    const [selectedDay, setSelectedDay] = useState(4);

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];

    const services = [
        {
        id: 1,
        date: 'Jun 02',
        time: '04:00 am',
        title: 'Hotel Santorini Casa Blanca - Servicio MIPU',
        phone: '3176000359',
        address: 'Km 17 Via Cienaga, Piedra Hincada',
        agent: 'Luis Bello',
        type: 'MIPU',
        price: '$28061.95',
        status: 'Finalizado',
        paymentStatus: 'Pagado',
        },
    ];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const calendarDays = [
        ...Array(firstDayOfMonth).fill(null),
        ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
    ];

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
        setSelectedDay(1);
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
        setSelectedDay(1);
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/menu')}
                >
                <MaterialIcons name="arrow-back" size={40} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Mi Agenda</Text>
        </View>

        <ScrollView>
            <View style={styles.calendar}>
            <View style={styles.monthRow}>
                <TouchableOpacity onPress={previousMonth}>
                <Text style={styles.monthArrow}>‹</Text>
                </TouchableOpacity>

                <Text style={styles.monthTitle}>
                {monthNames[month]} de {year}
                </Text>

                <TouchableOpacity onPress={nextMonth}>
                <Text style={styles.monthArrow}>›</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.weekRow}>
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
                <Text key={index} style={styles.weekDay}>{day}</Text>
                ))}
            </View>

            <View style={styles.daysGrid}>
                {calendarDays.map((day, index) => (
                <View key={index} style={styles.dayBox}>
                    {day !== null && (
                    <TouchableOpacity
                        style={[
                        styles.dayCircle,
                        day === selectedDay && styles.selectedDay,
                        ]}
                        onPress={() => setSelectedDay(day)}
                    >
                        <Text
                        style={[
                            styles.dayText,
                            day === selectedDay && styles.selectedDayText,
                        ]}
                        >
                        {day}
                        </Text>
                    </TouchableOpacity>
                    )}
                </View>
                ))}
            </View>
            </View>

            <View style={styles.servicesList}>
            {services.map((service) => (
                <AgendaCard key={service.id} {...service} />
            ))}
            </View>
        </ScrollView>
        </View>
    );
    }

    function AgendaCard({
    date,
    time,
    title,
    phone,
    address,
    agent,
    type,
    price,
    status,
    paymentStatus,
    }: {
    date: string;
    time: string;
    title: string;
    phone: string;
    address: string;
    agent: string;
    type: string;
    price: string;
    status: string;
    paymentStatus: string;
    }) {
    return (
        <TouchableOpacity style={styles.card}>
        <View style={styles.leftSection}>
            <Text style={styles.cardDate}>{date}</Text>
            <Text style={styles.cardTime}>{time}</Text>
        </View>

        <View style={styles.infoSection}>
            <Text style={styles.serviceTitle}>{title}</Text>
            <Text style={styles.phone}>{phone}</Text>
            <Text style={styles.address}>{address}</Text>
            <Text style={styles.agent}>{agent}</Text>
        </View>

        <View style={styles.rightSection}>
            <Text style={styles.type}>{type}</Text>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.finished}>{status}</Text>
            <Text style={styles.paid}>{paymentStatus}</Text>
        </View>
        </TouchableOpacity>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },

    header: {
        height: 95,
        backgroundColor: '#2094C9',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 25,
    },

    backArrow: {
        color: '#FFFFFF',
        fontSize: 42,
        marginRight: 150,
    },

    headerTitle: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '500',
    },

    calendar: {
        paddingHorizontal: 35,
        paddingTop: 30,
    },

    monthRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    monthArrow: {
        fontSize: 42,
        color: '#222222',
    },

    monthTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222222',
    },

    weekRow: {
        flexDirection: 'row',
        marginTop: 35,
    },

    weekDay: {
        width: `${100 / 7}%`,
        textAlign: 'center',
        fontSize: 18,
        color: '#666666',
    },

    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },

    dayBox: {
        width: `${100 / 7}%`,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
    },

    dayCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectedDay: {
        backgroundColor: '#1D2B30',
    },

    dayText: {
        fontSize: 20,
        color: '#222222',
    },

    selectedDayText: {
        color: '#FFFFFF',
    },

    servicesList: {
        marginTop: 35,
        paddingHorizontal: 16,
        paddingBottom: 40,
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        minHeight: 86,
        marginBottom: 12,
        borderRadius: 4,
        overflow: 'hidden',
        elevation: 4,
        borderRightWidth: 6,
        borderRightColor: '#2094C9',
    },

    leftSection: {
        width: 90,
        backgroundColor: '#2094C9',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardDate: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },

    cardTime: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 18,
    },

    infoSection: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },

    serviceTitle: {
        fontSize: 14,
        color: '#222222',
        fontWeight: 'bold',
    },

    phone: {
        fontSize: 12,
        color: '#222222',
        marginTop: 2,
    },

    address: {
        fontSize: 10,
        color: '#444444',
    },

    agent: {
        fontSize: 15,
        color: '#777777',
        marginTop: 8,
    },

    rightSection: {
        width: 70,
        alignItems: 'center',
        paddingVertical: 8,
    },

    type: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    price: {
        fontSize: 9,
        color: '#444444',
        marginTop: 12,
    },

    finished: {
        fontSize: 9,
        color: '#008060',
        fontWeight: 'bold',
        marginTop: 12,
    },

    paid: {
        fontSize: 9,
        color: '#B33A3A',
        fontWeight: 'bold',
        marginTop: 8,
    },
    backButton: {
    marginRight: 15,
    },
    });