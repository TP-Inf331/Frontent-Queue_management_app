import React from 'react';
import { Table, Group, Text, Badge, Button, ScrollArea, Paper } from '@mantine/core';

export interface QueueItem {
    id: string;
    name: string;
    status: 'OUVERT' | 'FERMÉE' | 'PAUSE';
    waiting: number;
    avgTime: string | null;
}

interface QueueListTableProps {
    data: QueueItem[];
    onManage: (id: string) => void;
    onOpen: (id: string) => void;
    onResume: (id: string) => void;
}

export const QueueListTable: React.FC<QueueListTableProps> = ({ data, onManage, onOpen, onResume }) => {
    const rows = data.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>
                <Text fw={500}>{item.name}</Text>
            </Table.Td>
            <Table.Td>
                <Badge
                    color={item.status === 'OUVERT' ? 'green' : item.status === 'FERMÉE' ? 'red' : 'yellow'}
                    variant={item.status === 'PAUSE' ? 'light' : 'filled'}
                >
                    {item.status}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Text>{item.waiting}</Text>
            </Table.Td>
            <Table.Td>
                <Text>{item.avgTime || '-'}</Text>
            </Table.Td>
            <Table.Td>
                {item.status === 'OUVERT' && (
                    <Button size="xs" radius="xl" bg="blue.6" onClick={() => onManage(item.id)}>
                        Gérer
                    </Button>
                )}
                {item.status === 'FERMÉE' && (
                    <Button size="xs" radius="xl" variant="outline" color="blue" onClick={() => onOpen(item.id)}>
                        Ouvrir
                    </Button>
                )}
                {item.status === 'PAUSE' && (
                    <Button size="xs" radius="xl" variant="outline" color="yellow" onClick={() => onResume(item.id)}>
                        Reprendre
                    </Button>
                )}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Paper withBorder radius="md" p="md">
            <Group justify="space-between" mb="md">
                <Text fw={700} size="lg">Listes des Files - Université de Yaoundé I</Text>
                <Text size="sm" c="blue" style={{ cursor: 'pointer' }}>Voir tout</Text>
            </Group>
            <ScrollArea>
                <Table verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>FILES</Table.Th>
                            <Table.Th>STATUT</Table.Th>
                            <Table.Th>EN ATTENTE</Table.Th>
                            <Table.Th>TEMPS MOYEN</Table.Th>
                            <Table.Th>ACTIONS</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </Paper>
    );
};
