import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import BottomMenu from './BottomMenu';
import { useEffect, useState } from 'react';

export default function Expenses() {
    const params = useLocalSearchParams();

    const [expenses, setExpenses] = useState([
        {
            date: 'Sep 22',
            time: '01:28 pm',
            title: 'gasolina',
            description: 'gasolina del 22-09-20',
            paymentMethod: 'Efectivo',
            amount: '$950',
        },
    ]);

    useEffect(() => {
        if (params.expenseName) {
            setExpenses((prev) => [
                {
                    date: 'Jun 17',
                    time: '11:40 am',
                    title: String(params.expenseName),
                    description: String(params.description),
                    paymentMethod: String(params.paymentMethod),
                    amount: `$${params.amount}`,
                },
                ...prev,
            ]);
        }
    }, [params.expenseName]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mis Gastos</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
                {expenses.map((expense, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.expenseCard}
                        onPress={() =>
                            router.push({
                                pathname: '/expense-detail',
                                params: {
                                    expenseName: expense.title,
                                    description: expense.description,
                                    paymentMethod: expense.paymentMethod,
                                    amount: expense.amount.replace('$', ''),
                                    date: expense.date,
                                    time: expense.time,
                                },
                            })
                        }
                    >
                        <View style={styles.dateBox}>
                            <Text style={styles.date}>{expense.date}</Text>
                            <Text style={styles.time}>{expense.time}</Text>
                        </View>

                        <View style={styles.expenseInfo}>
                            <Text style={styles.expenseTitle}>{expense.title}</Text>
                            <Text style={styles.expenseDescription}>
                                {expense.description}
                            </Text>
                            <Text style={styles.paymentMethod}>
                                {expense.paymentMethod}
                            </Text>
                        </View>

                        <Text style={styles.amount}>{expense.amount}</Text>

                        <View style={styles.rightLine} />
                    </TouchableOpacity>
                ))}
            </ScrollView>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => router.push('/add-expense')}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            
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

    expenseCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        minHeight: 80,
    },

    dateBox: {
        width: 72,
        backgroundColor: '#0F6E31',
        justifyContent: 'center',
        alignItems: 'center',
    },

    date: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },

    time: {
        color: '#FFFFFF',
        fontSize: 12,
        marginTop: 5,
    },

    expenseInfo: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },

    expenseTitle: {
        fontSize: 15,
        color: '#222222',
        fontWeight: 'bold',
    },

    expenseDescription: {
        fontSize: 12,
        color: '#777777',
        marginTop: 4,
        fontStyle: 'italic',
    },

    paymentMethod: {
        fontSize: 12,
        color: '#438FC2',
        marginTop: 8,
    },

    amount: {
        alignSelf: 'center',
        marginRight: 15,
        fontSize: 13,
        color: '#222222',
        fontWeight: 'bold',
    },

    addButton: {
        position: 'absolute',
        right: 35,
        bottom: 125,
        width: 60,
        height: 60,
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

    rightLine: {
        width: 6,
        backgroundColor: '#0F6E31',
    },
});