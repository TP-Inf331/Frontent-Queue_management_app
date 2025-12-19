import React, { useState } from 'react';
import { Title, Group, Button, Container, TextInput, Paper } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import UserTable, { User } from '../components/UserTable';

const initialUsers: User[] = [
    {
        id: '1',
        name: 'Nalela Melvis',
        email: 'admin1@umary.com',
        service: 'Service Scolarité',
        status: 'En ligne',
    },
    {
        id: '2',
        name: 'Nkè Calkite',
        email: 'admin2@umary.com',
        service: '-',
        status: 'Hors ligne',
    },
    {
        id: '3',
        name: 'Kebjou Marie',
        email: 'admin3@umary.com',
        service: '-',
        status: 'En pause',
    },
];

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [search, setSearch] = useState('');

    const handleEdit = (user: User) => {
        console.log('Edit user:', user);
    };

    const handleDelete = (id: string) => {
        if (!window.confirm('Supprimer cet agent ?')) return;
        setUsers((prev) => prev.filter((user) => user.id !== id));
    };

    const filteredUsers = users.filter((user) => {
        const q = search.toLowerCase();
        return (
            user.name.toLowerCase().includes(q) ||
            user.email.toLowerCase().includes(q) ||
            (user.service || '').toLowerCase().includes(q) ||
            (user.status || '').toLowerCase().includes(q)
        );
    });

    return (
        <Container fluid>
            <Group justify="space-between" mb="lg">
                <Title order={2}>Gestion des Agents</Title>
            </Group>

            <Paper p="md" mb="lg" radius="md">
                <Group justify="space-between">
                    <TextInput
                        placeholder="Rechercher un agent..."
                        leftSection={<IconSearch size={16} />}
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        style={{ flex: 1, maxWidth: '400px' }}
                    />
                    <Button leftSection={<IconPlus size={16} />} color="orange">
                        Ajouter un agent
                    </Button>
                </Group>
            </Paper>

            <Paper p="md" radius="md" shadow="sm">
                <UserTable data={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
            </Paper>
        </Container>
    );
};

export default Users;
