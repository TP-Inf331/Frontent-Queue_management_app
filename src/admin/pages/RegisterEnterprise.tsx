import React, { useState } from 'react';
import {
    Container,
    Paper,
    TextInput,
    PasswordInput,
    Select,
    Checkbox,
    Button,
    Text,
    Group,
    Title,
    Stack,
    Image,
    Loader,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';
import { useApi } from '@/hooks/useApi';
import { useAuthStore } from '@/stores/auth.store';

const enterpriseTypes = [
    { value: 'hospital', label: 'Hôpital' },
    { value: 'clinic', label: 'Clinique' },
    { value: 'university', label: 'Université' },
    { value: 'administration', label: 'Administration publique' },
    { value: 'private', label: 'Entreprise privée' },
    { value: 'other', label: 'Autre' },
];

const RegisterEnterprise: React.FC = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [enterpriseName, setEnterpriseName] = useState('');
    const [enterpriseType, setEnterpriseType] = useState<string | null>(null);
    const [adminUsername, setAdminUsername] = useState('');
    const [adminEmail, setAdminEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setLocalError] = useState<string | null>(null);

    const { loading, execute: register } = useApi(authService.register, {
        successMessage: 'Enterprise registered successfully!',
        onSuccess: async (user) => {
            // After registration, we need to login to get the token
            try {
                const response = await authService.login(adminUsername, password);
                setAuth(response.user, response.access_token);
                navigate('/admin/dashboard');
            } catch (err) {
                navigate('/admin/login');
            }
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (!enterpriseType) {
            setLocalError('Veuillez sélectionner un type d’établissement.');
            return;
        }

        if (!acceptTerms) {
            setLocalError('Vous devez accepter les conditions d’utilisation pour continuer.');
            return;
        }

        register({
            username: adminUsername,
            email: adminEmail,
            password: password,
            full_name: enterpriseName, // Using enterprise name as full name for the admin user for now or handled by backend
            role: 'admin',
        });
    };

    return (
        <div className="h-screen bg-white flex items-center justify-center">
            <div className="flex w-full h-full">
                {/* Left marketing panel */}
                <div className="hidden lg:flex w-1/2 flex-col items-center justify-center px-12 "
                    style={{ backgroundImage: "url('/bgRegister.png')", backgroundSize: 'cover' }}
                >
                    <div className="flex flex-col items-center text-center gap-6">
                        <Text
                            fw={700}
                            className="leading-snug text-[#0158FC]"
                            style={{ fontSize: 30 }}
                        >
                            Optimisez
                            <br />
                            vos files d’attente
                            <br />
                            dès maintenant
                        </Text>
                        <div className="mt-6 max-w-sm">
                            <Image
                                src="/images/register.svg"
                                alt="NoWait - Gestion des files d’attente"
                                radius="md"
                                className="w-full drop-shadow-[0_24px_60px_rgba(15,23,42,0.9)]"
                            />
                        </div>
                    </div>
                </div>

                {/* Right registration panel */}
                <div className="w-full lg:w-1/2 bg-white text-slate-900 flex items-center justify-center rounded-none lg:rounded-l-[80px]">
                    <Container size={520} px="xl">
                        <Paper
                            radius="xl"
                            shadow="xl"
                            p="xl"
                            withBorder
                            className="border-slate-100"
                            style={{ borderWidth: 1.5 }}
                        >
                            <Stack gap="lg">
                                <Group justify="space-between" mb={4}>
                                    <Group gap="xs">
                                        <img src="/logo.svg" alt="NoWait Logo" style={{ width: 34, height: 34 }} />
                                        <Text fw={700} size="lg" className="text-[#1c3a6e]">
                                            NoWait
                                        </Text>
                                    </Group>
                                </Group>

                                <Title order={2} className="text-[22px] font-extrabold tracking-wide text-[#1c3a6e] uppercase">
                                    Inscrire votre entreprise
                                </Title>

                                <form onSubmit={handleSubmit}>
                                    <Stack gap="md">
                                        <Select
                                            label="Type d’établissement"
                                            placeholder="Sélectionner"
                                            data={enterpriseTypes}
                                            required
                                            value={enterpriseType}
                                            onChange={setEnterpriseType}
                                        />
                                        <TextInput
                                            label="Nom de l’entreprise"
                                            placeholder="Ex : Université de Yaoundé I"
                                            required
                                            value={enterpriseName}
                                            onChange={(e) => setEnterpriseName(e.currentTarget.value)}
                                        />
                                        <TextInput
                                            label="Username Administrateur"
                                            placeholder="admin_username"
                                            required
                                            value={adminUsername}
                                            onChange={(e) => setAdminUsername(e.currentTarget.value)}
                                        />
                                        <TextInput
                                            label="Email Administrateur"
                                            placeholder="admin@entreprise.com"
                                            type="email"
                                            required
                                            value={adminEmail}
                                            onChange={(e) => setAdminEmail(e.currentTarget.value)}
                                        />
                                        <PasswordInput
                                            label="Mot de passe"
                                            placeholder="••••••••"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.currentTarget.value)}
                                        />
                                        <Checkbox
                                            label="J’accepte les conditions d’utilisation"
                                            checked={acceptTerms}
                                            onChange={(event) => setAcceptTerms(event.currentTarget.checked)}
                                        />

                                        {(error) && (
                                            <Text size="xs" c="red">{error}</Text>
                                        )}

                                        <Button
                                            type="submit"
                                            size="md"
                                            fullWidth
                                            radius="md"
                                            className="bg-[#1c3a6e] hover:bg-[#1b2f55]"
                                            disabled={loading}
                                        >
                                            {loading ? <Loader size="sm" color="white" /> : 'INSCRIRE'}
                                        </Button>

                                        <Text size="xs" ta="center" c="dimmed">
                                            Déjà un compte ?{' '}
                                            <button
                                                type="button"
                                                className="text-[#1c3a6e] font-semibold hover:underline"
                                                onClick={() => navigate('/admin/login')}
                                            >
                                                Se connecter
                                            </button>
                                        </Text>
                                    </Stack>
                                </form>
                            </Stack>
                        </Paper>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default RegisterEnterprise;
