import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';

export default function QRScanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
        <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
            Se necesita acceso a la cámara
            </Text>

            <TouchableOpacity
            style={styles.button}
            onPress={requestPermission}
            >
            <Text style={styles.buttonText}>
                Permitir Cámara
            </Text>
            </TouchableOpacity>
        </View>
        );
    }

    const handleBarcodeScanned = ({ data }: any) => {
        if (scanned) return;

        setScanned(true);

        console.log('QR:', data);

        router.back();
    };

    return (
        <View style={styles.container}>
        <CameraView
            style={StyleSheet.absoluteFill}
            barcodeScannerSettings={{
            barcodeTypes: ['qr'],
            }}
            onBarcodeScanned={handleBarcodeScanned}
        />

        <View style={styles.overlay}>
            <View style={styles.scanBox} />
        </View>

        <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
        >
            <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    permissionText: {
        fontSize: 18,
        marginBottom: 20,
    },

    button: {
        backgroundColor: '#438FC2',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
    },

    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    scanBox: {
        width: 250,
        height: 250,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        borderRadius: 10,
    },

    closeButton: {
        position: 'absolute',
        top: 60,
        left: 25,
    },

    closeText: {
        color: '#FFFFFF',
        fontSize: 40,
    },
});