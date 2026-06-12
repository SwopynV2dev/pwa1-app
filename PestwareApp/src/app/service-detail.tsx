import {View,Text,StyleSheet,ScrollView,TouchableOpacity,} from 'react-native';
import { router } from 'expo-router';

export default function ServiceDetail() {

    const service = {
        date: 'Jun 03',
        hour: '08:00 am',
        serviceNumber: 'OS-7922-5',
        customer: 'Molinos San Miguel',
        contact: 'Osmari Cortez',
        phone: '3011565483',
        status: 'pending',
        address: 'Molinos San Miguel 00, Zona franca Tayrona',
        city: 'Magdalena, Santa Marta',
        serviceType: 'DCO',
        plagues: 'Rata Alcantarilla, Rata de tejado, Ratones, Serpientes',
        diseases: '',
        pets: '',
        comments:
        'Servicio de Desratización y control de ofidios más revisión de lámparas UV.\n\nDesratización una vez por semana.\n\nLimpieza y cambio de láminas lámparas UV una vez por semana.\n\nControl de Ofidio cada 15 días dos veces al mes.',
        agent: 'Elsa Bolaños',
    };

    return (
        <View style={styles.container}>
        <ScrollView>

            <View style={styles.header}>
            <Text style={styles.close} onPress={() => router.push('/services')}>✕</Text>

            <Text style={styles.headerTitle}>
                Detalle del servicio
            </Text>
            </View>

            <View style={styles.topInfo}>
            <View>
                <Text style={styles.date}>{service.date}</Text>
                <Text style={styles.hour}>{service.hour}</Text>
            </View>

            <View style={styles.serviceNumberContainer}>
                <Text style={styles.serviceLabel}># Servicio</Text>
                <Text style={styles.serviceNumber}>
                {service.serviceNumber}
                </Text>
            </View>
            </View>

            <View style={styles.section}>
            <Text style={styles.customer}>
                {service.customer}
            </Text>

            <Text style={styles.contact}>
                {service.contact}
            </Text>
            </View>

            <View style={styles.section}>
            <Text style={styles.phone}>
                {service.phone}
            </Text>

            <Text style={styles.address}>
                {service.address}
            </Text>

            <Text style={styles.city}>
                {service.city}
            </Text>
            </View>

            <View style={styles.centerSection}>
            <Text style={styles.serviceType}>
                {service.serviceType}
            </Text>
            </View>

            <View style={styles.section}>
            <Text style={styles.plagues}>
                {service.plagues}
            </Text>
            </View>

            <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                Condiciones de quienes habitan
            </Text>

            <Text style={styles.normalText}>
                Enfermedades:
            </Text>

            <Text style={styles.normalText}>
                Mascotas:
            </Text>
            </View>

            <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                Comentarios
            </Text>

            <Text style={styles.comments}>
                {service.comments}
            </Text>
            </View>

            <View style={styles.agentContainer}>
            <Text style={styles.agentLabel}>
                Agente:
            </Text>

            <Text style={styles.agent}>
                {service.agent}
            </Text>
            </View>

        </ScrollView>

        <View style={styles.bottomButtons}>
            {service.status === 'completed' ? (
                <>
                <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>ORDEN DE SERV.</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>CERTIFICADO</Text>
                </TouchableOpacity>
                </>
            ) : (
                <>
                <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => router.push('/services')}>
                    <Text style={styles.secondaryButtonText}>NO SE REALIZÓ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.push('/service-form')}
                >
                    <Text style={styles.primaryButtonText}>COMENZAR</Text>
                </TouchableOpacity>
                </>
            )}
            </View>
        </View>
    );
    }

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },

    header: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    close: {
        fontSize: 28,
        color: '#2196C9',
    },

    headerTitle: {
        flex: 1,
        textAlign: 'center',
        color: '#2196C9',
        fontSize: 22,
        fontWeight: '600',
        marginRight: 30,
    },

    topInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        paddingHorizontal: 25,
    },

    date: {
        fontSize: 24,
        fontWeight: '600',
    },

    hour: {
        fontSize: 18,
    },

    serviceNumberContainer: {
        alignItems: 'flex-end',
    },

    serviceLabel: {
        fontSize: 20,
        fontWeight: '600',
    },

    serviceNumber: {
        fontSize: 18,
        color: '#444',
    },

    section: {
        marginTop: 25,
        paddingHorizontal: 25,
    },

    customer: {
        fontSize: 28,
        fontWeight: '600',
    },

    contact: {
        fontSize: 22,
        marginTop: 10,
    },

    phone: {
        fontSize: 20,
        color: '#4459A8',
        marginBottom: 10,
    },

    address: {
        fontSize: 20,
        color: '#4459A8',
    },

    city: {
        marginTop: 10,
        marginLeft: 30,
        fontSize: 18,
        color: '#444',
    },

    centerSection: {
        alignItems: 'center',
        marginTop: 30,
    },

    serviceType: {
        fontSize: 30,
        fontWeight: '500',
    },

    plagues: {
        textAlign: 'center',
        fontSize: 18,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15,
    },

    normalText: {
        fontSize: 18,
    },

    comments: {
        fontSize: 18,
        lineHeight: 28,
    },

    agentContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        marginBottom: 30,
        paddingHorizontal: 25,
    },

    agentLabel: {
        fontSize: 18,
    },

    agent: {
        fontSize: 18,
        color: '#4459A8',
        marginLeft: 5,
        fontWeight: '600',
    },

    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: '#F8F8F8',
    },

    secondaryButton: {
        borderWidth: 1,
        borderColor: '#D0D0D0',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },

    secondaryButtonText: {
        color: '#2196C9',
        fontWeight: 'bold',
        fontSize: 16,
    },

    primaryButton: {
        backgroundColor: '#2196C9',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },

    primaryButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    });