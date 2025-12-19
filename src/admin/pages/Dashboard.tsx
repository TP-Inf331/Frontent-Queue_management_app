import React, { useState } from 'react';
import { SimpleGrid, Stack, Button, Group, Paper, Text, ThemeIcon, Badge } from '@mantine/core';
import { IconUsers, IconClock, IconHourglassHigh } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { StatsCard } from '../components/StatsCard';
import { QueueListTable } from '../components/QueueListTable';
import { WelcomeBanner } from '../components/WelcomeBanner';
import { queueService, QueueItem } from '../utils/queueService';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [queues, setQueues] = useState<QueueItem[]>([]);
    const [user, setUser] = useState<{ name: string; email?: string; enterpriseName?: string; enterpriseType?: string } | null>(null);
    const [enterprise, setEnterprise] = useState<{ name: string; type?: string } | null>(null);

    const loadQueues = async () => {
        try {
            const data = await queueService.getAll();
            setQueues(data);
        } catch (error) {
            console.error("Failed to load queues", error);
        }
    };

    React.useEffect(() => {
        // Load User
        const storedUser = localStorage.getItem('adminUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedEnterprise = localStorage.getItem('adminEnterprise');
        if (storedEnterprise) {
            try {
                setEnterprise(JSON.parse(storedEnterprise));
            } catch (error) {
                console.error('Failed to parse enterprise from storage', error);
            }
        }

        // Load Queues
        loadQueues();
    }, []);

    const displayName = user?.name || 'Admin';
    const enterpriseName = enterprise?.name || user?.enterpriseName;
    const enterpriseType = enterprise?.type || user?.enterpriseType;

    const activeQueuesCount = queues.filter(q => q.status === 'OUVERT').length;
    const pausedQueuesCount = queues.filter(q => q.status === 'PAUSE').length;

    // Interpreting "soon leaving" roughly as those with low wait time
    const soonLeavingCount = queues.filter(q => q.waiting > 0 && q.avgTime && parseInt(q.avgTime) < 10).length;

    return (
        <Stack gap="lg">
            <WelcomeBanner name={displayName} enterpriseName={enterpriseName} enterpriseType={enterpriseType} />

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
                <StatsCard title="Files actives" value={activeQueuesCount.toString()} icon={IconUsers} color="blue" />
                <StatsCard title="Files en pause" value={pausedQueuesCount.toString()} icon={IconHourglassHigh} color="orange" />
                <StatsCard title="Bientôt terminées" value={soonLeavingCount.toString()} icon={IconClock} color="green" />
            </SimpleGrid>

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

            <Group justify="center" mt="md">
                <Button size="lg" radius="md" fullWidth color="blue" style={{ maxWidth: '600px' }} onClick={() => navigate('/admin/create-queue')}>
                    + CREER UNE NOUVELLE FILE
                </Button>
            </Group>
        </Stack>
    );
};

export default AdminDashboard;
