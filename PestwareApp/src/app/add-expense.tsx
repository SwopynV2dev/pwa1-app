import {View,Text,StyleSheet,TextInput,TouchableOpacity,ScrollView,} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddExpense() {
    const concepts = [
    'Gasolina',
    'Casetas',
    'Estacionamiento',
    'Comida',
    'Hospedaje',
    'Papelería',
    'Refacciones',
    'Mantenimiento',
    'Herramientas',
    'Material de limpieza',
    ];

    const paymentWays = ['Contado', 'A meses'];

    const paymentMethods = [
        'Efectivo',
        'Tarjeta de Crédito',
        'Tarjeta de Débito',
        'Transferencia',
        'Deposito',
        'Cheque',
    ];

    const receiptTypes = [
        'Factura',
        'Nota de venta',
        'Ticket',
        'Recibo',
        'Sin comprobante',
    ];

    const [concept, setConcept] = useState('Gasolina');
    const [paymentWay, setPaymentWay] = useState('Contado');
    const [paymentMethod, setPaymentMethod] = useState('Efectivo');
    const [receiptType, setReceiptType] = useState('Factura');

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const [expenseName, setExpenseName] = useState('');
    const [description, setDescription] = useState('');
    const [article, setArticle] = useState('');
    const [amount, setAmount] = useState('');

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

        const renderDropdown = (
            title: string,
            value: string,
            options: string[],
            type: string,
            onSelect: (value: string) => void
        ) => (
            <View>
                <Text style={styles.label}>{title}</Text>

                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() =>
                        setOpenDropdown(openDropdown === type ? null : type)
                    }
                >
                    <Text style={styles.dropdownText}>{value}</Text>
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={28}
                        color="#3D5A96"
                    />
                </TouchableOpacity>

                {openDropdown === type && (
                    <View style={styles.dropdownList}>
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={styles.dropdownItem}
                                onPress={() => {
                                    onSelect(option);
                                    setOpenDropdown(null);
                                }}
                            >
                                <Text style={styles.dropdownItemText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        );

    return (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.close} onPress={() => router.push('/expenses')}>×</Text>
                <Text style={styles.headerTitle}>Captura de Gasto</Text>
            </View>

            <TextInput
                placeholder="Nombre del gasto"
                style={styles.input}
                value={expenseName}
                onChangeText={setExpenseName}
            />

            <TextInput
                placeholder="Descripción"
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />

            {renderDropdown('Concepto', concept, concepts, 'concept', setConcept)}

            {renderDropdown('Forma de pago', paymentWay, paymentWays, 'paymentWay', setPaymentWay)}

            {renderDropdown('Método de pago', paymentMethod, paymentMethods, 'paymentMethod', setPaymentMethod)}

            <TextInput
                placeholder="Concepto / Articulo"
                style={styles.input}
                value={article}
                onChangeText={setArticle}
            />

            <TextInput
                placeholder="Monto"
                style={styles.input}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            {renderDropdown('Tipo de comprobante', receiptType, receiptTypes, 'receiptType', setReceiptType)}

            <TextInput style={styles.receiptInput} />

                <View style={styles.bottomSection}>
                    <TouchableOpacity onPress={takePhoto}>
                        <MaterialIcons
                            name="add-a-photo"
                            size={60}
                            color="#438FC2"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() =>
                            router.push({
                                pathname: '/expenses',
                                params: {
                                    expenseName,
                                    description,
                                    concept,
                                    paymentWay,
                                    paymentMethod,
                                    article,
                                    amount,
                                    receiptType,
                                },
                            })
                        }
                    >
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

    dropdownButton: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: 12,
    },

    dropdownText: {
        fontSize: 22,
        color: '#111111',
    },

    dropdownList: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
    },

    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },

    dropdownItemText: {
        fontSize: 18,
        color: '#111111',
    },
    });