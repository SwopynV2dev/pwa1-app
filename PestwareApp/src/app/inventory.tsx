import {View,Text,StyleSheet,ScrollView,TouchableOpacity,} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Inventory() {
    const inventoryData = {
        title: 'Mi Inventario',
        products: [
        {
            id: 1,
            name: 'Scourge VPM EC 20%',
            quantity: '0 Unidades',
            amount: '0.0 Mililitros',
        },
        {
            id: 2,
            name: 'Lamina 925 Fumi',
            quantity: '7 Unidades',
            amount: '7.0 Unidads',
        },
        {
            id: 3,
            name: 'Lamina Pegamento 182B',
            quantity: '7 Unidades',
            amount: '7.0 Unidads',
        },
        {
            id: 4,
            name: 'Cipermetrina',
            quantity: '0 Unidades',
            amount: '0.0 Mililitros',
        },
        {
            id: 5,
            name: 'Rodilon Minibloque',
            quantity: '0 Unidades',
            amount: '0.0 Gramos',
        },
        {
            id: 6,
            name: 'Acido Borico',
            quantity: '1 Unidades',
            amount: '549.0 Gramos',
        },
        {
            id: 7,
            name: 'Gel Palmera',
            quantity: '0 Unidades',
            amount: '0.0 Gramos',
        },
        {
            id: 8,
            name: 'Net-Mosk® WP',
            quantity: '0 Unidades',
            amount: '0.0 Gramos',
        },
        ],
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/menu')}
                >
                <MaterialIcons name="arrow-back" size={40} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{inventoryData.title}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.grid}>
            {inventoryData.products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.card}>
                <Text style={styles.productName}>{product.name}</Text>

                <View style={styles.productInfo}>
                <Text style={styles.productText}>{product.quantity}</Text>
                <Text style={styles.productText}>{product.amount}</Text>
                </View>

                <View style={styles.cardBottomLine} />
            </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        height: 150,
        backgroundColor: '#2094C9',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 35,
    },

    backArrow: {
        color: '#FFFFFF',
        fontSize: 42,
        marginRight: 120,
    },

    headerTitle: {
        color: '#FFFFFF',
        fontSize: 34,
        fontWeight: '500',
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        paddingTop: 25,
        paddingBottom: 30,
        justifyContent: 'space-between',
    },

    card: {
        width: '48%',
        height: 165,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 22,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 5,
    },

    productName: {
        color: '#2094C9',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 18,
        paddingHorizontal: 8,
    },

    productInfo: {
        marginTop: 25,
        paddingHorizontal: 28,
    },

    productText: {
        fontSize: 17,
        color: '#222222',
        marginBottom: 20,
    },

    cardBottomLine: {
        position: 'absolute',
        bottom: 0,
        height: 12,
        width: '100%',
        backgroundColor: '#2094C9',
    },
    backButton: {
    marginRight: 15,
    },
    });