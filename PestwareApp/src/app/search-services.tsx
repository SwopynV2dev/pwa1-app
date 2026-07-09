import { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchServices() {
    const [serviceStatus, setServiceStatus] = useState('Todos');
    const [serviceType, setServiceType] = useState('Todos');
    const [paymentStatus, setPaymentStatus] = useState('Todos');

    const filters = {
        serviceStatus: ['Todos', 'Finalizado', 'Comenzado', 'Cancelado'],
        serviceType: ['Todos', 'Servicio', 'Refuerzo', 'Garantía', 'Seguimiento'],
        paymentStatus: ['Todos', 'Pagado', 'Adeudo', 'Crédito'],
    };

    //Calendario
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <View style={styles.container}>
        <View style={styles.modal}>
            <View style={styles.header}>
            <Text style={styles.close} onPress={() => router.push('/services')}>×</Text>
            <Text style={styles.headerTitle}>Buscar servicios</Text>
            <MaterialIcons
                name="search"
                size={42}
                color="#FFFFFF"
                style={styles.searchIcon}
            />

            <TouchableOpacity onPress={() => setShowCalendar(true)}>
                <MaterialIcons
                    name="check"
                    size={42}
                    color="#FFFFFF"
                    style={styles.checkIcon}
                />
            </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
            <FilterSection
                icon="info"
                title="Estatus del servicio:"
                options={filters.serviceStatus}
                selected={serviceStatus}
                onSelect={setServiceStatus}
            />

            <FilterSection
                icon="bug-report"
                title="Tipo de servicio:"
                options={filters.serviceType}
                selected={serviceType}
                onSelect={setServiceType}
            />

            <FilterSection
                icon="credit-card"
                title="Estatus del pago:"
                options={filters.paymentStatus}
                selected={paymentStatus}
                onSelect={setPaymentStatus}
            />
            </ScrollView>
            {showCalendar && (
    <View style={styles.calendarOverlay}>
        <View style={styles.calendarBox}>
            <View style={styles.calendarHeader}>
                <TouchableOpacity
                    onPress={() =>
                        setCurrentMonth(
                            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
                        )
                    }
                >
                    <MaterialIcons name="keyboard-arrow-left" size={32} color="#2094C9" />
                </TouchableOpacity>

                <Text style={styles.calendarTitle}>
                    {currentMonth.toLocaleDateString('es-MX', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        setCurrentMonth(
                            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
                        )
                    }
                >
                    <MaterialIcons name="keyboard-arrow-right" size={32} color="#2094C9" />
                </TouchableOpacity>
            </View>

                <View style={styles.selectedDatesRow}>
                    <View style={styles.selectedDateBox}>
                        <Text style={styles.selectedDateLabel}>Del día</Text>
                        <Text style={styles.selectedDateText}>
                            {startDate ? formatDate(startDate) : 'Seleccionar'}
                        </Text>
                    </View>

                    <View style={styles.selectedDateBox}>
                        <Text style={styles.selectedDateLabel}>Al día</Text>
                        <Text style={styles.selectedDateText}>
                            {endDate ? formatDate(endDate) : 'Seleccionar'}
                        </Text>
                    </View>
                </View>

                <View style={styles.daysHeader}>
                    {['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'].map((day) => (
                        <Text key={day} style={styles.dayName}>{day}</Text>
                    ))}
                </View>

                <View style={styles.calendarGrid}>
                    {getCalendarDays(currentMonth).map((day, index) => {
                        if (!day) {
                            return <View key={index} style={styles.dayButton} />;
                        }

                        const selected = isSelected(day, startDate, endDate);

                        return (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.dayButton,
                                    selected && styles.dayButtonSelected,
                                ]}
                                onPress={() => handleSelectDate(day, startDate, endDate, setStartDate, setEndDate)}
                            >
                                <Text style={[
                                    styles.dayText,
                                    selected && styles.dayTextSelected,
                                ]}>
                                    {day.getDate()}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.calendarActions}>
                    <TouchableOpacity onPress={() => setShowCalendar(false)}>
                        <Text style={styles.cancelText}>Cerrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowCalendar(false)}>
                        <Text style={styles.acceptText}>Aplicar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )}
        </View>
        </View>
    );
    }

        function formatDate(date: Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
    }

    function getCalendarDays(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        let startDay = firstDay.getDay();
        startDay = startDay === 0 ? 6 : startDay - 1;

        const days: (Date | null)[] = [];

        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    }

    function handleSelectDate(
        selectedDate: Date,
        startDate: Date | null,
        endDate: Date | null,
        setStartDate: (date: Date | null) => void,
        setEndDate: (date: Date | null) => void
    ) {
        if (!startDate || endDate) {
            setStartDate(selectedDate);
            setEndDate(null);
            return;
        }

        if (selectedDate < startDate) {
            setEndDate(startDate);
            setStartDate(selectedDate);
        } else {
            setEndDate(selectedDate);
        }
    }

    function isSelected(day: Date, startDate: Date | null, endDate: Date | null) {
        if (!startDate) return false;

        if (!endDate) {
            return day.toDateString() === startDate.toDateString();
        }

        return day >= startDate && day <= endDate;
    }

    function FilterSection({
    icon,
    title,
    options,
    selected,
    onSelect,
    }: {
    icon: string;
    title: string;
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    }) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
                <MaterialIcons
                    name={icon as any}
                    size={32}
                    color="#3D5A96"
                    style={styles.sectionIcon}
                />

                <Text style={styles.sectionTitle}>
                    {title}
                </Text>
            </View>

            <View style={styles.optionsContainer}>
                {options.map((option) => {
                    const isActive = selected === option;

                    return (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.optionChip,
                                isActive && styles.optionChipActive,
                            ]}
                            onPress={() => onSelect(option)}
                        >
                            {isActive && (
                                <Text style={styles.check}>✓</Text>
                            )}

                            <Text style={styles.optionText}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#555555',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modal: {
        width: '92%',
        height: '92%',
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        overflow: 'hidden',
    },

    header: {
        height: 70,
        backgroundColor: '#2094C9',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 22,
    },

    close: {
        color: '#FFFFFF',
        fontSize: 45,
        fontWeight: '300',
        marginRight: 25,
    },

    headerTitle: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '600',
    },

    searchIcon: {
        color: '#FFFFFF',
        fontSize: 42,
        marginRight: 25,
    },

    checkIcon: {
        color: '#FFFFFF',
        fontSize: 38,
    },

    content: {
        padding: 16,
    },

    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        paddingHorizontal: 18,
        paddingTop: 20,
        paddingBottom: 18,
        marginBottom: 18,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 5,
        shadowOffset: {
        width: 0,
        height: 3,
        },
    },

    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 22,
    },

    sectionIcon: {
        color: '#3D5A96',
        fontSize: 28,
        marginRight: 16,
    },

    sectionTitle: {
        color: '#3D5A96',
        fontSize: 24,
        fontWeight: '600',
    },

    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    optionChip: {
        backgroundColor: '#E4E4E4',
        borderRadius: 28,
        paddingVertical: 10,
        paddingHorizontal: 18,
        marginRight: 12,
        marginBottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },

    optionChipActive: {
        backgroundColor: '#D8D8D8',
    },

    check: {
        color: '#2094C9',
        fontSize: 24,
        marginRight: 12,
    },

    optionText: {
        fontSize: 20,
        color: '#222222',
        },
        calendarOverlay: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    calendarBox: {
        width: '92%',
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        padding: 14,
    },

    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    calendarTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'capitalize',
    },

    selectedDatesRow: {
        flexDirection: 'row',
        marginBottom: 14,
    },

    selectedDateBox: {
        flex: 1,
        backgroundColor: '#2094C9',
        padding: 10,
        alignItems: 'center',
        marginHorizontal: 3,
        borderRadius: 4,
    },

    selectedDateLabel: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },

    selectedDateText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },

    daysHeader: {
        flexDirection: 'row',
        marginBottom: 8,
    },

    dayName: {
        flex: 1,
        textAlign: 'center',
        color: '#D6402F',
        fontSize: 13,
        fontWeight: 'bold',
    },

    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    dayButton: {
        width: '14.28%',
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },

    dayButtonSelected: {
        backgroundColor: '#2094C9',
        borderRadius: 18,
    },

    dayText: {
        fontSize: 14,
        color: '#333',
    },

    dayTextSelected: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    calendarActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
    },

    cancelText: {
        color: '#D6402F',
        fontSize: 16,
        marginRight: 24,
    },

    acceptText: {
        color: '#2094C9',
        fontSize: 16,
        fontWeight: 'bold',
    },
});