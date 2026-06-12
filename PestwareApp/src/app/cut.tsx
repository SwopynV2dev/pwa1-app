import {View,Text,StyleSheet,TouchableOpacity,} from 'react-native';
import BottomMenu from './BottomMenu';

export default function Corte() {
    const corteData = {
        headerTitle: 'Realizar Corte',
        title: 'Mi Corte de Servicios',
        buttonText: 'REALIZAR CORTE',
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
            {corteData.headerTitle}
            </Text>
        </View>

        <View style={styles.content}>
            <Text style={styles.title}>
            {corteData.title}
            </Text>

            <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>
                {corteData.buttonText}
            </Text>
            </TouchableOpacity>
        </View>

        <BottomMenu active="cut" />
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
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: {
        width: 0,
        height: 2,
        },
    },

    headerTitle: {
        fontSize: 24,
        color: '#222222',
        marginTop: 20,
    },

    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 35,
    },

    title: {
        fontSize: 32,
        color: '#438FC2',
        marginTop: 40,
        letterSpacing: 1,
    },

    mainButton: {
        backgroundColor: '#438FC2',
        width: '100%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 470,
        elevation: 4,
    },

    mainButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 3,
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
        backgroundColor: '#E7F3EF',
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 35,
    },

    activeIcon: {
        fontSize: 34,
        color: '#70B8A7',
        marginRight: 10,
    },

    activeText: {
        fontSize: 20,
        color: '#70B8A7',
    },
    });