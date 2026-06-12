import {View,Text,StyleSheet,TouchableOpacity,} from 'react-native';
import { router } from 'expo-router';
import BottomMenu from './BottomMenu';

export default function Expenses() {
    const expensesData = {
        title: 'Mis Gastos',
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{expensesData.title}</Text>
        </View>

        <View style={styles.content}>
            <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/add-expense')}
            >
            <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>

        <BottomMenu active="expenses" />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        height: 95,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },

    headerTitle: {
        fontSize: 24,
        color: '#222222',
        marginTop: 20,
    },

    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    addButton: {
        position: 'absolute',
        right: 35,
        bottom: 35,
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: '#438FC2',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },

    addButtonText: {
        fontSize: 42,
        color: '#000000',
        fontWeight: '300',
        marginTop: -4,
    },

    bottomMenu: {
        height: 82,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },

    menuIcon: {
        fontSize: 34,
        color: '#666666',
    },

    activeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF4DA',
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 35,
    },

    activeIcon: {
        fontSize: 34,
        color: '#F3C449',
        marginRight: 10,
    },

    activeText: {
        fontSize: 20,
        color: '#F3C449',
    },
    });