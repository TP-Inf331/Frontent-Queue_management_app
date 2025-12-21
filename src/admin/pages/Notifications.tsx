import React, { useState } from 'react';
import { Container, Title, Paper, Table, Text, Badge, Group, ActionIcon, Modal, Stack, ScrollArea } from '@mantine/core';
import { IconEye, IconBell, IconUser, IconClock, IconCalendar } from '@tabler/icons-react';

interface NotificationHistory {
    id: string;
    clientName: string;
    email: string;
    type: 'TICKET_CREATED' | 'TICKET_CALLED' | 'TICKET_COMPLETED' | 'DELAY';
    content: string;
    sentAt: string;
    status: 'SENT' | 'FAILED';
}

const mockNotifications: NotificationHistory[] = [
    {
        id: '1',
        clientName: 'Sama Elias',
        email: 'sama@gmail.com',
        type: 'TICKET_CREATED',
        content: 'Votre ticket A001 a été créé pour la file "Service Scolarité".',
        sentAt: '2025-12-21 14:30',
        status: 'SENT',
    },
    {
        id: '2',
        clientName: 'John Doe',
        email: 'john@example.com',
        type: 'TICKET_CALLED',
        content: '📢 C\'est votre tour ! Veuillez vous présenter au guichet.',
        sentAt: '2025-12-21 14:45',
        status: 'SENT',
    },
    {
        id: '3',
        clientName: 'Kenwou Loi Barthez',
        email: 'barthez@gmail.com',
        type: 'DELAY',
        content: 'Désolé, un retard de 15 minutes est à prévoir sur votre file.',
        sentAt: '2025-12-21 15:00',
        status: 'SENT',
    }
];

const Notifications: React.FC = () => {
    const [selectedNotif, setSelectedNotif] = useState<NotificationHistory | null>(null);

    const getBadge = (type: string) => {
        switch (type) {
            case 'TICKET_CREATED': return <Badge color="blue">Création</Badge>;
            case 'TICKET_CALLED': return <Badge color="green">Appel</Badge>;
            case 'TICKET_COMPLETED': return <Badge color="gray">Terminé</Badge>;
            case 'DELAY': return <Badge color="orange">Retard</Badge>;
            default: return <Badge color="gray">{type}</Badge>;
        }
    };

    return (
        <Container fluid>
            <Group justify="space-between" mb="lg">
                <Title order={2}>Historique des Notifications</Title>
            </Group>

            <Paper p="md" radius="md" withBorder shadow="sm">
                <ScrollArea>
                    <Table verticalSpacing="md" withTableBorder>
                        <Table.Thead bg="gray.0">
                            <Table.Tr>
                                <Table.Th>Client</Table.Th>
                                <Table.Th>Type</Table.Th>
                                <Table.Th>Date d'envoi</Table.Th>
                                <Table.Th>Statut</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {mockNotifications.map((notif) => (
                                <Table.Tr key={notif.id}>
                                    <Table.Td>
                                        <Group gap="sm">
                                            <IconUser size={16} color="gray" />
                                            <div>
                                                <Text size="sm" fw={500}>{notif.clientName}</Text>
                                                <Text size="xs" c="dimmed">{notif.email}</Text>
                                            </div>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>{getBadge(notif.type)}</Table.Td>
                                    <Table.Td>
                                        <Group gap="xs">
                                            <IconClock size={14} color="gray" />
                                            <Text size="sm">{notif.sentAt}</Text>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge variant="dot" color={notif.status === 'SENT' ? 'green' : 'red'}>
                                            {notif.status === 'SENT' ? 'Envoyé' : 'Échec'}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        <ActionIcon variant="light" color="blue" onClick={() => setSelectedNotif(notif)}>
                                            <IconEye size={16} />
                                        </ActionIcon>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Paper>

            <Modal
                opened={!!selectedNotif}
                onClose={() => setSelectedNotif(null)}
                title="Détails de la Notification"
                centered
                size="md"
            >
                {selectedNotif && (
                    <Stack gap="md">
                        <Group>
                            <IconCalendar size={18} color="gray" />
                            <Text size="sm" fw={600}>Envoyé le : {selectedNotif.sentAt}</Text>
                        </Group>
                        <Group>
                            <IconUser size={18} color="gray" />
                            <Text size="sm" fw={600}>Destinataire : {selectedNotif.clientName} ({selectedNotif.email})</Text>
                        </Group>
                        <Paper p="md" bg="blue.0" radius="md">
                            <Text size="sm" fw={700} mb="xs">Contenu du message :</Text>
                            <Text size="sm" style={{ fontStyle: 'italic' }}>
                                "{selectedNotif.content}"
                            </Text>
                        </Paper>
                        <Text size="xs" c="dimmed">
                            Cette notification a été envoyée par email (Gmail) et via l'application.
                        </Text>
                    </Stack>
                )}
            </Modal>
        </Container>
    );
};

export default Notifications;
