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

            <MaterialIcons
                name="check"
                size={42}
                color="#FFFFFF"
                style={styles.checkIcon}
            />
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
        </View>
        </View>
    );
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
});