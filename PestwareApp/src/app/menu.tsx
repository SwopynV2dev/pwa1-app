import {View,Text,StyleSheet,TouchableOpacity,} from 'react-native';
import { router } from 'expo-router';
import BottomMenu from './BottomMenu';
import { MaterialIcons } from '@expo/vector-icons';

export default function Menu() {
    const menuData = {
        title: 'Más Opciones',
        version: 'Versión 0.0.0',
        poweredBy: 'Powered by Swopyn ©2021',
        options: [
        { id: 1, icon: 'business-center', label: 'Mi Inventario' },
        { id: 2, icon: 'calendar-today', label: 'Mi Agenda' },
        { id: 3, icon: 'access-time', label: 'Reloj Checador' },
        { id: 4, icon: 'exit-to-app', label: 'Cerrar sesión' },
        ],
    };

    return (
    <View style={styles.container}>

        <View style={styles.mainContent}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{menuData.title}</Text>
            </View>

            <View style={styles.logoSection}>
                <View style={styles.logoBox}>
                    <Text style={styles.logoIcon}></Text>
                </View>

                <Text style={styles.logoText}>PestWare</Text>
                <Text style={styles.logoSmall}>App</Text>

                <Text style={styles.version}>{menuData.version}</Text>
                <Text style={styles.powered}>{menuData.poweredBy}</Text>
            </View>

            <View style={styles.optionsContainer}>
                {menuData.options.map((option) => (
                    <TouchableOpacity 
                        key={option.id} 
                        style={styles.optionRow}
                        onPress={() => {
                            switch (option.id) {
                                case 1:
                                    router.push('/inventory');
                                    break;
                                case 2:
                                    router.push('/agenda');
                                    break;
                                case 3:
                                    router.push('/attendance');
                                    break;
                                case 4:
                                    router.push('/login');
                                    break;
                            }
                        }}
                    >
                        <MaterialIcons
                            name={option.icon as any}
                            size={32}
                            color="#2094C9"
                            style={styles.optionIcon}
                        />

                        <Text style={styles.optionText}>{option.label}</Text>
                        
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={42}
                            color="#2094C9"
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        <BottomMenu active="menu" />
    </View>
);
}

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    mainContent: {
    flex: 1,
    },

    header: {
        height: 95,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },

    headerTitle: {
        fontSize: 24,
        color: '#222222',
        marginTop: 20,
    },

    logoSection: {
        alignItems: 'center',
        marginTop: 35,
    },

    logoBox: {
        width: 115,
        height: 115,
        borderRadius: 8,
        backgroundColor: '#2094C9',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoIcon: {
        fontSize: 55,
        color: '#FFFFFF',
    },

    logoText: {
        marginTop: 15,
        fontSize: 28,
        color: '#3D5A96',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },

    logoSmall: {
        fontSize: 14,
        color: '#3D5A96',
        fontWeight: 'bold',
        marginLeft: 80,
        marginTop: -5,
    },

    version: {
        marginTop: 25,
        fontSize: 22,
        color: '#3D5A96',
    },

    powered: {
        marginTop: 5,
        fontSize: 22,
        color: '#70B8A7',
    },

    optionsContainer: {
        marginTop: 55,
    },

    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 35,
        marginBottom: 45,
    },

    optionIcon: {
        width: 55,
        fontSize: 32,
        color: '#2094C9',
    },

    optionText: {
        flex: 1,
        fontSize: 25,
        color: '#222222',
    },

    optionArrow: {
        fontSize: 42,
        color: '#2094C9',
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
        backgroundColor: '#E7ECF8',
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 35,
    },

    activeIcon: {
        fontSize: 34,
        color: '#3D5A96',
        marginRight: 10,
    },

    activeText: {
        fontSize: 20,
        color: '#3D5A96',
    },
    });