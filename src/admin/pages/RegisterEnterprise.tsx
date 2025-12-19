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
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { text } from 'stream/consumers';

interface EnterprisePayload {
    name: string;
    type: string;
    adminEmail: string;
}

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

    const [enterpriseName, setEnterpriseName] = useState('');
    const [enterpriseType, setEnterpriseType] = useState<string | null>(null);
    const [adminEmail, setAdminEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!enterpriseType) {
            setError('Veuillez sélectionner un type d’établissement.');
            return;
        }

        if (!acceptTerms) {
            setError('Vous devez accepter les conditions d’utilisation pour continuer.');
            return;
        }

        const payload: EnterprisePayload = {
            name: enterpriseName.trim(),
            type: enterpriseTypes.find((t) => t.value === enterpriseType)?.label || enterpriseType,
            adminEmail: adminEmail.trim(),
        };

        // Persist minimal enterprise configuration for the admin dashboard
        localStorage.setItem('adminEnterprise', JSON.stringify(payload));

        const namePart = adminEmail.split('@')[0] || 'Admin';
        const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

        const userInfo = {
            name: formattedName,
            email: adminEmail.trim(),
            enterpriseName: payload.name,
            enterpriseType: payload.type,
        };

        localStorage.setItem('adminUser', JSON.stringify(userInfo));
        localStorage.setItem('adminToken', 'true');

        // In a real app, password would be sent to an API.
        console.log('Registered enterprise:', { ...payload, password: '********' });

        navigate('/admin/dashboard');
    };

    return (
        <div className="h-screen bg-white text-white flex items-center justify-center">
            <div className="flex w-full  h-full">
                {/* Left marketing panel – same curve / centered circles */}
                <div className="hidden lg:flex w-1/2 flex-col items-center justify-center px-12 "
                  style={{ backgroundImage: "url('/bgRegister.png')" }}
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

                        <div className="flex flex-col items-center gap-6">
                            <span className="w-6 h-6 rounded-full bg-[#3b82f6]" />
                            <span className="w-6 h-6 rounded-full bg-[#3b82f6]" />
                            <span className="w-6 h-6  rounded-full bg-[#3b82f6]" />
                        </div>

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

                {/* Right registration panel – white curved card */}
                <div className="w-full lg:w-1/2 bg-white text-slate-900 flex items-center justify-center rounded-none lg:rounded-l-[80px]">
                    <Container size={520} px="xl">
                    <div className="flex justify-end mb-6 lg:hidden">
                        <img src="/logo.svg" alt="NoWait Logo" style={{ width: 32, height: 32 }} />
                    </div>
                    <Paper
                        radius="xl"
                        shadow="xl"
                        p="xl"
                        withBorder
                        className="border-slate-100"
                        style={{ borderWidth: 1.5 }}
                    >
                        <Stack gap="lg">
                            <div className="flex flex-col gap-2">
                                <Group justify="space-between" mb={4}>
                                    <Group gap="xs">
                                        <img src="/logo.svg" alt="NoWait Logo" style={{ width: 34, height: 34 }} />
                                        <Text fw={700} size="lg" className="text-[#1c3a6e]">
                                            NoWait
                                        </Text>
                                    </Group>
                                </Group>

                                <Title
                                    order={2}
                                    className="text-[22px] font-extrabold tracking-wide text-[#1c3a6e] uppercase"
                                >
                                    Inscrire votre entreprise
                                </Title>
                                <Text size="sm" c="dimmed">
                                    Renseignez les informations de votre établissement pour créer votre compte
                                    administrateur et accéder au tableau de bord NoWait.
                                </Text>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <Stack gap="md">
                                    <Select
                                        label="Quel type d’établissement ?"
                                        placeholder="Sélectionner"
                                        data={enterpriseTypes}
                                        required
                                        value={enterpriseType}
                                        onChange={setEnterpriseType}
                                    />

                                    <TextInput
                                        label="Nom de l’entreprise "
                                        placeholder="Ex : Université de Yaoundé I"
                                        required
                                        value={enterpriseName}
                                        onChange={(e) => setEnterpriseName(e.currentTarget.value)}
                                    />

                                    <TextInput
                                        label="Email de l’administrateur "
                                        placeholder="Ex : admin@entreprise.com"
                                        type="email"
                                        required
                                        value={adminEmail}
                                        onChange={(e) => setAdminEmail(e.currentTarget.value)}
                                    />

                                    <PasswordInput
                                        label="Mot de passe "
                                        placeholder="Choisissez un mot de passe sécurisé"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.currentTarget.value)}
                                    />

                                    <Checkbox
                                        label={
                                            <Text size="xs" className="text-slate-600">
                                                J’accepte les{' '}
                                                <span className="text-[#1c3a6e] font-medium">
                                                    conditions d’utilisation
                                                </span>
                                            </Text>
                                        }
                                        checked={acceptTerms}
                                        onChange={(event) => setAcceptTerms(event.currentTarget.checked)}
                                    />

                                    {error && (
                                        <Text size="xs" c="red" mt={-4}>
                                            {error}
                                        </Text>
                                    )}

                                    <Button
                                        type="submit"
                                        size="md"
                                        fullWidth
                                        radius="md"
                                        className="bg-[#1c3a6e] hover:bg-[#1b2f55]"
                                    >
                                        INSCRIRE
                                    </Button>

                                    <Text size="xs" ta="center" c="dimmed">
                                        Vous avez déjà un compte administrateur ?{' '}
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


