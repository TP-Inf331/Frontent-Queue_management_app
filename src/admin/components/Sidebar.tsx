import React from 'react';
import { NavLink } from 'react-router-dom';
import { Stack, Text, Group, rem, Box, Image } from '@mantine/core';
import { IconHome, IconClock, IconUsers, IconSettings, IconChartBar, IconLogout } from '@tabler/icons-react';

interface NavbarLinkProps {
    icon: React.FC<any>;
    label: string;
    to: string;
}

export function Sidebar() {
    return (
        <Stack justify="space-between" h="100%" bg="white" p="md" style={{ borderRight: '1px solid var(--mantine-color-gray-3)' }}>
            <Stack gap="lg">
                <Group mb="xl" px="sm">
                    <Group mb="xl" px="sm">
                        <Group gap="xs" style={{ display: 'flex', alignItems: 'center' }}>
                            <Image src="/logo.svg" w={30} h={30} fit="contain" />
                            <Text c="blue.6" fw={900} size="xl">NoWait</Text>
                        </Group>
                    </Group>
                </Group>

                <Stack gap="xs">
                    <NavbarLink icon={IconHome} label="Dashboard" to="/admin/dashboard" />
                    <NavbarLink icon={IconClock} label="Mes Files d'attente" to="/admin/queues" />
                    <NavbarLink icon={IconUsers} label="Agents" to="/admin/users" />
                    <NavbarLink icon={IconSettings} label="Paramètres" to="/admin/settings" />
                    <NavbarLink icon={IconChartBar} label="Statistiques" to="/admin/stats" />
                </Stack>
            </Stack>

            <Box p="sm">
                <Group>
                    <NavLink to="/admin/logout" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--mantine-color-gray-6)' }}>
                        <IconLogout style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                        <Text size="sm" fw={500}>Déconnexion</Text>
                    </NavLink>
                </Group>
            </Box>
        </Stack>
    );
}

function NavbarLink({ icon: Icon, label, to }: NavbarLinkProps) {
    return (
        <NavLink
            to={to}
            style={({ isActive }) => ({
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                color: isActive ? 'white' : 'var(--mantine-color-gray-6)',
                backgroundColor: isActive ? 'var(--mantine-color-blue-6)' : 'transparent',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 500,
                transition: 'all 0.2s ease',
            })}
        >
            <Group gap="sm">
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                <Text size="sm">{label}</Text>
            </Group>
        </NavLink>
    );
}
