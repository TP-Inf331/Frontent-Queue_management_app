import React, { useState } from 'react';
import { Stepper, Button, Group, TextInput, Select, Textarea, NumberInput, Switch, Paper, Title, Text, Stack, Checkbox } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { queueService } from '../utils/queueService';

const CreateQueue: React.FC = () => {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();

    // Form State
    const [name, setName] = useState('');
    const [type, setType] = useState('Scolarité');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState<number | string>(50);
    const [isUnlimited, setIsUnlimited] = useState(false);
    const [timePerPerson, setTimePerPerson] = useState('5 min');
    const [agent, setAgent] = useState('Najela Melvis');

    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handleCreate = () => {
        const newQueue = queueService.add({
            name,
            status: 'OUVERT', // Auto-open as requested
            avgTime: timePerPerson,
            capacity: isUnlimited ? null : Number(capacity)
        });
        // Redirect to the new queue's detail page
        navigate(`/admin/queues/${newQueue.id}`);
    };

    return (
        <Paper p="xl" radius="md" withBorder>
            <Title order={2} ta="center" mb="xl">CREER UNE NOUVELLE FILE</Title>

            <Stepper active={active} onStepClick={setActive} breakpoint="sm" mb="xl">
                <Stepper.Step label="Informations de base" description="Etape 1/3">
                    <Stack gap="md" maw={600} mx="auto" mt="xl">
                        <TextInput
                            label="Nom de la file"
                            placeholder="Ex: Service Scolarité"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Select
                            label="Type de service"
                            placeholder="Sélectionnez un type"
                            data={['Scolarité', 'Médical', 'Administratif', 'Autres']}
                            defaultValue="Scolarité"
                            required
                            value={type}
                            onChange={(val) => setType(val || 'Scolarité')}
                        />
                        <Textarea
                            label="Description (optionnel)"
                            placeholder="Ex: Délivrance des certificats..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextInput
                            label="Lieu physique (optionnel)"
                            placeholder="Salle 304, Bâtiment A"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Stack>
                </Stepper.Step>

                <Stepper.Step label="Configuration" description="Etape 2/3">
                    <Stack gap="md" maw={600} mx="auto" mt="xl">
                        <NumberInput
                            label="Nombre maximum de personnes"
                            placeholder="50"
                            disabled={isUnlimited}
                            value={capacity}
                            onChange={setCapacity}
                        />
                        <Checkbox
                            label="Illimité"
                            checked={isUnlimited}
                            onChange={(e) => setIsUnlimited(e.currentTarget.checked)}
                        />

                        <Select label="Temps estimé par personne" data={['2 min', '5 min', '10 min']} defaultValue="5 min" value={timePerPerson} onChange={(v) => setTimePerPerson(v || '5 min')} />

                        <TextInput label="Agent responsable" defaultValue="Najela Melvis" value={agent} onChange={(e) => setAgent(e.target.value)} />
                    </Stack>
                </Stepper.Step>

                <Stepper.Step label="Finalisation" description="Etape 3/3">
                    <Stack gap="md" maw={600} mx="auto" mt="xl" align="center">
                        <Paper bg="green.0" p="md" w="100%" ta="center">
                            <Text c="green" fw={700}>✓ Prêt à créer la file</Text>
                        </Paper>

                        <Stack w="100%" gap="xs">
                            <Text fw={700}>Récapitulatif :</Text>
                            <Text size="sm">• Nom : {name}</Text>
                            <Text size="sm">• Type : {type}</Text>
                            <Text size="sm">• Capacité : {isUnlimited ? 'Illimité' : `${capacity} personnes maximum`}</Text>
                            <Text size="sm">• Agent responsable : {agent}</Text>
                        </Stack>

                        <Stack w="100%" mt="md">
                            <Text fw={700}>OPTIONS D'INSCRIPTION</Text>
                            <Checkbox label="Activer QR code automatique" defaultChecked />
                            <Checkbox label="Activer code manuel (ex: YDE-001)" defaultChecked />
                            <Checkbox label="Activer le lien partageable" />
                        </Stack>
                    </Stack>
                </Stepper.Step>
            </Stepper>

            <Group justify="center" mt="xl">
                {active !== 0 && (
                    <Button variant="default" onClick={prevStep}>
                        PRECEDENT
                    </Button>
                )}
                {active < 2 ? (
                    <Button onClick={nextStep} color="blue">
                        SUIVANT
                    </Button>
                ) : (
                    <Button onClick={handleCreate} color="blue">
                        CREER ET OUVRIR
                    </Button>
                )}
            </Group>
        </Paper>
    );
};

export default CreateQueue;
