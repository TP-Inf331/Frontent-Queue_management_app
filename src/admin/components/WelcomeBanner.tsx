import React from 'react';
import { Paper, Title, Text, Box } from '@mantine/core';

interface WelcomeBannerProps {
    name: string;
    enterpriseName?: string;
    enterpriseType?: string;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ name, enterpriseName, enterpriseType }) => {
    return (
        <Paper
            radius="md"
            p="xl"
            mb="lg"
            bg="blue.6"
            style={{
                color: 'white',
                background: 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)',
            }}
        >
            <Box>
                <Title order={2} mb="xs">
                    Bienvenue, {enterpriseName || name} !
                </Title>
                {enterpriseName && (
                    <Text size="sm" c="blue.0" fw={500}>
                        Vous gérez : {enterpriseName}
                        {enterpriseType ? ` · ${enterpriseType}` : ''}
                    </Text>
                )}
                {!enterpriseName && (
                    <Text size="sm" c="blue.0" fw={500}>
                        Here is the administrator dashboard.
                    </Text>
                )}
            </Box>
        </Paper>
    );
};
