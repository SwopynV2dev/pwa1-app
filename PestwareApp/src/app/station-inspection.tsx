import { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Modal,FlatList,ScrollView,Alert, } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image,} from 'react-native';

export default function StationInspection() {
    const params = useLocalSearchParams();

    const stationName = params.stationName?.toString() || 'Cebadero';
    const clientName = params.clientName?.toString() || '-';

    const today = new Date();

    const currentDate = today.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
    });

    const currentTime = today.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const [zone, setZone] = useState(params.zone?.toString() || 'Exterior');
    const [perimeter, setPerimeter] = useState(
        params.perimeter?.toString() || 'Perímetro Exterior'
    );

    const [activity, setActivity] = useState('');
    const [conditions, setConditions] = useState<string[]>([]);
    const [observations, setObservations] = useState('');
    const [correctiveActions, setCorrectiveActions] = useState('');

    const [showZoneModal, setShowZoneModal] = useState(false);
    const [showPerimeterModal, setShowPerimeterModal] = useState(false);
    const [showActivityModal, setShowActivityModal] = useState(false);
    const [showConditionsModal, setShowConditionsModal] = useState(false);

    const [photo, setPhoto] = useState<string | null>(null);
    const [showPhotoOptions, setShowPhotoOptions] = useState(false);

    const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                'Permiso requerido',
                'Necesitas permitir el acceso a la cámara.'
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }

        setShowPhotoOptions(false);
    };

    const pickPhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }

        setShowPhotoOptions(false);
    };

    const zones = ['Exterior', 'Interior'];

    const perimeters = [
        'Perímetro Exterior',
        'Perímetro Interior',
        'Área de Producción',
        'Bodega',
        'Oficinas',
    ];

    const activities = [
        'Sin Ingesta',
        'Ingesta por Insecto',
        'Ingesta Parcial',
        'Ingesta Total',
        'Cambio por mal estado',
    ];

    const conditionOptions = [
        'Desanclada',
        'Perdida',
        'Rota',
        'Bloqueada',
        'Sucia',
        'Mojada',
        'Buen Estado',
    ];

    const toggleCondition = (condition: string) => {
        if (conditions.includes(condition)) {
            setConditions(conditions.filter(item => item !== condition));
        } else {
            setConditions([...conditions, condition]);
        }
    };

    const saveInspection = () => {
        router.push({
            pathname: '/inspections',
            params: {
                newInspection: 'true',
                stationName,
                clientName,
                date: currentDate,
                time: currentTime,
                zone,
                perimeter,
                activity,
                conditions: conditions.join(', '),
                observations,
                correctiveActions,
            },
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>{stationName}</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Cliente:</Text>
                    <Text style={styles.value}>{clientName}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Fecha:</Text>
                    <Text style={styles.value}>{currentDate}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Hora:</Text>
                    <Text style={styles.value}>{currentTime}</Text>
                </View>

                <View style={styles.cameraRow}>
                    <TouchableOpacity
                        style={styles.cameraButton}
                        onPress={() => setShowPhotoOptions(true)}
                    >
                        {photo ? (
                            <Image source={{ uri: photo }} style={styles.photoPreview} />
                        ) : (
                            <MaterialIcons name="add-a-photo" size={50} color="#438FC2" />
                        )}
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Zona</Text>

                <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => setShowZoneModal(true)}
                >
                    <Text style={styles.selectText}>{zone}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={28} color="#438FC2" />
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Perímetro</Text>

                <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => setShowPerimeterModal(true)}
                >
                    <Text style={styles.selectText}>{perimeter}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={28} color="#438FC2" />
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Actividad en la Estación</Text>

                <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => setShowActivityModal(true)}
                >
                    <Text style={styles.selectText}>
                        {activity || 'Seleccionar'}
                    </Text>
                    <MaterialIcons name="keyboard-arrow-down" size={28} color="#438FC2" />
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Condiciones de la Estación</Text>

                <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => setShowConditionsModal(true)}
                >
                    <Text style={styles.selectText}>
                        {conditions.length > 0
                            ? conditions.join(', ')
                            : 'Seleccionar'}
                    </Text>
                    <MaterialIcons name="check-box" size={24} color="#438FC2" />
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Observaciones</Text>

                <TextInput
                    style={styles.textArea}
                    placeholder="Escribe observaciones"
                    multiline
                    value={observations}
                    onChangeText={setObservations}
                />

                <Text style={styles.sectionTitle}>Acciones Correctivas</Text>

                <TextInput
                    style={styles.textArea}
                    placeholder="Escribe acciones correctivas"
                    multiline
                    value={correctiveActions}
                    onChangeText={setCorrectiveActions}
                />

                <TouchableOpacity style={styles.saveButton} onPress={saveInspection}>
                    <Text style={styles.saveButtonText}>GUARDAR INSPECCIÓN</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={showZoneModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Seleccionar Zona</Text>

                        {zones.map(item => (
                            <TouchableOpacity
                                key={item}
                                style={styles.modalOption}
                                onPress={() => {
                                    setZone(item);
                                    setShowZoneModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            <Modal visible={showPerimeterModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Seleccionar Perímetro</Text>

                        {perimeters.map(item => (
                            <TouchableOpacity
                                key={item}
                                style={styles.modalOption}
                                onPress={() => {
                                    setPerimeter(item);
                                    setShowPerimeterModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            <Modal visible={showActivityModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Actividad en la Estación</Text>

                        {activities.map(item => (
                            <TouchableOpacity
                                key={item}
                                style={styles.modalOption}
                                onPress={() => {
                                    setActivity(item);
                                    setShowActivityModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            <Modal visible={showConditionsModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Condiciones de la Estación</Text>

                        <FlatList
                            data={conditionOptions}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => {
                                const selected = conditions.includes(item);

                                return (
                                    <TouchableOpacity
                                        style={styles.checkOption}
                                        onPress={() => toggleCondition(item)}
                                    >
                                        <MaterialIcons
                                            name={selected ? 'check-box' : 'check-box-outline-blank'}
                                            size={24}
                                            color="#438FC2"
                                        />

                                        <Text style={styles.checkText}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setShowConditionsModal(false)}>
                                <Text style={styles.okText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showPhotoOptions}
                transparent
                animationType="fade"
                onRequestClose={() => setShowPhotoOptions(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.photoModal}>
                        <TouchableOpacity
                            style={styles.photoOption}
                            onPress={takePhoto}
                        >
                            <Text style={styles.photoOptionText}>
                                Tomar Foto
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.photoOption}
                            onPress={pickPhoto}
                        >
                            <Text style={styles.photoOptionText}>
                                Desde Galería
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.photoOption}
                            onPress={() => setShowPhotoOptions(false)}
                        >
                            <Text style={styles.photoOptionText}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
        paddingHorizontal: 20,
        paddingTop: 25,
    },

    headerTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '500',
        marginLeft: 20,
    },

    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        position: 'relative',
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    label: {
        fontSize: 20,
        color: '#222222',
        fontWeight: '500',
        width: 85,
    },

    value: {
        fontSize: 17,
        color: '#438FC2',
        fontWeight: '500',
        flex: 1,
    },

    cameraButton: {
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
    },

    sectionTitle: {
        fontSize: 17,
        color: '#222222',
        fontWeight: '500',
        marginTop: 15,
        marginBottom: 8,
    },

    selectButton: {
        height: 45,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 5,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },

    selectText: {
        fontSize: 15,
        color: '#333333',
        flex: 1,
    },

    textArea: {
        minHeight: 85,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 15,
        color: '#333333',
    },

    saveButton: {
        height: 50,
        backgroundColor: '#438FC2',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 30,
    },

    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer: {
        width: '85%',
        maxHeight: '80%',
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

    modalOption: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },

    modalOptionText: {
        fontSize: 16,
        color: '#333333',
    },

    checkOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },

    checkText: {
        fontSize: 16,
        color: '#333333',
        marginLeft: 12,
    },

    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },

    okText: {
        color: '#438FC2',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },

    cameraRow: {
        position: 'absolute',
        top: 15,
        right: 20,
        zIndex: 10,
    },

    photoPreview: {
        width: 65,
        height: 55,
        borderRadius: 6,
    },

    photoModal: {
        width: '75%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 10,
    },

    photoOption: {
        paddingVertical: 16,
        paddingHorizontal: 20,
    },

    photoOptionText: {
        fontSize: 16,
        color: '#333333',
    },
});