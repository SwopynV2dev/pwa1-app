import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

type ActiveScreen = 'services' | 'stations' | 'areas' | 'cut' | 'expenses' | 'menu';

export default function BottomMenu({ active }: { active: ActiveScreen }) {
    const items = [
        {
        key: 'services',
        label: 'Servicios',
        icon: 'bug-report',
        route: '/services',
        color: '#2094C9',
        background: '#E4F3FB',
        },
        {
        key: 'stations',
        label: 'Estaciones',
        icon: 'document-scanner',
        route: '/stations',
        color: '#222222',
        background: '#E5E5E5',
        },
        {
        key: 'areas',
        label: 'Áreas',
        icon: 'qr-code-scanner',
        route: '/areas',
        color: '#3D5A96',
        background: '#E7ECF8',
        },
        {
        key: 'cut',
        label: 'Corte',
        icon: 'content-cut',
        route: '/cut',
        color: '#70B8A7',
        background: '#E7F3EF',
        },
        {
        key: 'expenses',
        label: 'Gastos',
        icon: 'attach-money',
        route: '/expenses',
        color: '#F3C449',
        background: '#FFF4DA',
        },
        {
        key: 'menu',
        label: 'Menú',
        icon: 'home',
        route: '/menu',
        color: '#3D5A96',
        background: '#E7ECF8',
        },
    ];

    return (
        <View style={styles.bottomMenu}>
        {items.map((item) => {
            const isActive = active === item.key;

            return (
            <TouchableOpacity
                key={item.key}
                onPress={() => router.push(item.route as never)}
                style={[
                styles.menuItem,
                isActive && {
                    backgroundColor: item.background,
                    paddingHorizontal: 18,
                    borderRadius: 35,
                },
                ]}
            >
                <MaterialIcons
                    name={item.icon as any}
                    size={34}
                    color={isActive ? item.color : '#666666'}
                />

                {isActive && (
                <Text style={[styles.label, { color: item.color }]}>
                    {item.label}
                </Text>
                )}
            </TouchableOpacity>
            );
        })}
        </View>
    );
    }

    const styles = StyleSheet.create({
    bottomMenu: {
        height: 82,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },

    menuItem: {
        height: 58,
        minWidth: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        fontSize: 34,
        color: '#666666',
    },

    label: {
        fontSize: 20,
        marginLeft: 10,
    },
    });