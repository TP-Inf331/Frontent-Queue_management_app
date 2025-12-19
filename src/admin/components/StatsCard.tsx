import React from 'react';
import { Paper, Group, Text, ThemeIcon, RingProgress, rem } from '@mantine/core';

interface StatsCardProps {
    title: string;
    value: string;
    icon: React.FC<any>;
    diff?: number;
    color?: string;
    progress: number;
}

export function StatsCard({ title, value, icon: Icon, diff, color = 'blue' }: StatsCardProps) {
    return (
        <Paper withBorder radius="md" p="lg" shadow="sm" className="transition-all duration-200 hover:shadow-md" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <ThemeIcon color={color} variant="white" size="xl" radius="md" mb="xs">
                <Icon style={{ width: rem(32), height: rem(32), color: 'var(--mantine-color-dark-9)' }} stroke={1.5} />
            </ThemeIcon>
            <Text fw={700} fz={28} c="blue.6">
                {value}
            </Text>
            <Text c="dimmed" fw={600} fz="sm" mt={4}>
                {title}
            </Text>
        </Paper>
    );
}
