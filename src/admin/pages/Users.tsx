import React, { useState, useEffect } from 'react';
import { Title, Group, Button, Container, TextInput, Paper, Modal, Stack, PasswordInput, Select, Loader, Text } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';
import UserTable from '../components/UserTable';
import { authService } from '@/services/auth.service';
import { queueService } from '@/services/queue.service';
import { useApi } from '@/hooks/useApi';
import { User, UserRole } from '@/interface/api.interface';

const Users: React.FC = () => {
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    // Form states
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<UserRole>('agent');
    const [managedQueueId, setManagedQueueId] = useState<string | null>(null);

    const { data: users, loading: loadingUsers, execute: fetchUsers } = useApi(authService.getAll);
    const { data: queues, execute: fetchQueues } = useApi(queueService.getAll);

    const { loading: saving, execute: saveUser } = useApi(
        async () => {
            const userData = {
                username,
                email,
                full_name: fullName,
                nom: fullName,
                role,
                managed_queue_id: managedQueueId || undefined,
                mot_de_passe: password
            };
            if (editingUser) {
                return authService.update(editingUser.id, userData);
            } else {
                return authService.register(userData);
            }
        },
        {
            successMessage: editingUser ? 'Agent mis à jour avec succès' : 'Agent ajouté avec succès',
            onSuccess: () => {
                setIsModalOpen(false);
                fetchUsers();
                resetForm();
            }
        }
    );

    const { execute: deleteUser } = useApi(authService.delete, {
        successMessage: 'Agent supprimé avec succès',
        onSuccess: () => fetchUsers()
    });

    useEffect(() => {
        fetchUsers();
        fetchQueues();
    }, [fetchUsers, fetchQueues]);

    const resetForm = () => {
        setEditingUser(null);
        setUsername('');
        setEmail('');
        setPassword('');
        setFullName('');
        setRole('agent');
        setManagedQueueId(null);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setUsername(user.username || '');
        setEmail(user.email);
        setFullName(user.full_name || user.nom || '');
        setRole(user.role);
        setManagedQueueId(user.managed_queue_id?.toString() || null);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Etes-vous sûr de vouloir supprimer cet agent ?')) {
            deleteUser(id);
        }
    };

    const filteredUsers = (users || [])
        .filter((user) => {
            const q = search.toLowerCase();
            return (
                (user.username || '').toLowerCase().includes(q) ||
                (user.email || '').toLowerCase().includes(q) ||
                (user.full_name || user.nom || '').toLowerCase().includes(q)
            );
        })
        .map(u => {
            const managedQueue = queues?.find(q => q.id === u.managed_queue_id?.toString());
            return {
                id: u.id || u.user_id?.toString() || Math.random().toString(),
                name: u.full_name || u.nom || u.username || 'Utilisateur',
                email: u.email || 'Pas d\'email',
                role: u.role || 'client',
                service: managedQueue ? (managedQueue.nom || managedQueue.name || 'Service') : (u.role === 'client' ? 'Client (NoWait)' : 'Aucun service'),
                status: 'Actif'
            };
        });

    return (
        <Container fluid>
            <Group justify="space-between" mb="lg">
                <Title order={2}>Gestion des Agents</Title>
            </Group>

            <Paper p="md" mb="lg" radius="md" withBorder>
                <Group justify="space-between">
                    <TextInput
                        placeholder="Rechercher un agent..."
                        leftSection={<IconSearch size={16} />}
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        style={{ flex: 1, maxWidth: '400px' }}
                    />
                    <Button
                        leftSection={<IconPlus size={16} />}
                        color="blue"
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                    >
                        Ajouter un agent
                    </Button>
                </Group>
            </Paper>

            <Paper p="md" radius="md" shadow="sm" withBorder>
                {loadingUsers && !users ? (
                    <Group justify="center" py="xl"><Loader /></Group>
                ) : filteredUsers.length > 0 ? (
                    <UserTable data={filteredUsers} onEdit={(row: any) => {
                        const original = users?.find(u => (u.id || u.user_id?.toString()) === row.id);
                        if (original) handleEdit(original);
                    }} onDelete={handleDelete} />
                ) : (
                    <Stack align="center" py="xl">
                        <Text c="dimmed">{users ? "Aucun agent trouvé avec ces critères." : "Chargement des agents..."}</Text>
                        {search && (
                            <Button variant="subtle" onClick={() => setSearch('')}>Effacer la recherche</Button>
                        )}
                    </Stack>
                )}
            </Paper>

            <Modal
                opened={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingUser ? 'Modifier l\'agent' : 'Ajouter un agent'}
                centered
                size="md"
            >
                <form onSubmit={(e) => { e.preventDefault(); saveUser(); }}>
                    <Stack gap="md">
                        <TextInput
                            label="Nom complet"
                            placeholder="John Doe"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.currentTarget.value)}
                        />
                        <TextInput
                            label="Email"
                            placeholder="agent@nowait.com"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                        <TextInput
                            label="Username"
                            placeholder="johndoe"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                        />
                        {!editingUser && (
                            <PasswordInput
                                label="Mot de passe"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                        )}
                        <Select
                            label="Rôle"
                            data={[
                                { value: 'agent', label: 'Agent' },
                                { value: 'admin', label: 'Administrateur' },
                            ]}
                            value={role}
                            onChange={(val) => setRole(val as UserRole)}
                            required
                        />
                        {role === 'agent' && (
                            <Select
                                label="File gérée"
                                placeholder="Sélectionner une file"
                                data={(queues || []).map(q => ({ value: q.id!.toString(), label: q.name! }))}
                                value={managedQueueId}
                                onChange={setManagedQueueId}
                                clearable
                            />
                        )}
                        <Button type="submit" fullWidth mt="md" loading={saving} size="md">
                            {editingUser ? 'Enregistrer les modifications' : 'Créer l\'agent'}
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </Container>
    );
};

export default Users;
