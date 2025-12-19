import React, { useState } from 'react';
import { Stack, Title, Button, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { QueueListTable } from '../components/QueueListTable';
import { queueService, QueueItem } from '../utils/queueService';

const Queues: React.FC = () => {
    const navigate = useNavigate();
    const [queues, setQueues] = useState<QueueItem[]>([]);

    const loadQueues = async () => {
        try {
            const data = await queueService.getAll();
            setQueues(data);
        } catch (error) {
            console.error("Failed to load queues", error);
        }
    };

    React.useEffect(() => {
        loadQueues();
    }, []);

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

            <QueueListTable
                data={queues}
                onManage={(id) => navigate(`/admin/queues/${id}`)}
                onOpen={async (id) => {
                    await queueService.update(id, { status: 'OUVERT' });
                    loadQueues();
                }}
                onResume={async (id) => {
                    await queueService.update(id, { status: 'OUVERT' });
                    loadQueues();
                }}
            />
        </Stack>
    );
};

export default Queues;
