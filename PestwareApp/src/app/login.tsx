import { useState } from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,ActivityIndicator,} from 'react-native';
import { router } from 'expo-router';
import { login } from '../api/authService';

    export default function Login() {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        const handleLogin = async () => {
            if (!username.trim() || !password.trim()) {
                Alert.alert(
                    'Datos incompletos',
                    'Ingresa tu correo electrónico y contraseña.'
                );
                return;
            }

            try {
                setIsLoading(true);

                const response = await login({
                    Username: username.trim(),
                    Password: password,
                });

                if (response.loginCode !== 1) {
                    Alert.alert(
                        'Inicio de sesión incorrecto',
                        'No se pudo iniciar sesión con los datos proporcionados.'
                    );
                    return;
                }

                console.log('Login correcto:', response);

                router.replace('/services');
            } catch (error) {
                console.error('Error al iniciar sesión:', error);

                Alert.alert(
                    'Error de conexión',
                    'No fue posible iniciar sesión. Verifica tu conexión y vuelve a intentarlo.'
                );
            } finally {
                setIsLoading(false);
            }
        };
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.logoCircle}>
            <Text style={styles.bugIcon}></Text>
            <Text style={styles.logoText}>PestWare</Text>
            <Text style={styles.logoSmall}>App</Text>
            </View>
        </View>

        <View style={styles.card}>
            <Text style={styles.title}>¡Bienvenido!</Text>

            <TextInput
                placeholder="Correo electrónico"
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
            />

            <TextInput
                placeholder="Contraseña"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
            />

            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>

            <TouchableOpacity
                style={[
                    styles.loginButton,
                    isLoading && styles.loginButtonDisabled,
                ]}
                onPress={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.loginButtonText}>
                        › INICIAR SESIÓN
                    </Text>
                )}
            </TouchableOpacity>
        </View>

        <Text style={styles.newUserText}>¿Eres nuevo en PestWare App?</Text>

        <TouchableOpacity style={styles.freeButton}>
            <Text style={styles.freeButtonText}>  COMIENZA GRATIS</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    header: {
        height: 235,
        backgroundColor: '#288FC9',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoCircle: {
        width: 145,
        height: 145,
        borderRadius: 80,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bugIcon: {
        fontSize: 42,
        color: '#3D5A96',
        marginBottom: 2,
    },

    logoText: {
        fontSize: 21,
        color: '#3D5A96',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },

    logoSmall: {
        fontSize: 13,
        color: '#3D5A96',
        fontWeight: 'bold',
        marginLeft: 55,
        marginTop: -5,
    },

    card: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 18,
        marginTop: 28,
        borderRadius: 5,
        paddingHorizontal: 18,
        paddingTop: 35,
        paddingBottom: 55,
        elevation: 7,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },

    title: {
        fontSize: 34,
        textAlign: 'center',
        color: '#3D5A96',
        marginBottom: 25,
    },

    input: {
        borderWidth: 1.3,
        borderColor: '#999999',
        borderRadius: 5,
        paddingVertical: 13,
        paddingHorizontal: 14,
        marginTop: 18,
        fontSize: 18,
        color: '#3D5A96',
        backgroundColor: '#FFFFFF',
    },

    forgotPassword: {
        color: '#3AB7A3',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 15,
    },

    loginButton: {
        backgroundColor: '#2497CA',
        marginTop: 42,
        alignSelf: 'center',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 5,
        elevation: 4,
    },

    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2,
    },

    newUserText: {
        textAlign: 'center',
        color: '#3D5A96',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 25,
    },

    freeButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DADADA',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 22,
        alignSelf: 'center',
        marginTop: 25,
    },

    freeButtonText: {
        color: '#2196C9',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2,
    },

    loginButtonDisabled: {
        opacity: 0.7,
    },
    });