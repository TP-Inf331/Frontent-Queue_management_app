
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Center,
} from '@mantine/core';

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        setError('');
        if (password === 'admin1234') {
            localStorage.setItem('adminToken', 'true');
            // Extract name from email (e.g., admin@example.com -> Admin) or use a default
            const name = email.split('@')[0];
            const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

            const userInfo = {
                name: formattedName,
                email: email
            };
            localStorage.setItem('adminUser', JSON.stringify(userInfo));

            navigate('/admin/dashboard');
        } else {
            setError('Invalid password');
        }
    }

    return (
        <Container size={420} my={40}>
            <Center mb="md">
                <Group gap="xs" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/logo.svg" alt="NoWait Logo" style={{ width: 40, height: 40 }} />
                    <Title ta="center" className="text-blue-600 font-bold">
                        NoWait
                    </Title>
                </Group>
            </Center>

            <Title ta="center" className="font-sans font-extrabold text-2xl text-foreground">
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Admin Access Portal
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="Email"
                    placeholder="admin@nowait.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    error={error}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleLogin();
                    }}
                />

                <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>

                <Button fullWidth mt="xl" onClick={handleLogin}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
};

export default AdminLogin;
