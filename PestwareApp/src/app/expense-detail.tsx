import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function ExpenseDetail() {
    const params = useLocalSearchParams();

    const expense = {
        date: params.date || 'Sin fecha',
        time: params.time || 'Sin hora',
        folio: '#Gasto',
        code: 'OG-300',
        name: params.expenseName || 'Sin nombre',
        description: params.description || 'Sin descripción',
        concept: params.concept || 'Sin concepto',
        paymentWay: params.paymentWay || 'Sin forma de pago',
        paymentMethod: params.paymentMethod || 'Sin método de pago',
        article: params.article || 'Sin artículo',
        amount: params.amount ? `$${params.amount}` : '$0',
        receiptType: params.receiptType || 'Sin comprobante',
        paymentStatus: 'Sin pagar',
        captureStatus: 'Sin capturar',
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text
                    style={styles.close}
                    onPress={() => router.push('/expenses')}>×
                </Text>

                <Text style={styles.headerTitle}>Detalle del gasto</Text>
            </View>

            <View style={styles.topRow}>
                <View>
                    <Text style={styles.date}>{expense.date}</Text>
                    <Text style={styles.time}>{expense.time}</Text>
                </View>

                <View style={styles.folioBox}>
                    <Text style={styles.folio}>{expense.folio}</Text>
                    <Text style={styles.code}>{expense.code}</Text>
                </View>
            </View>

            <Text style={styles.name}>{expense.name}</Text>
            <Text style={styles.description}>{expense.description}</Text>
            <Text style={styles.concept}>{expense.concept}</Text>

            <View style={styles.infoRow}>
                <Text style={styles.infoText}>{expense.paymentMethod}</Text>
                <Text style={styles.amount}>{expense.amount}</Text>
            </View>

            <Text style={styles.receiptType}>{expense.receiptType}</Text>

            <Text style={styles.status}>{expense.paymentStatus}</Text>
            <Text style={styles.status}>{expense.captureStatus}</Text>

            <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadButtonText}>
                    Descargar comprobante
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
    },

    header: {
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
    },

    close: {
        fontSize: 39,
        color: '#2094C9',
        marginRight: 45,
    },

    headerTitle: {
        fontSize: 23,
        color: '#2094C9',
        fontWeight: 'bold',
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },

    date: {
        fontSize: 18,
        color: '#111111',
        fontWeight: '500',
    },

    time: {
        fontSize: 16,
        color: '#666666',
    },

    folioBox: {
        alignItems: 'flex-end',
    },

    folio: {
        fontSize: 18,
        color: '#111111',
        fontWeight: 'bold',
    },

    code: {
        fontSize: 17,
        color: '#666666',
    },

    name: {
        fontSize: 19,
        color: '#111111',
        fontWeight: 'bold',
        marginTop: 25,
    },

    description: {
        fontSize: 18,
        color: '#111111',
        fontStyle: 'italic',
        marginTop: 8,
    },

    concept: {
        fontSize: 15,
        color: '#111111',
        fontWeight: 'bold',
        marginTop: 15,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 55,
        marginTop: 22,
    },

    infoText: {
        fontSize: 18,
        color: '#2094C9',
    },

    amount: {
        fontSize: 18,
        color: '#2094C9',
    },

    receiptType: {
        textAlign: 'center',
        fontSize: 16,
        color: '#777777',
        marginTop: 12,
    },

    status: {
        fontSize: 16,
        color: '#2094C9',
        marginTop: 14,
    },

    downloadButton: {
        position: 'absolute',
        bottom: 70,
        alignSelf: 'center',
        backgroundColor: '#2094C9',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 35,
    },

    downloadButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
});