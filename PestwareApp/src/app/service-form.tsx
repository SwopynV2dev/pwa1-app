import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Modal, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function ServiceForm() {
    const serviceId = 1;

const serviceFormData = {
    serviceNumber: `OS-8299-${serviceId}`,
    startTime: new Date().toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }),
    endTime: '00:00 --',
    sections: [
        { id: 1, title: 'Inspección del lugar', icon: 'find-in-page' },
        { id: 2, title: 'Condiciones del lugar', icon: 'house' },
        { id: 3, title: 'Control de plagas', icon: 'bug-report' },
        { id: 4, title: 'Pago del servicio', icon: 'credit-card' },
        { id: 5, title: 'Firma del cliente', icon: 'edit' },
    ],
};
    //Inspeccion del lugar
    const [openSections, setOpenSections] = useState<number[]>([]);
    const [completedSections, setCompletedSections] = useState<number[]>([]);
    const [selectedPlagues, setSelectedPlagues] = useState<string[]>([]);
    const [selectedArea, setSelectedArea] = useState('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [showPlagueOptions, setShowPlagueOptions] = useState(false);
    const [showAreaOptions, setShowAreaOptions] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);
    //Condiciones del lugar
    const [selectedCleanAreas, setSelectedCleanAreas] = useState<string[]>([]);
    const [conditionPhotos, setConditionPhotos] = useState<string[]>([]);
    const [showCleanAreaOptions, setShowCleanAreaOptions] = useState(false);
    const [showConditionPhotos, setShowConditionPhotos] = useState(false);
    const [showIndicationsOptions, setShowIndicationsOptions] = useState(false);
    const [indications, setIndications] = useState('Si');

    const cleanAreaOptions = ['Sala', 'Cocina', 'Recámara', 'Baño', 'Cochera', 'Patio'];

    //Inspeccion del lugar
    const plagueOptions = ['Cucaracha', 'Hormiga', 'Rata', 'Mosquito', 'Araña', 'Termita'];
    const areaOptions = ['Sala', 'Cocina', 'Recámara', 'Cochera', 'Patio'];

    //Control de plagas
    const [selectedControlArea, setSelectedControlArea] = useState('');
    const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
    const [selectedPesticide, setSelectedPesticide] = useState('');
    const [controlPhotos, setControlPhotos] = useState<string[]>([]);

    const [showControlAreas, setShowControlAreas] = useState(false);
    const [showMethods, setShowMethods] = useState(false);
    const [showPesticides, setShowPesticides] = useState(false);
    const [showControlPhotos, setShowControlPhotos] = useState(false);

    const controlAreaOptions = ['Sala', 'Cocina', 'Recámara', 'Cochera', 'Patio'];
    const methodOptions = ['Rociado', 'Polvos', 'Untado', 'Gel', 'Cebadero', 'Trampa'];
    const pesticideOptions = ['Cipermetrina','Ácido Bórico','Gel Palmera','Rodilon Minibloque','Net-Mosk WP','Scourge VPM EC 20%',];

    //Pago del servicio
    const [paymentMethod, setPaymentMethod] = useState('Efectivo');
    const [paymentType, setPaymentType] = useState('Contado');
    const [showPaymentMethods, setShowPaymentMethods] = useState(false);
    const [showPaymentTypes, setShowPaymentTypes] = useState(false);
    const [clientDidNotPay, setClientDidNotPay] = useState(false);

    const paymentMethodOptions = ['Efectivo', 'Transferencia', 'Cheque'];
    const paymentTypeOptions = ['Contado', 'A meses'];

    //Firma
    const [clientPhotos, setClientPhotos] = useState<string[]>([]);
    const [showClientPhotos, setShowClientPhotos] = useState(false);

    //Condiciones del lugar
    const togglePlague = (plague: string) => {
    if (selectedPlagues.includes(plague)) {
        setSelectedPlagues(selectedPlagues.filter((item) => item !== plague));
    } else {
        setSelectedPlagues([...selectedPlagues, plague]);
    }
    };

    const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
        alert('Se necesita permiso para usar la cámara');
        return;
    }
    const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
    });
    if (!result.canceled) {
        setPhotos([...photos, result.assets[0].uri]);
    }
    };

    //Inspeccion del lugar
    const toggleCleanArea = (area: string) => {
    if (selectedCleanAreas.includes(area)) {
        setSelectedCleanAreas(selectedCleanAreas.filter((item) => item !== area));
    } else {
        setSelectedCleanAreas([...selectedCleanAreas, area]);
    }
    };

    const takeConditionPhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
        alert('Se necesita permiso para usar la cámara');
        return;
    }
    const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
    });
    if (!result.canceled) {
        setConditionPhotos([...conditionPhotos, result.assets[0].uri]);
    }
    };

    //Condiciones del lugar
    const toggleMethod = (method: string) => {
    if (selectedMethods.includes(method)) {
        setSelectedMethods(selectedMethods.filter((item) => item !== method));
    } else {
        setSelectedMethods([...selectedMethods, method]);
    }
    };
    const takeControlPhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
        alert('Se necesita permiso para usar la cámara');
        return;
    }
    const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
    });
    if (!result.canceled) {
        setControlPhotos([...controlPhotos, result.assets[0].uri]);
    }
    };
    const addNewArea = () => {
    Alert.prompt(
        'Nueva área',
        'Escribe el nombre del área',
        (text) => {
        if (text.trim() !== '') {
            setSelectedControlArea(text);
        }
        }
    );
    };

    //Firma
    const takeClientPhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            alert('Se necesita permiso para usar la cámara');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.7,
        });

        if (!result.canceled) {
            setClientPhotos([
            ...clientPhotos,
            result.assets[0].uri,
            ]);
        }
    };

    const toggleSection = (id: number) => {
        if (openSections.includes(id)) {
            setOpenSections(
            openSections.filter(sectionId => sectionId !== id)
            );
        } else {
            setOpenSections([...openSections, id]);
        }
    };

    const isFormCompleted = completedSections.length === serviceFormData.sections.length;

    return (
        <View style={styles.container}>
        <View style={styles.topInfo}>
            <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={40} color="#438FC2" />
            </TouchableOpacity>

            <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}># Servicio</Text>
            <Text style={styles.infoText}>{serviceFormData.serviceNumber}</Text>
            </View>

            <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Hora Inicio</Text>
            <Text style={styles.infoText}>{serviceFormData.startTime}</Text>
            </View>

            <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>Hora Fin</Text>
            <Text style={styles.infoText}>{serviceFormData.endTime}</Text>
            </View>
        </View>

        <ScrollView style={styles.content}>
            {serviceFormData.sections.map((section) => {
            const isOpen = openSections.includes(section.id);

            return (
            <View key={section.id} style={styles.sectionWrapper}>
                <TouchableOpacity
                style={styles.sectionCard}
                onPress={() => toggleSection(section.id)}
                >
                <MaterialIcons
                    name={section.icon as any}
                    size={42}
                    color="#2094C9"
                />

                <Text style={styles.sectionTitle}>{section.title}</Text>

                <MaterialIcons
                    name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={38}
                    color="#2094C9"
                />
                </TouchableOpacity>

                {isOpen && section.id === 1 && (
                        <View style={styles.formContainer}>
                            <View style={styles.formTopRow}>
                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() => setShowPlagueOptions(!showPlagueOptions)}
                            >
                                <MaterialIcons name="bug-report" size={28} color="#FFFFFF" />
                                <Text style={styles.selectButtonText}>Seleccionar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.photoButton} onPress={() => setShowPhotos(true)}>
                                <Text style={styles.photoButtonText}>Ver Fotos</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={takePhoto}>
                                <MaterialIcons name="add-a-photo" size={50} color="#2094C9" />
                            </TouchableOpacity>
                            </View>

                            {showPlagueOptions && (
                            <View style={styles.optionsBox}>
                                {plagueOptions.map((plague) => (
                                <TouchableOpacity
                                    key={plague}
                                    style={styles.optionItem}
                                    onPress={() => togglePlague(plague)}
                                >
                                    <Text style={styles.optionItemText}>
                                    {selectedPlagues.includes(plague) ? '✓ ' : ''}
                                    {plague}
                                    </Text>
                                </TouchableOpacity>
                                ))}
                            </View>
                            )}

                            <Text style={styles.label}>Plagas seleccionadas:</Text>

                            <TextInput
                            style={styles.textArea}
                            value={selectedPlagues.join(', ')}
                            editable={false}
                            />

                            <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowAreaOptions(!showAreaOptions)}
                            >
                            <Text style={styles.inputText}>
                                {selectedArea || 'Áreas de anidamiento'}
                            </Text>
                            </TouchableOpacity>

                            {showAreaOptions && (
                            <View style={styles.optionsBox}>
                                {areaOptions.map((area) => (
                                <TouchableOpacity
                                    key={area}
                                    style={styles.optionItem}
                                    onPress={() => {
                                    setSelectedArea(area);
                                    setShowAreaOptions(false);
                                    }}
                                >
                                    <Text style={styles.optionItemText}>{area}</Text>
                                </TouchableOpacity>
                                ))}
                            </View>
                            )}

                            <TextInput
                            placeholder="Comentarios"
                            placeholderTextColor="#3D5A96"
                            style={styles.input}
                            />

                            <TouchableOpacity
                            style={styles.saveSectionButton}
                            onPress={() => {
                                if (!completedSections.includes(section.id)) {
                                setCompletedSections([...completedSections, section.id]);
                                }

                                alert('Sección guardada exitosamente')
                            }}
                            >
                            <Text style={styles.saveSectionText}>GUARDAR</Text>
                            </TouchableOpacity>

                            <Modal visible={showPhotos} transparent animationType="slide">
                            <View style={styles.modalBackground}>
                                <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Fotos tomadas</Text>

                                {photos.length === 0 ? (
                                    <Text>No hay fotos todavía</Text>
                                ) : (
                                    photos.map((photo, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: photo }}
                                        style={styles.photoPreview}
                                    />
                                    ))
                                )}

                                <TouchableOpacity
                                    style={styles.closeModalButton}
                                    onPress={() => setShowPhotos(false)}
                                >
                                    <Text style={styles.closeModalText}>Cerrar</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                            </Modal>
                        </View>
                    )}
                {isOpen && section.id === 2 && (
                    <View style={styles.formContainer}>
                        <View style={styles.formTopRow}>
                        <TouchableOpacity
                            style={styles.selectButton}
                            onPress={() => setShowCleanAreaOptions(!showCleanAreaOptions)}
                        >
                            <MaterialIcons name="format-list-bulleted" size={28} color="#FFFFFF" />
                            <Text style={styles.selectButtonText}>Seleccionar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.photoButton}
                            onPress={() => setShowConditionPhotos(true)}
                        >
                            <Text style={styles.photoButtonText}>Ver Fotos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={takeConditionPhoto}>
                            <MaterialIcons name="add-a-photo" size={50} color="#2094C9" />
                        </TouchableOpacity>
                        </View>

                        {showCleanAreaOptions && (
                        <View style={styles.optionsBox}>
                            {cleanAreaOptions.map((area) => (
                            <TouchableOpacity
                                key={area}
                                style={styles.optionItem}
                                onPress={() => toggleCleanArea(area)}
                            >
                                <Text style={styles.optionItemText}>
                                {selectedCleanAreas.includes(area) ? '✓ ' : ''}
                                {area}
                                </Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                        )}

                        <Text style={styles.label}>Orden y limpieza seleccionados:</Text>

                        <TextInput
                        style={styles.textArea}
                        value={selectedCleanAreas.join(', ')}
                        editable={false}
                        />

                        <TextInput
                        placeholder="Accesos restringidos"
                        placeholderTextColor="#3D5A96"
                        style={styles.input}
                        />

                        <TextInput
                        placeholder="Comentarios"
                        placeholderTextColor="#3D5A96"
                        style={styles.input}
                        />

                        <Text style={styles.label}>Cumplió indicaciones:</Text>

                        <TouchableOpacity
                        style={styles.optionRow}
                        onPress={() => setShowIndicationsOptions(!showIndicationsOptions)}
                        >
                        <Text style={styles.optionValue}>{indications}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={26} color="#666" />
                        </TouchableOpacity>

                        {showIndicationsOptions && (
                        <View style={styles.optionsBox}>
                            {['Si', 'No'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={styles.optionItem}
                                onPress={() => {
                                setIndications(option);
                                setShowIndicationsOptions(false);
                                }}
                            >
                                <Text style={styles.optionItemText}>{option}</Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                        )}

                        <TouchableOpacity
                        style={styles.saveSectionButton}
                        onPress={() => {
                            if (!completedSections.includes(section.id)) {
                            setCompletedSections([...completedSections, section.id]);
                            }

                            alert('Condiciones del lugar guardadas');
                        }}
                        >
                        <MaterialIcons name="keyboard-arrow-down" size={28} color="#2094C9" />
                        <Text style={styles.saveSectionText}>GUARDAR</Text>
                        </TouchableOpacity>

                        <Modal visible={showConditionPhotos} transparent animationType="slide">
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Fotos tomadas</Text>

                            {conditionPhotos.length === 0 ? (
                                <Text>No hay fotos todavía</Text>
                            ) : (
                                conditionPhotos.map((photo, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: photo }}
                                    style={styles.photoPreview}
                                />
                                ))
                            )}

                            <TouchableOpacity
                                style={styles.closeModalButton}
                                onPress={() => setShowConditionPhotos(false)}
                            >
                                <Text style={styles.closeModalText}>Cerrar</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        </Modal>
                    </View>
                    )}
                {isOpen && section.id === 3 && (
                    <View style={styles.formContainer}>
                        <View style={styles.formTopRow}>
                        <TouchableOpacity
                            style={styles.photoButton}
                            onPress={() => setShowControlAreas(!showControlAreas)}
                        >
                            <Text style={styles.photoButtonText}>Ver Áreas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.photoButton}
                            onPress={() => setShowControlPhotos(true)}
                        >
                            <Text style={styles.photoButtonText}>Ver Fotos</Text>
                        </TouchableOpacity>

                        <View style={styles.iconsContainer}>
                            <TouchableOpacity onPress={() => router.push('/qr-scanner')}>
                            <MaterialIcons
                                name="qr-code-scanner"
                                size={43}
                                color="#2094C9"
                                style={styles.qrIcon}
                            />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={takeControlPhoto}>
                            <MaterialIcons name="add-a-photo" size={43} color="#2094C9" />
                            </TouchableOpacity>
                        </View>
                        </View>

                        {showControlAreas && (
                        <View style={styles.optionsBox}>
                            {controlAreaOptions.map((area) => (
                            <TouchableOpacity
                                key={area}
                                style={styles.optionItem}
                                onPress={() => {
                                setSelectedControlArea(area);
                                setShowControlAreas(false);
                                }}
                            >
                                <Text style={styles.optionItemText}>{area}</Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                        )}

                        <TextInput
                        placeholder="Área a controlar"
                        placeholderTextColor="#3D5A96"
                        style={styles.input}
                        value={selectedControlArea}
                        editable={false}
                        />

                        <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => setShowMethods(!showMethods)}
                        >
                        <MaterialIcons name="format-list-bulleted" size={24} color="#FFFFFF" />
                        <Text style={styles.selectButtonText}>Seleccionar</Text>
                        </TouchableOpacity>

                        {showMethods && (
                        <View style={styles.optionsBox}>
                            {methodOptions.map((method) => (
                            <TouchableOpacity
                                key={method}
                                style={styles.optionItem}
                                onPress={() => toggleMethod(method)}
                            >
                                <Text style={styles.optionItemText}>
                                {selectedMethods.includes(method) ? '✓ ' : ''}
                                {method}
                                </Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                        )}

                        <Text style={styles.label}>Método de aplicación seleccionados:</Text>

                        <TextInput
                        style={styles.textArea}
                        value={selectedMethods.join(', ')}
                        editable={false}
                        />

                        <Text style={styles.label}>Plaguicida aplicado:</Text>

                        <TouchableOpacity
                        style={styles.pesticideRow}
                        onPress={() => setShowPesticides(!showPesticides)}
                        >
                        <Text style={styles.pesticideText}>
                            {selectedPesticide || 'Seleccione el plaguicida utilizado:'}
                        </Text>

                        <MaterialIcons name="keyboard-arrow-down" size={28} color="#666" />
                        </TouchableOpacity>

                        {showPesticides && (
                        <View style={styles.optionsBox}>
                            {pesticideOptions.map((pesticide) => (
                            <TouchableOpacity
                                key={pesticide}
                                style={styles.optionItem}
                                onPress={() => {
                                setSelectedPesticide(pesticide);
                                setShowPesticides(false);
                                }}
                            >
                                <Text style={styles.optionItemText}>{pesticide}</Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                        )}

                        <TextInput
                        placeholder="Comentarios"
                        placeholderTextColor="#3D5A96"
                        style={styles.input}
                        />

                        <View style={styles.bottomFormButtons}>
                        <TouchableOpacity style={styles.newAreaButton} onPress={addNewArea}>
                            <MaterialIcons name="add" size={26} color="#999999" />
                            <Text style={styles.newAreaText}>NUEVA AREA</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveSectionButton}
                            onPress={() => {
                            if (!completedSections.includes(section.id)) {
                                setCompletedSections([...completedSections, section.id]);
                            }

                            alert('Control de plagas guardado');
                            }}
                        >
                            <MaterialIcons name="keyboard-arrow-down" size={28} color="#2094C9" />
                            <Text style={styles.saveSectionText}>GUARDAR</Text>
                        </TouchableOpacity>
                        </View>

                        <Modal visible={showControlPhotos} transparent animationType="slide">
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Fotos tomadas</Text>

                            {controlPhotos.length === 0 ? (
                                <Text>No hay fotos todavía</Text>
                            ) : (
                                controlPhotos.map((photo, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: photo }}
                                    style={styles.photoPreview}
                                />
                                ))
                            )}

                            <TouchableOpacity
                                style={styles.closeModalButton}
                                onPress={() => setShowControlPhotos(false)}
                            >
                                <Text style={styles.closeModalText}>Cerrar</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        </Modal>
                    </View>
                    )}
                {isOpen && section.id === 4 && (
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Importe a cobrar:</Text>

                        <Text style={styles.label}>Método de pago:</Text>

                        <TouchableOpacity
                        style={styles.selectRow}
                        onPress={() => setShowPaymentMethods(!showPaymentMethods)}
                        >
                        <Text style={styles.selectValue}>{paymentMethod}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={26} color="#666" />
                        </TouchableOpacity>

                        {showPaymentMethods && (
                        <View style={styles.optionsBox}>
                            {paymentMethodOptions.map((method) => (
                            <TouchableOpacity
                                key={method}
                                style={styles.optionItem}
                                onPress={() => {
                                setPaymentMethod(method);
                                setShowPaymentMethods(false);
                                }}
                            >
                                <Text style={styles.optionItemText}>{method}</Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                        )}

                        <Text style={styles.label}>Tipo de pago:</Text>

                        <TouchableOpacity
                        style={styles.selectRow}
                        onPress={() => setShowPaymentTypes(!showPaymentTypes)}
                        >
                        <Text style={styles.selectValue}>{paymentType}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={26} color="#666" />
                        </TouchableOpacity>

                        {showPaymentTypes && (
                        <View style={styles.optionsBox}>
                            {paymentTypeOptions.map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={styles.optionItem}
                                onPress={() => {
                                setPaymentType(type);
                                setShowPaymentTypes(false);
                                }}
                            >
                                <Text style={styles.optionItemText}>{type}</Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                        )}

                        <TextInput
                        placeholder="Importe recibido"
                        placeholderTextColor="#3D5A96"
                        style={styles.input}
                        keyboardType="numeric"
                        />

                        <TextInput
                        placeholder="Comentarios"
                        placeholderTextColor="#3D5A96"
                        style={styles.input}
                        />

                        <View style={styles.paymentBottomRow}>
                        <TouchableOpacity
                            style={styles.checkboxRow}
                            onPress={() => setClientDidNotPay(!clientDidNotPay)}
                        >
                            <View style={styles.checkbox}>
                            {clientDidNotPay && (
                                <MaterialIcons name="check" size={16} color="#2094C9" />
                            )}
                            </View>

                            <Text style={styles.checkboxText}>El cliente no pago</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveSectionButton}
                            onPress={() => {
                            if (!completedSections.includes(section.id)) {
                                setCompletedSections([...completedSections, section.id]);
                            }

                            alert('Pago del servicio guardado');
                            }}
                        >
                            <MaterialIcons name="keyboard-arrow-down" size={28} color="#2094C9" />
                            <Text style={styles.saveSectionText}>GUARDAR</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    )}
                    {isOpen && section.id === 5 && (
                        <View style={styles.formContainer}>

                            <TouchableOpacity onPress={takeClientPhoto}>
                                <MaterialIcons
                                    name="add-a-photo"
                                    size={50}
                                    color="#2094C9"
                                />
                            </TouchableOpacity>

                            <View style={styles.noticeBox}>
                            <Text style={styles.noticeText}>
                                Firmo de conformidad de haber recibido el Servicio de
                                Fumigación, acepto que se me explicaron las indicaciones
                                que debo realizar antes de ingresar al lugar fumigado y
                                conozco los términos y funcionamiento de la Garantía del
                                Servicio.
                            </Text>
                            </View>

                            <View style={styles.signatureArea} />

                            <View style={styles.clientRow}>
                            <MaterialIcons
                                name="edit"
                                size={28}
                                color="#2094C9"
                            />

                            <Text style={styles.clientName}>
                                Estinorte - Oficina Bomba Zuka
                            </Text>
                            </View>

                            <TextInput
                            placeholder="Nombre de quien firma o recibe (opcional)"
                            placeholderTextColor="#888888"
                            style={styles.input}
                            />

                            <Text style={styles.signatureDate}>
                            Magdalena, Santa Marta 12/06/2026
                            </Text>

                            <TouchableOpacity
                            style={styles.saveSectionButton}
                            onPress={() => {
                                if (!completedSections.includes(section.id)) {
                                setCompletedSections([
                                    ...completedSections,
                                    section.id,
                                ]);
                                }
                                alert('Firma del cliente guardada')
                            }}
                            >
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={28}
                                color="#2094C9"
                            />

                            <Text style={styles.saveSectionText}>
                                GUARDAR
                            </Text>
                            </TouchableOpacity>

                        </View>
                        )}
                </View>
            );
        })}
    </ScrollView>

        <View style={styles.bottomButtons}>
            <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/service-detail')}
            >
            <Text style={styles.backButtonLabel}>Regresar</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[
                styles.finishButton,
                !isFormCompleted && styles.finishButtonDisabled,
            ]}
            disabled={!isFormCompleted}
            >
            <Text
                style={[
                styles.finishButtonText,
                !isFormCompleted && styles.finishButtonTextDisabled,
                ]}
                onPress={() => router.push('/service-detail')}
            >
                Finalizar Servicio
            </Text>
            </TouchableOpacity>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9EEF1',
    },

    topInfo: {
        height: 120,
        backgroundColor: '#E9EEF1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 25,
        paddingHorizontal: 15,
    },

    backArrow: {
        fontSize: 38,
        color: '#2094C9',
    },

    infoBlock: {
        alignItems: 'center',
    },

    infoTitle: {
        fontSize: 22,
        color: '#222222',
        fontWeight: '600',
    },

    infoText: {
        fontSize: 18,
        color: '#333333',
        marginTop: 3,
    },

    content: {
        flex: 1,
        paddingTop: 25,
    },

    sectionCard: {
        height: 72,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 3,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
    },

    sectionTitle: {
        flex: 1,
        fontSize: 21,
        color: '#222222',
        marginLeft: 25,
    },

    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 55,
        paddingHorizontal: 25,
    },

    backButton: {
        backgroundColor: '#5BC0AA',
        width: 150,
        height: 58,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },

    backButtonText: {
        color: '#FFFFFF',
        fontSize: 45,
        marginRight: 10,
    },

    backButtonLabel: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: 1,
    },

    finishButton: {
        backgroundColor: '#2094C9',
        width: 210,
        height: 58,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },

    finishButtonDisabled: {
        backgroundColor: '#D0D3D5',
    },

    finishButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        letterSpacing: 1,
    },

    finishButtonTextDisabled: {
        color: '#8A8A8A',
    },
    sectionWrapper: {
    marginBottom: 15,
    },

    formContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: -15,
    marginBottom: 15,
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 25,
    elevation: 3,
    },

    formTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    },

    selectButton: {
    backgroundColor: '#5BC0AA',
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    },

    selectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    letterSpacing: 3,
    marginLeft: 10,
    },

    photoButton: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    },

    photoButtonText: {
    color: '#2094C9',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    },

    label: {
    fontSize: 17,
    color: '#3D5A96',
    marginBottom: 10,
    },

    textArea: {
    height: 70,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
    },

    input: {
    height: 65,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#3D5A96',
    },

    saveSectionButton: {
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    },

    saveSectionText: {
    color: '#2094C9',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginLeft: 8,
    },
    
    optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    },

    optionValue: {
    fontSize: 16,
    color: '#222222',
    marginRight: 120,
    },

    pesticideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    },

    pesticideInput: {
    flex: 1,
    height: 55,
    fontSize: 16,
    },

    bottomFormButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    },

    newAreaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 45,
    },

    newAreaText: {
    color: '#999999',
    fontSize: 11,
    marginLeft: 5,
    letterSpacing: 1,
    },

    selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 25,
    marginBottom: 25,
    },

    selectValue: {
    fontSize: 16,
    color: '#222222',
    },

    paymentBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    },

    checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    },

    checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#666666',
    marginRight: 8,
    },

    checkboxText: {
    color: '#3D5A96',
    fontSize: 13,
    },
    signatureHeader: {
    alignItems: 'flex-end',
    marginBottom: 15,
    },

    noticeBox: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    padding: 10,
    marginBottom: 15,
    },

    noticeText: {
    fontSize: 11,
    textAlign: 'center',
    color: '#444444',
    },

    signatureArea: {
    height: 140,
    borderWidth: 2,
    borderColor: '#2094C9',
    marginBottom: 15,
    },

    clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    },

    clientName: {
    fontSize: 16,
    color: '#3D5A96',
    marginLeft: 10,
    },

    signatureDate: {
    textAlign: 'center',
    color: '#555555',
    fontSize: 14,
    marginBottom: 20,
    },
    optionsBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    marginBottom: 15,
    },

    optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    },

    optionItemText: {
    fontSize: 16,
    color: '#222222',
    },

    inputText: {
    color: '#3D5A96',
    fontSize: 18,
    marginTop: 20,
    },

    modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    },

    modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    },

    modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    },

    photoPreview: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 15,
    },

    closeModalButton: {
    backgroundColor: '#2094C9',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    },

    closeModalText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    },
    iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    },

    qrIcon: {
    marginRight: 18,
    },

    pesticideText: {
    flex: 1,
    fontSize: 16,
    color: '#444444',
    },
});