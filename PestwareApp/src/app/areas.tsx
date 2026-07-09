import { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Modal,FlatList,} from 'react-native';
import BottomMenu from './BottomMenu';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

type Client = {
    id: number;
    name: string;
};

export default function Areas() {
    const [showClientModal, setShowClientModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<string>('');
    const [showClientAreas, setShowClientAreas] = useState(false);
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [openSections, setOpenSections] = useState<number[]>([]);
    const [showStationsModal, setShowStationsModal] = useState(false);
    const [selectedStations, setSelectedStations] = useState<number[]>([]);

    const clients: Client[] = [
        { id: 1, name: 'Romeo Moreno' },
        { id: 2, name: 'Prueba' },
        { id: 3, name: 'Agroestime' },
    ];

    const today = new Date();

    const currentDate = today.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const areaData = {
        code: 'M-2031',
        date: currentDate,
    };

    const serviceOrders = [
        {
            id: 1,
            clientId: 3,
            folio: 'OS-13651',
            name: 'Fumigación de Agroestime',
        },
        {
            id: 2,
            clientId: 2,
            folio: 'OS-13652',
            name: 'Fumigación de Prueba',
        },
        {
            id: 3,
            clientId: 1,
            folio: 'OS-13653',
            name: 'Fumigación de Romeo Moreno',
        },
    ];

    const clientAreas = [
        {
            id: 1,
            name: 'Exterior',
            areas: ['Caseta de Vigilancia', 'Bodega de Producto', 'Anden de Carga'],
        },
        {
            id: 2,
            name: 'Interior',
            areas: ['Oficinas', 'Comedor', 'Línea de Producción'],
        },
    ];

    const stations = [
        { id: 1, name: 'Cebadero #1' },
        { id: 2, name: 'Cebadero #2' },
        { id: 3, name: 'Cebadero #3' },
        { id: 4, name: 'Cebadero #4' },
        { id: 5, name: 'Cebadero #5' },
        { id: 6, name: 'Cebadero #6' },
        { id: 7, name: 'Cebadero #7' },
        { id: 8, name: 'Cebadero #8' },
        { id: 9, name: 'Cebadero #9' },
        { id: 10, name: 'Cebadero #10' },
        { id: 11, name: 'Cebadero #11' },
    ];

    const params = useLocalSearchParams();

    const inspectedStation = params.inspectedStation?.toString();
    const inspectedStatus = params.inspectedStatus?.toString();
    const inspectedClient = params.clientName?.toString();
    const inspectedZone = params.zone?.toString();
    const inspectedPerimeter = params.perimeter?.toString();

        const toggleStation = (stationId: number) => {
            if (selectedStations.includes(stationId)) {
                setSelectedStations(selectedStations.filter(id => id !== stationId));
            } else {
                setSelectedStations([...selectedStations, stationId]);
            }
        };

    const selectClient = (client: Client) => {
        setSelectedClient(client);
        setShowClientModal(false);

        setTimeout(() => {
            setShowOrderModal(true);
        }, 300);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.close} onPress={() => router.push('/areas')}>x</Text>
                <Text style={styles.code}>{areaData.code}</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.clientRow}>
                    <TouchableOpacity
                        style={styles.clientButton}
                        onPress={() => setShowClientModal(true)}
                    >
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
                </View>

                <View style={styles.clientInfoRow}>
                    <Text style={styles.label}>Cliente:</Text>

                    <Text style={styles.selectedClientText}>
                        {selectedClient ? selectedClient.name : '-'}
                    </Text>
                </View>

                <View style={styles.dateRow}>
                    <Text style={styles.dateLabel}>Fecha:</Text>
                    <Text style={styles.date}>{areaData.date}</Text>
                </View>

                <TouchableOpacity
                    style={styles.manualButton}
                    onPress={() => setShowStationsModal(true)}
                >
                    <Text style={styles.manualText}>ESCANEO MANUAL</Text>
                </TouchableOpacity>

                {selectedClient && showClientAreas && (
                    <View style={styles.areasContainer}>
                        <TouchableOpacity
                            style={styles.clientAccordionHeader}
                            onPress={() => setIsMainOpen(!isMainOpen)}
                        >
                            <MaterialIcons
                                name={isMainOpen ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
                                size={22}
                                color="#FFFFFF"
                            />

                            <MaterialIcons name="business" size={20} color="#FFFFFF" />

                            <Text style={styles.clientAccordionText}>
                                {selectedClient.name}
                            </Text>
                        </TouchableOpacity>

                        {isMainOpen && clientAreas.map((section) => {
                                const isOpen = openSections.includes(section.id);

                                return (
                                    <View key={section.id}>
                                        <TouchableOpacity
                                            style={styles.sectionHeader}
                                            onPress={() => {
                                                if (isOpen) {
                                                    setOpenSections(openSections.filter(id => id !== section.id));
                                                } else {
                                                    setOpenSections([...openSections, section.id]);
                                                }
                                            }}
                                        >
                                            <MaterialIcons
                                                name={isOpen ? 'keyboard-arrow-down' : 'keyboard-arrow-right'}
                                                size={22}
                                                color="#FFFFFF"
                                            />

                                            <MaterialIcons name="business" size={20} color="#FFFFFF" />

                                            <Text style={styles.sectionHeaderText}>
                                                {section.name}
                                            </Text>
                                        </TouchableOpacity>

                                        {isOpen &&
                                            section.areas.map((area, index) => (
                                                <View key={index} style={styles.areaItem}>
                                                    <MaterialIcons
                                                        name="grid-on"
                                                        size={15}
                                                        color="#FFFFFF"
                                                    />

                                                    <Text style={styles.areaItemText}>
                                                        {area}
                                                    </Text>
                                                </View>
                                            ))}
                                    </View>
                                );
                            })}
                    </View>
                )}
            </View>

            <View style={styles.bottomButtons}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push('/areas')}
                >
                    <Text style={styles.backButtonText}>REGRESAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.finishButton}
                    onPress={() => router.push('/inspections')}
                >
                    <Text style={styles.finishButtonText}>FINALIZAR INSPECCIÓN</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={showClientModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowClientModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Seleccionar Cliente</Text>

                        <FlatList
                            data={clients}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.clientOption}
                                    onPress={() => selectClient(item)}
                                >
                                    <MaterialIcons
                                        name={
                                            selectedClient?.id === item.id
                                                ? 'check-box'
                                                : 'check-box-outline-blank'
                                        }
                                        size={24}
                                        color="#438FC2"
                                    />

                                    <Text style={styles.clientOptionText}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setShowClientModal(false)}>
                                <Text style={styles.cancelText}>CANCELAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={showOrderModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowOrderModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>
                            Selecciona una orden de servicio:
                        </Text>

                        <Text style={styles.orderLabel}>Orden de Servicio:</Text>

                        {serviceOrders
                            .filter(order => order.clientId === selectedClient?.id)
                            .map(order => (
                                <TouchableOpacity
                                    key={order.id}
                                    style={styles.orderOption}
                                    onPress={() => setSelectedOrder(order.folio)}
                                >
                                    <Text style={styles.orderText}>
                                        {order.name}
                                    </Text>

                                    <Text style={styles.orderFolio}>
                                        {order.folio}
                                    </Text>

                                    <MaterialIcons
                                        name={
                                            selectedOrder === order.folio
                                                ? 'keyboard-arrow-up'
                                                : 'keyboard-arrow-down'
                                        }
                                        size={24}
                                        color="#333333"
                                    />
                                </TouchableOpacity>
                            ))}

                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setShowOrderModal(false)}>
                                <Text style={styles.cancelText}>CANCELAR</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setShowOrderModal(false);
                                    setShowClientAreas(true);
                                    setIsMainOpen(false);
                                    setOpenSections([]);
                                }}
                            >
                                <Text style={styles.okText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showStationsModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowStationsModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.stationsModalContainer}>
                        <Text style={styles.modalTitle}>Estaciones a Monitorear</Text>

                        <FlatList
                            data={stations}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                const isSelected = selectedStations.includes(item.id);

                                return (
                                    <TouchableOpacity
                                        style={styles.stationOption}
                                        onPress={() => toggleStation(item.id)}
                                    >
                                        <MaterialIcons
                                            name={isSelected ? 'check-box' : 'check-box-outline-blank'}
                                            size={24}
                                            color="#438FC2"
                                        />

                                        <Text style={styles.stationText}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setShowStationsModal(false)}>
                                <Text style={styles.cancelText}>CANCELAR</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setShowStationsModal(false);

                                    const selectedStation = stations.find(
                                        station => selectedStations.includes(station.id)
                                    );

                                    if (!selectedStation) return;

                                    router.push({
                                        pathname: '/station-inspection',
                                        params: {
                                            stationName: selectedStation.name,
                                            clientName: selectedClient?.name,
                                            zone: 'Exterior',
                                            perimeter: 'Perímetro Exterior',
                                        },
                                    });
                                }}
                            >
                                <Text style={styles.okText}>ACEPTAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

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

    clientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    clientButton: {
        backgroundColor: '#70B8A7',
        width: '57%',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },

    clientButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },

    qrContainer: {
        width: 80,
        height: 75,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    label: {
        fontSize: 25,
        color: '#222222',
    },

    selectedClientText: {
        fontSize: 18,
        color: '#438FC2',
        marginTop: 10,
        fontWeight: '500',
    },

    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },

    dateLabel: {
        fontSize: 25,
        color: '#222222',
    },

    date: {
        fontSize: 18,
        color: '#438FC2',
        marginLeft: 10,
    },

    manualButton: {
        alignSelf: 'flex-end',
        marginTop: 15,
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

    manualText: {
        color: '#438FC2',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 3,
    },

    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        paddingBottom: 70,
        backgroundColor: '#FFFFFF',
    },

    backButton: {
        width: '36%',
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
        width: '58%',
        height: 50,
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
        marginLeft: 10,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer: {
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        elevation: 6,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#222222',
        marginBottom: 15,
    },

    clientOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },

    clientOptionText: {
        fontSize: 16,
        color: '#333333',
        marginLeft: 12,
    },

    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },

    cancelText: {
        color: '#438FC2',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 1,
    },

    orderLabel: {
        fontSize: 14,
        color: '#438FC2',
        marginBottom: 8,
    },

    orderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },

    orderText: {
        flex: 1,
        fontSize: 14,
        color: '#333333',
    },

    orderFolio: {
        fontSize: 13,
        color: '#333333',
        marginRight: 8,
    },

    okText: {
        color: '#438FC2',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginLeft: 25,
    },

    clientInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },

    areasContainer: {
        marginTop: 18,
        width: '100%',
    },

    clientAccordionHeader: {
        height: 42,
        backgroundColor: '#438FC2',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },

    clientAccordionText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 8,
    },

    sectionHeader: {
        height: 38,
        backgroundColor: '#3B82B6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        borderTopWidth: 1,
        borderTopColor: '#FFFFFF',
    },

    sectionHeaderText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
    },

    areaItem: {
        height: 34,
        backgroundColor: '#70B8A7',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 55,
        borderTopWidth: 1,
        borderTopColor: '#FFFFFF',
    },

    areaItemText: {
        color: '#FFFFFF',
        fontSize: 13,
        marginLeft: 8,
    },

    stationsModalContainer: {
        width: '88%',
        maxHeight: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        elevation: 6,
    },

    stationOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },

    stationText: {
        fontSize: 16,
        color: '#333333',
        marginLeft: 12,
    },
});