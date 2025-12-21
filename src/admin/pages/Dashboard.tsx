import React, { useState, useEffect } from 'react';
import { SimpleGrid, Stack, Button, Group, Loader, Modal, TextInput, NumberInput } from '@mantine/core';
import { IconUsers, IconClock, IconHourglassHigh, IconTrash, IconDeviceFloppy, IconList, IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { StatsCard } from '../components/StatsCard';
import { QueueListTable } from '../components/QueueListTable';
import { WelcomeBanner } from '../components/WelcomeBanner';
import { queueService } from '@/services/queue.service';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useApi } from '@/hooks/useApi';
import { Queue } from '@/interface/api.interface';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQueue, setSelectedQueue] = useState<Queue | null>(null);

    // Edit form states
    const [queueName, setQueueName] = useState('');
    const [institution, setInstitution] = useState('');
    const [capacity, setCapacity] = useState<number | string>(50);

    const { data: queues, loading: loadingQueues, execute: fetchQueues } = useApi(queueService.getAll);
    const { data: users, execute: fetchUsers } = useApi(authService.getAll);

    const { loading: saving, execute: updateQueue } = useApi(
        async () => {
            if (!selectedQueue?.id) return;
            return queueService.update(selectedQueue.id, {
                nom: queueName,
                institution: institution,
                max_capacity: Number(capacity)
            });
        },
        {
            successMessage: 'File mise à jour avec succès',
            onSuccess: () => {
                setIsModalOpen(false);
                fetchQueues();
            }
        }
    );

    const { loading: deleting, execute: deleteQueue } = useApi(
        async () => {
            if (!selectedQueue?.id) return;
            return queueService.delete(selectedQueue.id);
        },
        {
            successMessage: 'File supprimée avec succès',
            onSuccess: () => {
                setIsModalOpen(false);
                fetchQueues();
            }
        }
    );

    useEffect(() => {
        fetchQueues();
        fetchUsers();
        const interval = setInterval(() => {
            fetchQueues();
            fetchUsers();
        }, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, [fetchQueues, fetchUsers]);

    const activeQueuesCount = (queues || []).filter(q => q.is_active).length;
    const waitingTotal = (queues || []).reduce((acc, q) => acc + (q.waiting_count || 0), 0);
    const agentsCount = (users || []).filter(u => u.role === 'agent').length;

    const handleManage = (id: string) => {
        const queue = queues?.find(q => q.id === id);
        if (queue) {
            setSelectedQueue(queue);
            setQueueName(queue.nom || queue.name || '');
            setInstitution(queue.institution || '');
            setCapacity(queue.max_capacity || 50);
            setIsModalOpen(true);
        }
    };

    const handleDelete = () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer la file "${queueName}" ?`)) {
            deleteQueue();
        }
    };

    // Transforming Queue to QueueItem interface expected by QueueListTable
    const tableData = (queues || []).map(q => ({
        id: q.id!,
        name: q.nom || q.name || 'Sans nom',
        status: (q.is_active ? 'OUVERT' : 'FERMÉE') as any,
        waiting: q.waiting_count || 0,
        avgTime: '5 min',
    }));

    return (
        <Stack gap="lg">
            <WelcomeBanner
                name={user?.full_name || user?.nom || user?.username || 'Admin'}
                enterpriseName="NoWait System"
                enterpriseType="Infrastructure"
            />

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
                <StatsCard title="Files actives" value={activeQueuesCount.toString()} icon={IconList} color="blue" />
                <StatsCard title="Agents actifs" value={agentsCount.toString()} icon={IconUsers} color="cyan" />
                <StatsCard title="Total en attente" value={waitingTotal.toString()} icon={IconHourglassHigh} color="orange" />
                <StatsCard title="Temps moyen" value="~8 min" icon={IconClock} color="green" />
            </SimpleGrid>

            {loadingQueues && !queues ? (
                <div className="flex justify-center p-8"><Loader /></div>
            ) : (
                <QueueListTable
                    data={tableData}
                    onManage={handleManage}
                    onOpen={async (id) => {
                        await queueService.update(id, { is_active: true });
                        fetchQueues();
                    }}
                    onResume={async (id) => {
                        await queueService.update(id, { is_active: true });
                        fetchQueues();
                    }}
                />
            )}

            <Group justify="center" mt="md">
                <Button size="lg" radius="md" fullWidth color="blue" style={{ maxWidth: '600px' }} onClick={() => navigate('/admin/create-queue')}>
                    + CREER UNE NOUVELLE FILE
                </Button>
            </Group>

            <Modal
                opened={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Gérer la file d'attente"
                centered
                size="md"
            >
                <Stack gap="md">
                    <TextInput
                        label="Nom de la file"
                        placeholder="Ex: Service Facturation"
                        value={queueName}
                        onChange={(e) => setQueueName(e.currentTarget.value)}
                        required
                    />
                    <TextInput
                        label="Institution"
                        placeholder="Ex: Banque Centrale"
                        value={institution}
                        onChange={(e) => setInstitution(e.currentTarget.value)}
                        required
                    />
                    <NumberInput
                        label="Capacité maximale"
                        value={capacity}
                        onChange={setCapacity}
                        min={1}
                        required
                    />

                    <Group justify="space-between" mt="xl">
                        <Button
                            variant="subtle"
                            color="red"
                            leftSection={<IconTrash size={16} />}
                            onClick={handleDelete}
                            loading={deleting}
                        >
                            Supprimer
                        </Button>
                        <Button
                            color="blue"
                            leftSection={<IconDeviceFloppy size={16} />}
                            onClick={() => updateQueue()}
                            loading={saving}
                        >
                            Enregistrer
                        </Button>
                    </Group>

                    <Button
                        variant="light"
                        fullWidth
                        onClick={() => navigate(`/admin/queues/${selectedQueue?.id}`)}
                    >
                        Voir les détails du ticket & Appeler le suivant
                    </Button>
                </Stack>
            </Modal>
        </Stack>
    );
};

export default AdminDashboard;
