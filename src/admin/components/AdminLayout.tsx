import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppShell, Burger, Group, Title, Avatar, ActionIcon, Indicator, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBell } from '@tabler/icons-react';
import { Sidebar } from './Sidebar';

const AdminLayout: React.FC = () => {
    const [opened, { toggle }] = useDisclosure();
    const navigate = useNavigate();

    const [user, setUser] = React.useState<{ name: string, email: string } | null>(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem('adminUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const displayName = user?.name || 'Admin';
    const displayEmail = user?.email || 'admin@nowait.com';
    const initials = displayName.substring(0, 2).toUpperCase();

    return (
        <AppShell
            layout="alt"
            header={{ height: 70 }}
            navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header border={false} bg="white">
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <IconBell className="hidden sm:block" style={{ width: '24px', height: '24px', color: '#1c3a6e' }} /> {/* Placeholder for logo or play icon */}
                        <Title order={4} fw={600} style={{ fontFamily: 'Inter, sans-serif' }}>Université de Yaoundé I</Title>
                    </Group>
                    <Group gap="lg">
                        <Indicator inline label=" " size={10} color="red" offset={4}>
                            <ActionIcon
                                variant="subtle"
                                color="gray"
                                size="lg"
                                onClick={() => navigate('/admin/notifications')}
                            >
                                <IconBell size="1.2rem" />
                            </ActionIcon>
                        </Indicator>
                        <Group gap="sm">
                            <Avatar color="blue" radius="xl" size="md">{initials}</Avatar>
                            <div style={{ lineHeight: 1.2 }}>
                                <Text size="sm" fw={600}>{displayName}</Text>
                                <Text size="xs" c="dimmed">{displayEmail}</Text>
                            </div>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p={0} bg="white" withBorder={false}>
                <Sidebar />
            </AppShell.Navbar>

            <AppShell.Main bg="#F8FAFC">
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export default AdminLayout;
