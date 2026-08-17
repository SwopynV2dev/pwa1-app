import { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, Modal, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Signature from 'react-native-signature-canvas';
import { savePlaceInspection } from '../database/placeInspectionsDb';
import { savePlagueControl } from '../database/plagueControlsDb';
import { saveCash } from '../database/cashesDb';
import { saveServiceFirm } from '../database/serviceFirmsDb';


type PhotoItem = {
    uri: string;
    comment: string;
};

export default function ServiceForm() {
    const serviceId = 1;

const serviceFormData = {
    serviceNumber: `OS-8299-${serviceId}`,
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
    const [photos, setPhotos] = useState<PhotoItem[]>([]);
    const [showPlagueOptions, setShowPlagueOptions] = useState(false);
    const [showPhotos, setShowPhotos] = useState(false);
    const [nestingAreas, setNestingAreas] = useState('');
    const [inspectionCommentary, setInspectionCommentary] = useState('');
    const [showInfestationModal, setShowInfestationModal] = useState(false);
    const [infestationLevels, setInfestationLevels] = useState<{ [key: string]: string }>({});
    const [openInfestationPlague, setOpenInfestationPlague] = useState<string | null>(null);

    const [currentPlagueIndex, setCurrentPlagueIndex] = useState(0);
    const infestationOptions = ['Nulo', 'Bajo', 'Medio', 'Alto'];
    //Condiciones del lugar
    const [conditionPhotos, setConditionPhotos] = useState<PhotoItem[]>([]);
    const [showConditionPhotos, setShowConditionPhotos] = useState(false);
    const [showIndicationsOptions, setShowIndicationsOptions] = useState(false);
    const [indications, setIndications] = useState('Si');
    const [cleaningOrder, setCleaningOrder] = useState('');

    //Inspeccion del lugar
    const plagueOptions = ['Cucaracha', 'Hormiga', 'Rata', 'Mosquito', 'Araña', 'Termita'];

    //Control de plagas
    const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
    const [selectedPesticide, setSelectedPesticide] = useState('');
    const [controlPhotos, setControlPhotos] = useState<PhotoItem[]>([]);
    const [controlArea, setControlArea] = useState('');
    const [controlCommentary, setControlCommentary] = useState('');

    const [showMethods, setShowMethods] = useState(false);
    const [showPesticides, setShowPesticides] = useState(false);
    const [showControlPhotos, setShowControlPhotos] = useState(false);

    const [showDoseModal, setShowDoseModal] = useState(false);
    const [dose, setDose] = useState('');
    const [quantity, setQuantity] = useState('');
    const [editingProductIndex, setEditingProductIndex] = useState<number | null>(null);

    const [appliedProducts, setAppliedProducts] = useState<
        { pesticide: string; dose: string; quantity: string }[]>([]);

    const methodOptions = ['Rociado', 'Polvos', 'Untado', 'Gel', 'Cebadero', 'Trampa'];
    const pesticideOptions = ['Cipermetrina','Ácido Bórico','Gel Palmera','Rodilon Minibloque','Net-Mosk WP','Scourge VPM EC 20%',];

    //Pago del servicio
    const [paymentMethod, setPaymentMethod] = useState('Efectivo');
    const [paymentType, setPaymentType] = useState('Contado');
    const [showPaymentMethods, setShowPaymentMethods] = useState(false);
    const [showPaymentTypes, setShowPaymentTypes] = useState(false);
    const [clientDidNotPay, setClientDidNotPay] = useState(false);
    const [amountReceived, setAmountReceived] = useState('');
    const [paymentCommentary, setPaymentCommentary] = useState('');

    const paymentMethodOptions = ['Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito' , 'Transferencia', 'Deposito' , 'Cheque'];
    const paymentTypeOptions = ['Contado', 'A meses'];

    //Fotos
    const [clientPhotos, setClientPhotos] = useState<string[]>([]);
    const [showClientPhotos, setShowClientPhotos] = useState(false);
    const [showPhotoOptionsModal, setShowPhotoOptionsModal] = useState(false);
    const [photoTarget, setPhotoTarget] = useState<'inspection' | 'condition' | 'control' | null>(null);

    //Firmas
    const [signature, setSignature] = useState<string | null>(null);
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    const signatureRef = useRef<any>(null);
    const [signatureOtherName, setSignatureOtherName] = useState('');

    //Hora fin
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('00:00 --');

    useEffect(() => {
        if (startTime === '') {
            setStartTime(
                new Date().toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                })
            );
        }
    }, []);

    useEffect(() => {
        if (startTime === '') {
            setStartTime(
                new Date().toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                })
            );
        }
    }, []);

    //Condiciones del lugar
    const togglePlague = (plague: string) => {
    if (selectedPlagues.includes(plague)) {
        setSelectedPlagues(selectedPlagues.filter((item) => item !== plague));

        const updatedLevels = { ...infestationLevels };
        delete updatedLevels[plague];
        setInfestationLevels(updatedLevels);
    } else {
        setSelectedPlagues([...selectedPlagues, plague]);
        setInfestationLevels({
            ...infestationLevels,
            [plague]: 'Nulo',
        });
    }
};

    //Fotos
    const openPhotoOptions = (target: 'inspection' | 'condition' | 'control') => {
    setPhotoTarget(target);
    setShowPhotoOptionsModal(true);
    };

    const savePhotoByTarget = (uri: string) => {
    const newPhoto = {
        uri,
        comment: '',
    };

    if (photoTarget === 'inspection') {
        setPhotos([...photos, newPhoto]);
    }

    if (photoTarget === 'condition') {
        setConditionPhotos([...conditionPhotos, newPhoto]);
    }

    if (photoTarget === 'control') {
        setControlPhotos([...controlPhotos, newPhoto]);
    }
};

    const selectCameraPhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            alert('Se necesita permiso para usar la cámara');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 0.7,
        });

        if (!result.canceled) {
            savePhotoByTarget(result.assets[0].uri);
        }

        setShowPhotoOptionsModal(false);
    };

    const selectGalleryPhoto = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert('Se necesita permiso para acceder a la galería');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 0.7,
            allowsMultipleSelection: false,
        });

        if (!result.canceled) {
            savePhotoByTarget(result.assets[0].uri);
        }

        setShowPhotoOptionsModal(false);
    };

    //Foto
    
    //Control de plagas
    const toggleMethod = (method: string) => {
    if (selectedMethods.includes(method)) {
        setSelectedMethods(selectedMethods.filter((item) => item !== method));
    } else {
        setSelectedMethods([...selectedMethods, method]);
    }
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

        // Botón guardar
            const completeSection = (sectionId: number) => {
                try {
                    // Sección 1: Inspección del lugar
                    if (
                        sectionId === 1 &&
                        !completedSections.includes(sectionId)
                    ) {
                        const now = new Date().toISOString();

                        const placeInspectionId = savePlaceInspection({
                            // serviceId actualmente vale 1 de manera temporal.
                            // Después se reemplazará por el ID real del servicio.
                            id_service_order: serviceId,
                            nesting_areas: nestingAreas.trim(),
                            commentary: inspectionCommentary.trim(),
                            created_at: now,
                            updated_at: now,
                        });

                        console.log(
                            'Inspección del lugar guardada con ID:',
                            placeInspectionId
                        );
                    }

                    // Sección 3: Control de plagas
                    if (
                        sectionId === 3 &&
                        !completedSections.includes(sectionId)
                    ) {
                        const now = new Date().toISOString();

                        const plagueControlId = savePlagueControl({
                            id_service_order: serviceId,
                            control_areas: controlArea.trim(),
                            commentary: controlCommentary.trim(),
                            created_at: now,
                            updated_at: now,
                        });

                        console.log(
                            'Control de plagas guardado con ID:',
                            plagueControlId
                        );
                    }

                    // Sección 4: Pago del servicio
                        if (
                            sectionId === 4 &&
                            !completedSections.includes(sectionId)
                        ) {
                            const now = new Date().toISOString();

                            // const paymentMethodIds: Record<string, number> = {
                            //     Efectivo: 1,
                            //     'Tarjeta de Crédito': 2,
                            //     'Tarjeta de Débito': 3,
                            //     Transferencia: 4,
                            //     Deposito: 5,
                            //     Cheque: 6,
                            // };

                            // const paymentWayIds: Record<string, number> = {
                            //     Contado: 1,
                            //     'A meses': 2,
                            // };

                            const cashId = saveCash({
                                id_service_order: serviceId,
                                id_event: undefined,
                                id_payment_method: undefined,
                                id_payment_way: undefined,
                                companie: undefined,
                                amount_received: amountReceived
                                    ? Number(amountReceived)
                                    : 0,
                                commentary: paymentCommentary.trim(),
                                payment: clientDidNotPay ? 0 : 1,
                                created_at: now,
                                updated_at: now,
                                // id_service_order: serviceId,
                                // id_event: undefined,
                                // id_payment_method: paymentMethodIds[paymentMethod],
                                // id_payment_way: paymentWayIds[paymentType],
                                // companie: undefined,
                                // amount_received: amountReceived
                                //     ? Number(amountReceived)
                                //     : 0,
                                // commentary: paymentCommentary.trim(),
                                // payment: clientDidNotPay ? 0 : 1,
                                // created_at: now,
                                // updated_at: now,
                            });

                            console.log(
                                'Pago guardado con ID:',
                                cashId
                            );
                        }

                    if (!completedSections.includes(sectionId)) {
                        setCompletedSections((previousSections) => [
                            ...previousSections,
                            sectionId,
                        ]);
                    }

                    // Cierra la sección actual
                    setOpenSections((previousSections) =>
                        previousSections.filter((id) => id !== sectionId)
                    );

                    // Abre la siguiente sección
                    const nextSection = serviceFormData.sections.find(
                        (section) => section.id === sectionId + 1
                    );

                    if (nextSection) {
                        setOpenSections([nextSection.id]);
                    }
                } catch (error) {
                    console.error(
                        'Error al guardar la sección:',
                        error
                    );

                    Alert.alert(
                        'Error',
                        'No se pudo guardar la información localmente.'
                    );
                }
            };

    const isFormCompleted = completedSections.length === serviceFormData.sections.length;

    const currentPlague = selectedPlagues[currentPlagueIndex];

    return (
        <View style={styles.container}>
        <View style={styles.topInfo}>
            <TouchableOpacity onPress={() => router.push('/service-detail')}>
                <MaterialIcons name="arrow-back" size={40} color="#438FC2" />
            </TouchableOpacity>

            <View style={styles.infoBlock}>
                <Text style={styles.infoTitle}># Servicio</Text>
                <Text style={styles.infoText}>{serviceFormData.serviceNumber}</Text>
            </View>

            <View style={styles.infoBlock}>
                <Text style={styles.infoTitle}>Hora Inicio</Text>
                <Text style={styles.infoText}>{startTime}</Text>
            </View>

            <View style={styles.infoBlock}>
                <Text style={styles.infoTitle}>Hora Fin</Text>
                <Text style={styles.infoText}>{endTime}</Text>
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

                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>
                        {section.title}
                    </Text>

                    {completedSections.includes(section.id) && (
                        <View style={styles.completedRow}>
                            <Text style={styles.completedText}>Completado</Text>

                            <MaterialIcons
                                name="check-circle-outline"
                                size={20}
                                color="#5BC0AA"
                            />
                        </View>
                    )}
                </View>

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

                            <TouchableOpacity onPress={() => openPhotoOptions('inspection')}>
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

                                    <TouchableOpacity
                                        style={styles.okPlaguesButton}
                                        onPress={() => {
                                            setShowPlagueOptions(false);

                                            if (selectedPlagues.length > 0) {
                                                setCurrentPlagueIndex(0);
                                                setShowInfestationModal(true);
                                            }
                                        }}
                                    >
                                        <Text style={styles.okPlaguesText}>OK</Text>
                                    </TouchableOpacity>

                                </View>
                            )}

                            <Text style={styles.label}>Plagas seleccionadas:</Text>

                            <TextInput
                                style={styles.textArea}
                                value={selectedPlagues
                                    .map((plague) => `${plague}: ${infestationLevels[plague] || 'Nulo'}`)
                                    .join(', ')
                                }
                                editable={false}
                            />

                            <TextInput
                                placeholder="Áreas de anidamiento"
                                placeholderTextColor="#3D5A96"
                                style={styles.input}
                                value={nestingAreas}
                                onChangeText={setNestingAreas}
                            />

                            <TextInput
                                placeholder="Comentarios"
                                placeholderTextColor="#3D5A96"
                                style={styles.input}
                                value={inspectionCommentary}
                                onChangeText={setInspectionCommentary}
                            />

                            <TouchableOpacity
                            style={styles.saveSectionButton}
                            onPress={() => {
                                completeSection(section.id);
                            }}
                            >
                            <Text style={styles.saveSectionText}>GUARDAR</Text>
                            </TouchableOpacity>

                            <Modal visible={showInfestationModal} transparent animationType="fade">
                                <View style={styles.modalBackground}>
                                    <View style={styles.infestationModal}>
                                        <View style={styles.infestationItem}>
                                    <Text style={styles.infestationTitle}>
                                        Grado de Infestación: {currentPlague}
                                    </Text>

                                    <TouchableOpacity
                                        style={styles.infestationSelect}
                                        onPress={() =>
                                            setOpenInfestationPlague(
                                                openInfestationPlague === currentPlague
                                                    ? null
                                                    : currentPlague
                                            )
                                        }
                                    >
                                        <Text style={styles.infestationValue}>
                                            {infestationLevels[currentPlague] || 'Nulo'}
                                        </Text>

                                        <MaterialIcons
                                            name="keyboard-arrow-down"
                                            size={24}
                                            color="#666"
                                        />
                                    </TouchableOpacity>

                                    {openInfestationPlague === currentPlague && (
                                        <View style={styles.infestationOptionsBox}>
                                            {infestationOptions.map((option) => (
                                                <TouchableOpacity
                                                    key={option}
                                                    style={styles.infestationOption}
                                                    onPress={() => {
                                                        setInfestationLevels({
                                                            ...infestationLevels,
                                                            [currentPlague]: option,
                                                        });

                                                        setOpenInfestationPlague(null);
                                                    }}
                                                >
                                                    <Text style={styles.infestationOptionText}>
                                                        {option}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>

                                        <TouchableOpacity
                                            style={styles.modalOkButton}
                                            onPress={() => {
                                                if (currentPlagueIndex < selectedPlagues.length - 1) {
                                                    setCurrentPlagueIndex(currentPlagueIndex + 1);
                                                } else {
                                                    setCurrentPlagueIndex(0);
                                                    setShowInfestationModal(false);
                                                }
                                            }}
                                        >
                                            <Text style={styles.modalOkText}>OK</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>

                            <Modal visible={showPhotos} transparent animationType="slide">
                            <View style={styles.modalBackground}>
                                <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Fotos tomadas</Text>

                                <ScrollView
                                    style={styles.photosScroll}
                                    contentContainerStyle={styles.photosScrollContent}
                                    nestedScrollEnabled
                                    keyboardShouldPersistTaps="handled"
                                >
                                    {photos.length === 0 ? (
                                        <Text>No hay fotos todavía</Text>
                                    ) : (
                                        photos.map((photo, index) => (
                                            <View key={index} style={styles.photoItem}>
                                                <Image
                                                    source={{ uri: photo.uri }}
                                                    style={styles.photoPreview}
                                                    resizeMode="contain"
                                                />

                                                <TextInput
                                                    placeholder="Comentario de la foto"
                                                    placeholderTextColor="#3D5A96"
                                                    style={styles.photoCommentInput}
                                                    value={photo.comment}
                                                    onChangeText={(text) => {
                                                        const updatedPhotos = [...photos];
                                                        updatedPhotos[index].comment = text;
                                                        setPhotos(updatedPhotos);
                                                    }}
                                                />
                                            </View>
                                        ))
                                    )}
                                </ScrollView>

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
                            style={styles.photoButton}
                            onPress={() => setShowConditionPhotos(true)}
                        >
                            <Text style={styles.photoButtonText}>Ver Fotos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => openPhotoOptions('condition')}>
                            <MaterialIcons name="add-a-photo" size={50} color="#2094C9" />
                        </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Orden y limpieza seleccionados:</Text>

                        <TextInput
                            placeholder="Orden y limpieza"
                            placeholderTextColor="#3D5A96"
                            style={styles.textArea}
                            value={cleaningOrder}
                            onChangeText={setCleaningOrder}
                            multiline
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
                            completeSection(section.id);
                        }}
                        >
                        <MaterialIcons name="keyboard-arrow-down" size={28} color="#2094C9" />
                        <Text style={styles.saveSectionText}>GUARDAR</Text>
                        </TouchableOpacity>

                        <Modal visible={showConditionPhotos} transparent animationType="slide">
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Fotos tomadas</Text>

                            <ScrollView
                                style={styles.photosScroll}
                                contentContainerStyle={styles.photosScrollContent}
                                nestedScrollEnabled
                                keyboardShouldPersistTaps="handled"
                            >
                                {conditionPhotos.length === 0 ? (
                                    <Text>No hay fotos todavía</Text>
                                ) : (
                                    conditionPhotos.map((photo, index) => (
                                        <View key={index} style={styles.photoItem}>
                                            <Image
                                                source={{ uri: photo.uri }}
                                                style={styles.photoPreview}
                                                resizeMode="contain"
                                            />

                                            <TextInput
                                                placeholder="Comentario de la foto"
                                                placeholderTextColor="#3D5A96"
                                                style={styles.photoCommentInput}
                                                value={photo.comment}
                                                onChangeText={(text) => {
                                                    const updatedPhotos = [...conditionPhotos];
                                                    updatedPhotos[index].comment = text;
                                                    setConditionPhotos(updatedPhotos);
                                                }}
                                            />
                                        </View>
                                    ))
                                )}
                            </ScrollView>

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

                            <TouchableOpacity onPress={() => openPhotoOptions('control')}>
                            <MaterialIcons name="add-a-photo" size={43} color="#2094C9" />
                            </TouchableOpacity>
                        </View>
                        </View>

                        <TextInput
                            placeholder="Área a controlar"
                            placeholderTextColor="#3D5A96"
                            style={styles.input}
                            value={controlArea}
                            onChangeText={setControlArea}
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
                                setDose('');
                                setQuantity('');
                                setEditingProductIndex(null);
                                setShowDoseModal(true);
                            }}
                            >
                                <Text style={styles.optionItemText}>{pesticide}</Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                        )}

                        <TouchableOpacity
                            style={styles.refreshButton}
                            onPress={() => {
                                alert('Dosis actualizada');
                            }}
                        >
                            <MaterialIcons name="sync" size={28} color="#2094C9" />
                        </TouchableOpacity>

                        {appliedProducts.map((product, index) => (
                            <View key={index} style={styles.appliedProductCard}>
                                <Text style={styles.appliedProductName}>
                                    {product.pesticide}
                                </Text>

                                <View style={styles.appliedProductInfo}>
                                    <Text style={styles.appliedProductValue}>
                                        {product.quantity}
                                    </Text>

                                    <Text style={styles.appliedProductValue}>
                                        {product.dose}
                                    </Text>

                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => {
                                            setSelectedPesticide(product.pesticide);
                                            setDose(product.dose);
                                            setQuantity(product.quantity);
                                            setEditingProductIndex(index);
                                            setShowDoseModal(true);
                                        }}
                                    >
                                        <Text style={styles.editButtonText}>EDITAR</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => {
                                            setAppliedProducts(
                                                appliedProducts.filter(
                                                    (_, itemIndex) => itemIndex !== index
                                                )
                                            );
                                        }}
                                    >
                                        <Text style={styles.deleteButtonText}>
                                            ELIMINAR
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}

                        <TextInput
                            placeholder="Comentarios"
                            placeholderTextColor="#3D5A96"
                            style={styles.input}
                            value={controlCommentary}
                            onChangeText={setControlCommentary}
                        />

                        <View style={styles.bottomFormButtons}>

                        <TouchableOpacity
                            style={styles.saveSectionButton}
                            onPress={() => {
                            completeSection(section.id);
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

                            <ScrollView
                                style={styles.photosScroll}
                                contentContainerStyle={styles.photosScrollContent}
                                nestedScrollEnabled
                                keyboardShouldPersistTaps="handled"
                            >
                                {controlPhotos.length === 0 ? (
                                    <Text>No hay fotos todavía</Text>
                                ) : (
                                    controlPhotos.map((photo, index) => (
                                        <View key={index} style={styles.photoItem}>
                                            <Image
                                                source={{ uri: photo.uri }}
                                                style={styles.photoPreview}
                                                resizeMode="contain"
                                            />

                                            <TextInput
                                                placeholder="Comentario de la foto"
                                                placeholderTextColor="#3D5A96"
                                                style={styles.photoCommentInput}
                                                value={photo.comment}
                                                onChangeText={(text) => {
                                                    const updatedPhotos = [...controlPhotos];
                                                    updatedPhotos[index].comment = text;
                                                    setControlPhotos(updatedPhotos);
                                                }}
                                            />
                                        </View>
                                    ))
                                )}
                            </ScrollView>

                            <TouchableOpacity
                                style={styles.closeModalButton}
                                onPress={() => setShowControlPhotos(false)}
                            >
                                <Text style={styles.closeModalText}>Cerrar</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                        </Modal>

                        <Modal visible={showDoseModal} transparent animationType="fade">
                            <View style={styles.modalBackground}>
                                <View style={styles.doseModal}>
                                    <TextInput
                                        placeholder="Dosis"
                                        placeholderTextColor="#3D5A96"
                                        style={styles.input}
                                        value={dose}
                                        onChangeText={setDose}
                                    />

                                    <TextInput
                                        placeholder="Cantidad a utilizar"
                                        placeholderTextColor="#3D5A96"
                                        style={styles.input}
                                        value={quantity}
                                        onChangeText={setQuantity}
                                        keyboardType="numeric"
                                    />

                                    <TouchableOpacity
                                        style={styles.modalOkButton}
                                        onPress={() => {
                                            if (!selectedPesticide) {
                                                alert('Selecciona un plaguicida');
                                                return;
                                            }

                                            if (editingProductIndex !== null) {
                                                const updatedProducts = [...appliedProducts];

                                                updatedProducts[editingProductIndex] = {
                                                    pesticide: selectedPesticide,
                                                    dose,
                                                    quantity,
                                                };

                                                setAppliedProducts(updatedProducts);
                                            } else {
                                                setAppliedProducts([
                                                    ...appliedProducts,
                                                    {
                                                        pesticide: selectedPesticide,
                                                        dose,
                                                        quantity,
                                                    },
                                                ]);
                                            }

                                            setDose('');
                                            setQuantity('');
                                            setEditingProductIndex(null);
                                            setShowDoseModal(false);
                                        }}
                                    >
                                        <Text style={styles.modalOkText}>OK</Text>
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
                            value={amountReceived}
                            onChangeText={setAmountReceived}
                        />

                        <TextInput
                            placeholder="Comentarios"
                            placeholderTextColor="#3D5A96"
                            style={styles.input}
                            value={paymentCommentary}
                            onChangeText={setPaymentCommentary}
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
                            completeSection(section.id);
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

                            <TouchableOpacity
                                style={styles.signatureArea}
                                onPress={() => setShowSignaturePad(true)}
                            >
                            {signature ? (
                                <Image
                                    source={{ uri: signature }}
                                    style={styles.signatureImage}
                                    resizeMode="contain"
                                />
                            ) : (
                                <Text style={styles.signaturePlaceholder}>
                                    Toca aquí para firmar
                                </Text>
                            )}
                        </TouchableOpacity>

                        <Modal
                            visible={showSignaturePad}
                            animationType="slide"
                        >
                            <View style={styles.signatureModalContainer}>
                                <Signature
                                    ref={signatureRef}
                                    onOK={(signatureData) => {
                                        setSignature(signatureData);
                                        setShowSignaturePad(false);
                                    }}
                                    onEmpty={() => alert('Primero realiza una firma')}
                                    descriptionText=""
                                    clearText=""
                                    confirmText=""
                                    webStyle={`
                                        .m-signature-pad {
                                            box-shadow: none;
                                            border: none;
                                        }

                                        .m-signature-pad--footer {
                                            display: none;
                                        }
                                    `}
                                />

                                <View style={styles.signatureButtonsRow}>
                                    <TouchableOpacity
                                        style={styles.cancelSignatureButton}
                                        onPress={() => setShowSignaturePad(false)}
                                    >
                                        <Text style={styles.cancelSignatureText}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.doneSignatureButton}
                                        onPress={() => signatureRef.current?.readSignature()}
                                    >
                                        <Text style={styles.doneSignatureText}>Listo</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Modal>

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
                                value={signatureOtherName}
                                onChangeText={setSignatureOtherName}
                            />

                            <Text style={styles.signatureDate}>
                            Magdalena, Santa Marta 12/06/2026
                            </Text>

                            <TouchableOpacity
                                style={styles.saveSectionButton}
                                onPress={() => {
                                    if (!signature) {
                                        Alert.alert(
                                            'Firma requerida',
                                            'Primero realiza la firma.'
                                        );
                                        return;
                                    }

                                    try {
                                        const now = new Date().toISOString();

                                        const serviceFirmId = saveServiceFirm({
                                            id_service_order: serviceId,
                                            file_route: signature,
                                            other_name: signatureOtherName.trim(),
                                            created_at: now,
                                            updated_at: now,
                                        });

                                        console.log(
                                            'Firma guardada con ID:',
                                            serviceFirmId
                                        );

                                        if (!completedSections.includes(section.id)) {
                                            setCompletedSections((previousSections) => [
                                                ...previousSections,
                                                section.id,
                                            ]);
                                        }

                                        Alert.alert(
                                            'Guardado',
                                            'La firma se guardó localmente.'
                                        );
                                    } catch (error) {
                                        console.error(
                                            'Error al guardar la firma:',
                                            error
                                        );

                                        Alert.alert(
                                            'Error',
                                            'No se pudo guardar la firma.'
                                        );
                                    }
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

        <Modal visible={showPhotoOptionsModal} transparent animationType="fade">
            <View style={styles.modalBackground}>
                <View style={styles.photoOptionsModal}>
                    <Text style={styles.photoOptionsTitle}>
                        Seleccione una opción:
                    </Text>

                    <TouchableOpacity
                        style={styles.photoOptionItem}
                        onPress={selectCameraPhoto}
                    >
                        <Text style={styles.photoOptionText}>Tomar Foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.photoOptionItem}
                        onPress={selectGalleryPhoto}
                    >
                        <Text style={styles.photoOptionText}>Desde Galería</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.photoOptionItem}
                        onPress={() => setShowPhotoOptionsModal(false)}
                    >
                        <Text style={styles.photoOptionText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
                onPress={() => {
                    const finishedHour = new Date().toLocaleTimeString('es-MX', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    });

                    setEndTime(finishedHour);

                    setTimeout(() => {
                        router.push('/service-detail');
                    }, 2000);
                }}
            >
                <Text
                    style={[
                        styles.finishButtonText,
                        !isFormCompleted && styles.finishButtonTextDisabled,
                    ]}
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
        marginBottom: 6,
        borderRadius: 3,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
    },

    sectionTitle: {
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
        marginBottom: 6,
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
        width: '100%',
        height: 180,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
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
        maxHeight: '85%',
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
        height: 300,
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

    signaturePlaceholder: {
        color: '#888888',
        fontSize: 16,
    },

    signatureImage: {
        width: '100%',
        height: '100%',
    },

    signaturePadContainer: {
        width: '100%',
        height: 350,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
    },

    cancelSignatureButton: {
        flex: 1,
        backgroundColor: '#CCCCCC',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cancelSignatureText: {
        color: '#333333',
        fontSize: 18,
        fontWeight: 'bold',
    },

    signatureModalContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    signatureButtonsRow: {
        flexDirection: 'row',
        height: 70,
    },

    doneSignatureButton: {
        flex: 1,
        backgroundColor: '#2094C9',
        justifyContent: 'center',
        alignItems: 'center',
    },

    doneSignatureText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

        okPlaguesButton: {
        alignSelf: 'flex-end',
        padding: 12,
    },

    okPlaguesText: {
        color: '#2094C9',
        fontWeight: 'bold',
        fontSize: 16,
    },

    infestationModal: {
        width: '85%',
        maxHeight: '70%',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 20,
    },

    infestationItem: {
        marginBottom: 20,
    },

    infestationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },

    infestationSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        paddingVertical: 10,
    },

    infestationValue: {
        fontSize: 16,
        color: '#333',
    },

    infestationOptionsBox: {
        borderWidth: 1,
        borderColor: '#DDD',
        marginTop: 5,
    },

    infestationOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },

    infestationOptionText: {
        fontSize: 15,
    },

    modalOkButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },

    modalOkText: {
        color: '#2094C9',
        fontWeight: 'bold',
        fontSize: 16,
    },

    doseModal: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 20,
    },

    refreshButton: {
        alignSelf: 'flex-end',
        marginBottom: 15,
    },

    appliedProductCard: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        padding: 12,
        marginBottom: 15,
        elevation: 2,
    },

    appliedProductName: {
        color: '#3D5A96',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    appliedProductInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    appliedProductValue: {
        color: '#2094C9',
        fontSize: 16,
        fontWeight: 'bold',
    },

    editButton: {
        backgroundColor: '#2094C9',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 4,
    },

    editButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12,
    },

    deleteButton: {
        backgroundColor: '#D6402F',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 4,
    },

    deleteButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12,
    },

    photoOptionsModal: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    paddingVertical: 18,
    paddingHorizontal: 20,
    },

    photoOptionsTitle: {
        fontSize: 18,
        color: '#222222',
        marginBottom: 15,
    },

    photoOptionItem: {
        paddingVertical: 14,
    },

    photoOptionText: {
        fontSize: 16,
        color: '#333333',
    },

    photoItem: {
    marginBottom: 20,
    },

    photoCommentInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 8,
        color: '#3D5A96',
    },

    photosScroll: {
    maxHeight: 520,
    },

    photosScrollContent: {
        paddingBottom: 20,
    },

    sectionTitleContainer: {
    flex: 1,
    marginLeft: 25,
    },

    completedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
        marginLeft: 26,
    },

    completedText: {
        color: '#5BC0AA',
        fontSize: 13,
        marginRight: 5,
    },
});