import React, { useState } from 'react';
import { Stepper, Button, Group, TextInput, Select, Textarea, NumberInput, Switch, Paper, Title, Text, Stack, Checkbox, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { queueService } from '@/services/queue.service';
import { useApi } from '@/hooks/useApi';

const CreateQueue: React.FC = () => {
    const [active, setActive] = useState(0);
    const navigate = useNavigate();

    // Form State
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [is_active, setIsActive] = useState(true);

    const { loading, execute: createQueue } = useApi(queueService.create, {
        successMessage: 'Queue created successfully!',
        onSuccess: (data) => {
            navigate(`/admin/queues`);
        }
    });

    const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handleCreate = () => {
        createQueue({
            name,
            description,
            is_active
        });
    };

    return (
        <Paper p="xl" radius="md" withBorder>
            <Title order={2} ta="center" mb="xl">CREER UNE NOUVELLE FILE</Title>

            <Stepper active={active} onStepClick={setActive} breakpoint="sm" mb="xl">
                <Stepper.Step label="Informations" description="Etape 1/2">
                    <Stack gap="md" maw={600} mx="auto" mt="xl">
                        <TextInput
                            label="Nom de la file"
                            placeholder="Ex: Service Scolarité"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Textarea
                            label="Description"
                            placeholder="Description de la file..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Switch
                            label="Activer immédiatement"
                            checked={is_active}
                            onChange={(e) => setIsActive(e.currentTarget.checked)}
                        />
                    </Stack>
                </Stepper.Step>

                <Stepper.Step label="Finalisation" description="Etape 2/2">
                    <Stack gap="md" maw={600} mx="auto" mt="xl" align="center">
                        <Paper bg="green.0" p="md" w="100%" ta="center">
                            <Text c="green" fw={700}>✓ Prêt à créer la file</Text>
                        </Paper>
                        <Stack w="100%" gap="xs">
                            <Text fw={700}>Récapitulatif :</Text>
                            <Text size="sm">• Nom : {name}</Text>
                            <Text size="sm">• Description : {description}</Text>
                            <Text size="sm">• Statut : {is_active ? 'Active' : 'Inactive'}</Text>
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
                {active < 1 ? (
                    <Button onClick={nextStep} color="blue">
                        SUIVANT
                    </Button>
                ) : (
                    <Button onClick={handleCreate} color="blue" loading={loading}>
                        CREER ET OUVRIR
                    </Button>
                )}
            </Group>
        </Paper>
    );
};

export default CreateQueue;
