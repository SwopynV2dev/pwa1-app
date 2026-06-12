import {View,Text,StyleSheet,TextInput,TouchableOpacity,ScrollView,} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddExpense() {
    const expenseForm = {
        title: 'Captura de Gasto',
        concept: 'Gasolina',
        paymentWay: 'Contado',
        paymentMethod: 'Efectivo',
        receiptType: 'Factura',
    };

    const [photo, setPhoto] = useState<string | null>(null);

        const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            alert('Se necesita permiso para usar la cámara');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
        };

    return (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
            <Text style={styles.close} onPress={() => router.push('/expenses')}>×</Text>
            <Text style={styles.headerTitle}>{expenseForm.title}</Text>
            </View>

            <TextInput
            placeholder="Nombre del gasto"
            style={styles.input}
            />

            <TextInput
            placeholder="Descripción"
            style={styles.input}
            />

            <Text style={styles.label}>Concepto</Text>
            <Text style={styles.optionText}>{expenseForm.concept}</Text>

            <Text style={styles.label}>Forma de pago</Text>
            <Text style={styles.optionText}>{expenseForm.paymentWay}</Text>

            <Text style={styles.label}>Método de pago</Text>
            <Text style={styles.optionText}>{expenseForm.paymentMethod}</Text>

            <TextInput
            placeholder="Concepto / Articulo"
            style={styles.input}
            />

            <TextInput
            placeholder="Monto"
            style={styles.input}
            keyboardType="numeric"
            />

            <Text style={styles.label}>Tipo de comprobante</Text>
            <Text style={styles.optionText}>{expenseForm.receiptType}</Text>

            <TextInput style={styles.receiptInput} />

            <View style={styles.bottomSection}>
            <TouchableOpacity onPress={takePhoto}>
                <MaterialIcons
                    name="add-a-photo"
                    size={60}
                    color="#438FC2"
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Guardar Gasto</Text>
            </TouchableOpacity>
            </View>

            {photo && (
                <Image
                    source={{ uri: photo }}
                    style={styles.photoPreview}
                />
                )}
        </ScrollView>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    content: {
        paddingHorizontal: 30,
        paddingBottom: 40,
    },

    header: {
        height: 95,
        flexDirection: 'row',
        alignItems: 'center',
    },

    close: {
        fontSize: 50,
        color: '#2094C9',
        marginRight: 70,
    },

    headerTitle: {
        fontSize: 30,
        color: '#2094C9',
        fontWeight: '500',
    },

    input: {
        height: 56,
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 4,
        paddingHorizontal: 14,
        fontSize: 20,
        color: '#3D5A96',
        marginBottom: 20,
    },

    label: {
        color: '#3D5A96',
        fontSize: 20,
        marginBottom: 18,
    },

    optionText: {
        fontSize: 22,
        color: '#111111',
        marginLeft: 30,
        marginBottom: 30,
    },

    receiptInput: {
        height: 58,
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 4,
        marginLeft: 80,
        marginTop: 25,
        marginBottom: 20,
    },

    bottomSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },

    cameraIcon: {
        fontSize: 48,
        color: '#2094C9',
        marginRight: 60,
    },

    saveButton: {
        backgroundColor: '#2094C9',
        paddingVertical: 14,
        paddingHorizontal: 35,
        borderRadius: 30,
        elevation: 5,
        marginLeft: 20,
    },

    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 3,
    },
    photoPreview: {
    width: 180,
    height: 120,
    marginTop: 15,
    borderRadius: 8,
    },
    });