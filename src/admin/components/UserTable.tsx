import React from 'react';
import { Table, Group, Text, ActionIcon, ScrollArea, Badge, Avatar } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

export interface User {
    id: string;
    name: string;
    email: string;
    service: string;
    status: string;
}

interface UserTableProps {
    data: User[];
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ data, onEdit, onDelete }) => {
    const rows = data.map((item) => (
        <Table.Tr key={item.id}>
            <Table.Td>
                <Group gap="sm">
                    <Avatar color="blue" radius="xl">{item.name.charAt(0)}</Avatar>
                    <Text fz="sm" fw={500}>
                        {item.name}
                    </Text>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.email}</Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.service}</Text>
            </Table.Td>
            <Table.Td>
                <Badge
                    color={
                        item.status.toLowerCase().includes('ligne') || item.status.toLowerCase().includes('online')
                            ? 'green'
                            : item.status.toLowerCase().includes('occup')
                            ? 'red'
                            : 'gray'
                    }
                    variant="light"
                >
                    {item.status}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Group transform="nowrap" gap="xs">
                    <ActionIcon variant="subtle" color="gray" onClick={() => onEdit(item)}>
                        <IconPencil size="1rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red" onClick={() => onDelete(item.id)}>
                        <IconTrash size="1rem" stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="md" withTableBorder>
                <Table.Thead bg="gray.0">
                    <Table.Tr>
                        <Table.Th>Agent Name</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Service</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </ScrollArea>
    );
};

export default UserTable;
