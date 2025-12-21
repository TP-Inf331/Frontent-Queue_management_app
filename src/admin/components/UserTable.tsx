import React from 'react';
import { Table, Group, Text, ActionIcon, ScrollArea, Badge, Avatar } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

export interface UserRow {
    id: string;
    name: string;
    email: string;
    service: string;
    role: string;
    status: string;
}

interface UserTableProps {
    data: UserRow[];
    onEdit: (user: any) => void;
    onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ data, onEdit, onDelete }) => {
    const rows = (data || []).map((item) => (
        <Table.Tr
            key={item.id}
            onClick={() => onEdit(item)}
            style={{ cursor: 'pointer' }}
            className="hover:bg-slate-50 transition-colors"
        >
            <Table.Td>
                <Group gap="sm">
                    <Avatar color="blue" radius="xl">{item.name ? item.name.charAt(0) : 'U'}</Avatar>
                    <Text fz="sm" fw={500}>
                        {item.name}
                    </Text>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.email}</Text>
            </Table.Td>
            <Table.Td>
                <Badge
                    variant="light"
                    color={item.role === 'admin' ? 'red' : item.role === 'agent' ? 'blue' : 'gray'}
                >
                    {item.role.toUpperCase()}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.service}</Text>
            </Table.Td>
            <Table.Td>
                <Badge
                    color={item.status === 'Actif' ? 'green' : 'gray'}
                    variant="dot"
                >
                    {item.status}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Group wrap="nowrap" gap="xs">
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={(e) => { e.stopPropagation(); onEdit(item); }}
                    >
                        <IconPencil size="1rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                    >
                        <IconTrash size="1rem" stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea>
            <Table verticalSpacing="md" withTableBorder>
                <Table.Thead bg="gray.0">
                    <Table.Tr>
                        <Table.Th>Utilisateur</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Rôle</Table.Th>
                        <Table.Th>Service / File</Table.Th>
                        <Table.Th>Statut</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default UserTable;
