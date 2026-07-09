import { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Image,Alert,ScrollView,} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ServiceCancel() {
    const [reason, setReason] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            Alert.alert('Permiso requerido', 'Necesitas permitir el uso de la cámara');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            quality: 0.7,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const saveCancellation = () => {
        if (!reason.trim()) {
            Alert.alert(
                'Falta motivo',
                'Escribe el motivo por el cual no se realizó el servicio'
            );
            return;
        }

        if (!photo) {
            Alert.alert('Falta foto', 'Adjunta una foto de evidencia');
            return;
        }

        const cancellationData = {
            status: 'Cancelado',
            cancellationReason: reason,
            cancellationPhoto: photo,
        };

        console.log('Cancelación:', cancellationData);

        Alert.alert(
            'Servicio cancelado',
            'La cancelación se guardó correctamente',
            [
                {
                    text: 'OK',
                    onPress: () => router.push('/services'),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Cancelacion</Text>

                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>Motivo de cancelación</Text>

                <TextInput
                    style={styles.reasonInput}
                    placeholder="Escribe el motivo por el cual no se llevó a cabo el servicio"
                    placeholderTextColor="#999"
                    value={reason}
                    onChangeText={setReason}
                    multiline
                    textAlignVertical="top"
                />

                <Text style={styles.label}>Foto de evidencia</Text>

                <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
                    <MaterialIcons name="add-a-photo" size={38} color="#2094C9" />
                    <Text style={styles.photoButtonText}>Tomar foto</Text>
                </TouchableOpacity>

                {photo && (
                    <Image
                        source={{ uri: photo }}
                        style={styles.photoPreview}
                        resizeMode="cover"
                    />
                )}

                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        Alert.alert('Servicio cancelado');
                        router.push('/service-detail');
                    }}
                >
                    <Text style={styles.saveButtonText}>
                        Guardar cancelación
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#2094C9',
        paddingTop: 45,
        paddingHorizontal: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        marginTop: 14,
    },
    reasonInput: {
        backgroundColor: '#fff',
        minHeight: 130,
        borderRadius: 10,
        padding: 12,
        fontSize: 15,
        color: '#333',
        borderWidth: 1,
        borderColor: '#DDD',
    },
    photoButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
    },
    photoButtonText: {
        marginTop: 6,
        fontSize: 15,
        color: '#2094C9',
        fontWeight: 'bold',
    },
    photoPreview: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        marginTop: 12,
    },
    signatureArea: {
        backgroundColor: '#fff',
        height: 170,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    signaturePlaceholder: {
        color: '#999',
        fontSize: 15,
    },
    signatureImage: {
        width: '100%',
        height: '100%',
    },
    saveButton: {
        backgroundColor: '#0F6E31',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 28,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signatureModalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    closeSignatureButton: {
        backgroundColor: '#D9534F',
        paddingVertical: 14,
        alignItems: 'center',
    },
    closeSignatureText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});