import React, { useEffect } from 'react';
import { Paper, Title, Text, Button, Group, Badge, Stack, ActionIcon, Avatar, SimpleGrid, Divider, Loader } from '@mantine/core';
import { IconPlayerPause, IconSettings, IconArrowLeft, IconCheck, IconPlayerSkipForward, IconUsers } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { queueService } from '@/services/queue.service';
import { operationsService } from '@/services/operations.service';
import { authService } from '@/services/auth.service';
import { notificationService } from '@/services/notification.service';
import { useApi } from '@/hooks/useApi';

const QueueDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data: queue, loading, execute: fetchQueue } = useApi(() => queueService.getById(id!), {
        executeOnMount: !!id
    } as any);

    const { loading: callingNext, execute: callNext } = useApi(
        async () => {
            const ticket = await operationsService.callNext(id!);
            if (ticket && ticket.user_id) {
                try {
                    // Fetch user details to get email
                    const users = await authService.getAll();
                    const client = users.find(u => (u.id || u.user_id?.toString()) === ticket.user_id.toString());

                    if (client?.email) {
                        await notificationService.sendEmail(
                            client.email,
                            'C\'est votre tour ! - NoWait',
                            `📢 Bonjour ${client.full_name || client.nom || client.username},\n\nC\'est votre tour ! Votre ticket numéro A${(ticket.numero || ticket.ticket_number || 0).toString().padStart(3, '0')} est maintenant appelé au guichet.\n\nVeuillez vous présenter immédiatement.\n\nMerci de votre confiance.`
                        );
                    }
                } catch (err) {
                    console.error('Failed to send call notification email', err);
                }
            }
            return ticket;
        },
        {
            successMessage: 'Ticket suivant appelé !',
            onSuccess: () => fetchQueue()
        }
    );

    const { loading: updatingStatus, execute: updateStatus } = useApi(
        (active: boolean) => queueService.update(id!, { is_active: active }),
        {
            successMessage: 'Statut de la file mis à jour',
            onSuccess: () => fetchQueue()
        }
    );

    useEffect(() => {
        if (!id) return;
        const interval = setInterval(fetchQueue, 10000); // Polling every 10s
        return () => clearInterval(interval);
    }, [id, fetchQueue]);

    if (loading && !queue) return <div className="flex justify-center p-20"><Loader /></div>;
    if (!queue) return <Text>File introuvable.</Text>;

    const activeTicket = queue.active_ticket;
    const waitlist = queue.waitlist || [];

    return (
        <Stack gap="lg">
            {/* Header */}
            <Group justify="space-between">
                <Group>
                    <ActionIcon variant="subtle" color="gray" onClick={() => navigate('/admin/queues')}>
                        <IconArrowLeft />
                    </ActionIcon>
                    <Title order={3}>File : {queue.name}</Title>
                    <Badge color={queue.is_active ? 'green' : 'gray'} size="lg">
                        {queue.is_active ? 'OUVERT' : 'FERMÉ'}
                    </Badge>
                </Group>
                <Group>
                    <Button
                        variant="light"
                        color={queue.is_active ? 'orange' : 'green'}
                        leftSection={<IconPlayerPause size={16} />}
                        onClick={() => updateStatus(!queue.is_active)}
                        loading={updatingStatus}
                    >
                        {queue.is_active ? 'METTRE EN PAUSE' : 'REPRENDRE'}
                    </Button>
                    <Button variant="default" leftSection={<IconSettings size={16} />}>
                        PARAMETRES
                    </Button>
                </Group>
            </Group>

            {/* Main Content */}
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">

                {/* Current Ticket Control */}
                <Paper withBorder p="xl" radius="md" shadow="sm" className="flex flex-col items-center">
                    <Badge size="xl" variant="dot" color="blue" mb="xl">TICKET EN COURS</Badge>

                    {activeTicket ? (
                        <>
                            <Text size="xl" fw={900} fz={100} lh={1} mb="md" className="text-blue-600">
                                A{activeTicket.ticket_number.toString().padStart(3, '0')}
                            </Text>
                            <Text size="lg" fw={700} mb="xs">CLIENT: {activeTicket.user_id}</Text>
                            <Text c="dimmed" mb="xl">En service depuis : {Math.floor((Date.now() - new Date(activeTicket.called_at || activeTicket.created_at).getTime()) / 60000)} min</Text>
                        </>
                    ) : (
                        <>
                            <Text size="xl" fw={900} fz={60} lh={1} mb="md" c="dimmed">--</Text>
                            <Text size="lg" fw={500} c="dimmed">Aucun ticket actif</Text>
                            <Text c="dimmed" mb="xl">Appelez le suivant pour commencer</Text>
                        </>
                    )}

                    <Button
                        size="xl"
                        fullWidth
                        color="blue"
                        mb="lg"
                        radius="md"
                        onClick={() => callNext()}
                        disabled={callingNext || (waitlist.length === 0 && !activeTicket)}
                        leftSection={<IconCheck size={24} />}
                    >
                        {activeTicket ? 'TERMINER & APPELER SUIVANT' : 'APPELER LE PREMIER'}
                    </Button>

                    <Group grow w="100%">
                        <Button variant="default" leftSection={<IconPlayerSkipForward size={16} />}>SAUTER</Button>
                        <Button variant="outline" color="orange">PRIORITE</Button>
                    </Group>
                </Paper>

                {/* Waitlist */}
                <Paper withBorder p="md" radius="md" shadow="sm">
                    <Group justify="space-between" mb="md">
                        <Title order={4}>Liste d'attente</Title>
                        <Badge color="blue">{waitlist.length} Personnes</Badge>
                    </Group>
                    <Divider mb="md" />

                    <Stack gap="xs">
                        {waitlist.length > 0 ? waitlist.map((ticket, index) => (
                            <Group key={ticket.id} justify="space-between" p="sm" className="bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <Group gap="sm">
                                    <Avatar color="blue" radius="xl">{index + 1}</Avatar>
                                    <div>
                                        <Text fw={800} size="lg">A{ticket.ticket_number.toString().padStart(3, '0')}</Text>
                                        <Text size="xs" c="dimmed">{new Date(ticket.created_at).toLocaleTimeString()}</Text>
                                    </div>
                                </Group>
                                <Group gap="xs">
                                    <Button size="xs" variant="subtle" color="orange">PRIORITE</Button>
                                    <ActionIcon variant="subtle" color="red"><IconPlayerSkipForward size={14} /></ActionIcon>
                                </Group>
                            </Group>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-10 opacity-50">
                                <IconUsers size={40} />
                                <Text mt="sm">Liste d'attente vide</Text>
                            </div>
                        )}
                    </Stack>
                </Paper>
            </SimpleGrid>
        </Stack>
    );
};

export default QueueDetail;
