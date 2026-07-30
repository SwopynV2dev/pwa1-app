import {View,Text,StyleSheet,ScrollView,TouchableOpacity,ActivityIndicator,Alert,} from 'react-native';
import { router } from 'expo-router';
import BottomMenu from './BottomMenu';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getTodayServicesByEmployee } from '../api/servicesService';
import { TodayService } from '../api/types';

export default function Services() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [services, setServices] = useState<TodayService[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const getWeekDays = (date: Date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());

        return Array.from({ length: 7 }, (_, index) => {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + index);

            return {
                fullDate: currentDate,
                dayName: dayNames[currentDate.getDay()],
                dayNumber: currentDate.getDate(),
            };
        });
    };

const days = getWeekDays(selectedDate);

    useEffect(() => {
        const loadTodayServices = async () => {
            try {
                setIsLoading(true);
                setErrorMessage('');

                const response = await getTodayServicesByEmployee(1091);

                setServices(response);

                console.log(
                    'Servicios obtenidos:',
                    response
                );
            } catch (error) {
                console.error(
                    'Error al consultar los servicios:',
                    error
                );

                setErrorMessage(
                    'No fue posible cargar los servicios.'
                );

                Alert.alert(
                    'Error',
                    'No fue posible consultar los servicios asignados.'
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadTodayServices();
    }, []);


    const sortedServices = [...services].sort((a, b) => {
    const firstDate = new Date(
        `${a.initial_date}T${a.initial_hour}`
    );

    const secondDate = new Date(
        `${b.initial_date}T${b.initial_hour}`
    );

    return firstDate.getTime() - secondDate.getTime();
});

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const filteredServices = sortedServices.filter((service) => {
        const selected = formatDate(selectedDate);

        return service.initial_date === selected;
    });

    return (
    <View style={styles.container}>

        <View style={styles.header}>
    <Text style={styles.headerTitle}>Mis Servicios</Text>

    <TouchableOpacity
        style={styles.searchButton}
        onPress={() => router.push('/search-services')}
    >
        <MaterialIcons name="search" size={30} color="#1D98D1" />
    </TouchableOpacity>
</View>

    <View style={styles.calendarContainer}>
        <Text style={styles.monthText}>
            {monthNames[selectedDate.getMonth()]}
        </Text>

        <View style={styles.daysRow}>
            <TouchableOpacity onPress={() => {const newDate = new Date(selectedDate);
                    newDate.setDate(selectedDate.getDate() - 7);
                    setSelectedDate(newDate);
                }}
            >
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={26}
                    color="#111111"
                />
            </TouchableOpacity>

            {days.map((day) => {
                const isSelected = selectedDate.getDate() === day.dayNumber;

                return (
                        <TouchableOpacity
                            key={day.dayNumber}
                            style={[
                                styles.dayItem,
                                isSelected && styles.dayItemActive,
                            ]}
                            onPress={() => setSelectedDate(day.fullDate)}>
                            <Text
                                style={[
                                    styles.dayName,
                                    isSelected && styles.dayTextActive,
                                ]}
                            >
                                {day.dayName}
                            </Text>

                            <Text
                                style={[
                                    styles.dayNumber,
                                    isSelected && styles.dayTextActive,
                                ]}
                            >
                                {day.dayNumber}
                            </Text>
                        </TouchableOpacity>
                    );
                })}

            <TouchableOpacity onPress={() => {const newDate = new Date(selectedDate);
                    newDate.setDate(selectedDate.getDate() + 7);
                    setSelectedDate(newDate);
                }}
            >
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={26}
                    color="#111111"
                />
            </TouchableOpacity>
        </View>
    </View>

    <ScrollView>
        {isLoading ? (
            <View style={styles.emptyContainer}>
                <ActivityIndicator
                    size="large"
                    color="#1D98D1"
                />

                <Text style={styles.emptyText}>
                    Cargando servicios...
                </Text>
            </View>
        ) : errorMessage ? (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    {errorMessage}
                </Text>
            </View>
        ) : filteredServices.length > 0 ? (
            filteredServices.map((service) => (
                <View key={service.id}>
                    <ServiceCard
                        id={service.id}
                        serviceOrder={service.id_service_order ?? ''}
                        date={service.date}
                        time={service.hour}
                        finalHour={service.final_hour ?? ''}
                        title={service.title}
                        customer={service.customer ?? ''}
                        contact={service.establishment_name ?? ''}
                        phone={service.cellphone ?? ''}
                        address={service.address ?? ''}
                        city={service.municipality ?? ''}
                        state={service.state ?? ''}
                        type={service.plague ?? ''}
                        plagues={service.plagues_quote ?? ''}
                        conditions={service.conditions ?? ''}
                        inhabitants={service.inhabitants ?? ''}
                        mascots={service.mascots ?? ''}
                        status={service.etiqueta ?? ''}
                        paymentStatus={service.etiqueta_payment ?? ''}
                        observations={service.observations ?? ''}
                        technician={service.technician ?? ''}
                        scheduledBy={service.user_schedule_service ?? ''}
                        total={service.totalC ?? ''}
                    />
                </View>
            ))
        ) : (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    No hay servicios para este día
                </Text>
            </View>
        )}
    </ScrollView>

        <BottomMenu active="services" />
    </View>
    );
    }

    function ServiceCard({
    id,
    serviceOrder,
    date,
    time,
    finalHour,
    title,
    customer,
    contact,
    phone,
    address,
    city,
    state,
    type,
    plagues,
    conditions,
    inhabitants,
    mascots,
    status,
    paymentStatus,
    observations,
    technician,
    scheduledBy,
    total,
}: {
    id: number;
    serviceOrder: string;
    date: string;
    time: string;
    finalHour: string;
    title: string;
    customer: string;
    contact: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    type: string;
    plagues: string;
    conditions: string;
    inhabitants: string;
    mascots: string;
    status: string;
    paymentStatus: string;
    observations: string;
    technician: string;
    scheduledBy: string;
    total: string;
}) {
    const getStatusColor = () => {
        if (status === 'Finalizado') return '#0F6E31';
        if (status === 'Comenzado') return '#F5A623';
        return '#1295D8';
    };

    const statusColor = getStatusColor();

    return (
        <TouchableOpacity
            style={styles.card}
                onPress={() =>
                    router.push({
                        pathname: '/service-detail',
                        params: {
                            serviceId: id.toString(),
                            serviceOrder,
                            date,
                            time,
                            finalHour,
                            title,
                            customer,
                            contact,
                            phone,
                            address,
                            city,
                            state,
                            type,
                            plagues,
                            conditions,
                            inhabitants,
                            mascots,
                            status,
                            paymentStatus,
                            observations,
                            technician,
                            scheduledBy,
                            total,
                        },
                    })
                }
            >
            <View style={[styles.dateSection, { backgroundColor: statusColor }]}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.title}>{title}</Text>

                {phone !== '' && <Text style={styles.phone}>{phone}</Text>}

                {address !== '' && <Text style={styles.address}>{address}</Text>}
            </View>

            <View style={styles.statusSection}>
                <MaterialIcons
                    name="keyboard-arrow-down"
                    size={30}
                    color="#1D98D1"
                    style={styles.cardArrow}
                />

                <Text style={styles.type}>{type}</Text>

                <Text style={[styles.statusText, { color: statusColor }]}>
                    {status}
                </Text>

                {paymentStatus !== '' && (
                    <Text style={styles.paid}>{paymentStatus}</Text>
                )}
            </View>

            <View style={[styles.rightLine, { backgroundColor: statusColor }]} />
        </TouchableOpacity>
    );
}

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1',
    },

    header: {
        height: 65,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        paddingHorizontal: 18,
        paddingBottom: 10,
    },

    headerTitle: {
        fontSize: 18,
        color: '#222',
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginHorizontal: 8,
        marginTop: 10,
        elevation: 4,
        minHeight: 120,
        position: 'relative',
        },

    dateSection: {
        width: 95,
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
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 20,
    },

    infoSection: {
        flex: 1,
        padding: 10,
    },

    title: {
        fontSize: 12,
        fontWeight: 'bold',
    },

    phone: {
        fontSize: 12,
        marginTop: 4,
    },

    address: {
        fontSize: 12,
        marginTop: 2,
        color: '#444',
    },

    statusSection: {
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        position: 'relative',
        paddingRight: 35,
        },

    type: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 18,
        marginLeft: 6,
    },

    paid: {
        color: '#D6402F',
        fontSize: 12,
        fontWeight: 'bold',
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
    
    searchButton: {
        padding: 4,
    },

    cardArrow: {
    position: 'absolute',
    top: 4,
    right: 4,
    },

    statusText: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 12,
        marginLeft: 6,
    },

    rightLine: {
        width: 6,
    },

    monthRow: {
        paddingHorizontal: 30,
        marginBottom: 4,
    },

    monthText: {
        color: '#1D98D1',
        fontSize: 18,
        fontWeight: 'bold',
    },

    daysRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },

    dayItem: {
        width: 38,
        height: 48,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dayItemActive: {
        backgroundColor: '#3478B8',
    },

    dayName: {
        fontSize: 13,
        color: '#111111',
    },

    dayNumber: {
        fontSize: 15,
        color: '#111111',
        fontWeight: 'bold',
    },

    dayTextActive: {
        color: '#FFFFFF',
    },

    calendarContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },

    emptyContainer: {
        marginTop: 40,
        alignItems: 'center',
    },

    emptyText: {
        fontSize: 16,
        color: '#777777',
    },
});