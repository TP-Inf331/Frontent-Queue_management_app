import React, { useState, useEffect } from 'react';
import { Stack, Title, Button, Group, Modal, TextInput, NumberInput, Loader } from '@mantine/core';
import { IconPlus, IconTrash, IconDeviceFloppy } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { QueueListTable } from '../components/QueueListTable';
import { queueService } from '@/services/queue.service';
import { Queue } from '@/interface/api.interface';
import { useApi } from '@/hooks/useApi';

const Queues: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQueue, setSelectedQueue] = useState<Queue | null>(null);

    // Edit form states
    const [queueName, setQueueName] = useState('');
    const [institution, setInstitution] = useState('');
    const [capacity, setCapacity] = useState<number | string>(50);

    const { data: queues, loading: loadingQueues, execute: fetchQueues } = useApi(queueService.getAll);

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
    }, [fetchQueues]);

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

    const tableData = (queues || []).map(q => ({
        id: q.id!,
        name: q.nom || q.name || 'Sans nom',
        status: (q.is_active ? 'OUVERT' : 'FERMÉE') as any,
        waiting: q.waiting_count || 0,
        avgTime: '5 min',
    }));

    return (
        <Stack gap="lg">
            <Group justify="space-between" mb="md">
                <Title order={2}>Mes Files d'attente</Title>
                <Button
                    leftSection={<IconPlus size={20} />}
                    color="blue"
                    onClick={() => navigate('/admin/create-queue')}
                >
                    Nouvelle File
                </Button>
            </Group>

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
                        Accéder aux tickets & Appeler le suivant
                    </Button>
                </Stack>
            </Modal>
        </Stack>
    );
};

export default Queues;
