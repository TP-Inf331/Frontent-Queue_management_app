import React, { useEffect, useState } from 'react';
import { Paper, Title, Text, Button, Group, Badge, Stack, ActionIcon, Avatar, SimpleGrid, Divider } from '@mantine/core';
import { IconPlayerPause, IconSettings, IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { queueService, QueueItem } from '../utils/queueService';

const QueueDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [queue, setQueue] = useState<QueueItem | null>(null);

    const loadQueue = async () => {
        if (id) {
            try {
                const data = await queueService.getById(id);
                if (data) setQueue(data);
            } catch (error) {
                console.error("Failed to load queue", error);
            }
        }
    };

    useEffect(() => {
        loadQueue();
    }, [id]);

    const handleCallNext = async () => {
        if (id) {
            try {
                const updated = await queueService.callNext(id);
                if (updated) setQueue({ ...updated });
            } catch (error) {
                console.error("Failed to call next", error);
            }
        }
    };

    if (!queue) return <Text>Chargement...</Text>;

    return (
        <Stack gap="lg">
            {/* Header */}
            <Group justify="space-between">
                <Group>
                    <ActionIcon variant="subtle" color="gray" onClick={() => navigate(-1)}>
                        <IconArrowLeft />
                    </ActionIcon>
                    <Title order={3}>File : {queue.name}</Title>
                    <Badge color={queue.status === 'OUVERT' ? 'green' : 'gray'} size="lg">{queue.status}</Badge>
                </Group>
                <Group>
                    <Button variant="default" leftSection={<IconPlayerPause size={16} />}>
                        PAUSE SUR LA FILE
                    </Button>
                    <Button variant="light" color="red">
                        FERMER LA FILE
                    </Button>
                    <Button variant="default" leftSection={<IconSettings size={16} />}>
                        PARAMETRES
                    </Button>
                </Group>
            </Group>

            {/* Main Content */}
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">

                {/* Current Ticket Control */}
                <Paper withBorder p="xl" radius="md" style={{ textAlign: 'center' }}>
                    <Badge size="xl" variant="light" mb="xl">TICKET EN COURS</Badge>

                    {queue.activeTicket ? (
                        <>
                            <Text size="xl" fw={900} fz={80} lh={1} mb="md">{queue.activeTicket.ticketNumber}</Text>
                            <Text size="lg" fw={500}>CLIENT: {queue.activeTicket.name}</Text>
                            <Text c="dimmed" mb="xl">En service depuis : 0 min</Text>
                        </>
                    ) : (
                        <>
                            <Text size="xl" fw={900} fz={40} lh={1} mb="md" c="dimmed">--</Text>
                            <Text size="lg" fw={500} c="dimmed">Aucun ticket actif</Text>
                            <Text c="dimmed" mb="xl">Appelez le suivant pour commencer</Text>
                        </>
                    )}

                    <Button size="xl" fullWidth color="blue" mb="lg" onClick={handleCallNext} disabled={queue.waitlist.length === 0 && !queue.activeTicket}>
                        {queue.activeTicket ? 'TERMINER & APPELER SUIVANT' : 'APPELER LE PREMIER'}
                    </Button>

                    <Group grow>
                        <Button variant="default">RETOUR ARRIERE</Button>
                        <Button variant="default">SAUTER</Button>
                        <Button variant="outline" color="orange">PRIORITE</Button>
                    </Group>
                </Paper>

                {/* Waitlist */}
                <Paper withBorder p="md" radius="md">
                    <Group justify="space-between" mb="md">
                        <Title order={4}>Liste d'attente</Title>
                        <Text c="dimmed">{queue.waitlist.length} Personnes</Text>
                    </Group>
                    <Divider mb="md" />

                    <Stack>
                        {queue.waitlist.length > 0 ? queue.waitlist.map((person) => (
                            <Group key={person.id} justify="space-between" p="sm" style={{ borderBottom: '1px solid #eee' }}>
                                <div>
                                    <Text fw={700}>{person.ticketNumber}</Text>
                                    <Text size="sm" c="dimmed">{person.name}</Text>
                                </div>
                                <Text fw={500}>{person.waitTime}</Text>
                                <Group gap="xs">
                                    <Button size="xs" variant="outline" color="orange">PRIORITE</Button>
                                    <Button size="xs" variant="outline">Déplacer</Button>
                                </Group>
                            </Group>
                        )) : <Text ta="center" c="dimmed">Liste d'attente vide</Text>}
                    </Stack>
                </Paper>
            </SimpleGrid>
        </Stack>
    );
};

export default QueueDetail;
