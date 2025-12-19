import React from 'react';
import { Paper, Title, TextInput, PasswordInput, Button, Stack, Switch, Group, Text, Divider } from '@mantine/core';

const Settings: React.FC = () => {
    return (
        <Stack gap="lg">
            <Title order={2}>Paramètres</Title>

            <Paper p="xl" radius="md" withBorder>
                <Title order={4} mb="md">Informations de l'Organisation</Title>
                <Stack gap="md" maw={500}>
                    <TextInput label="Nom de l'organisation" defaultValue="Université de Yaoundé I" />
                    <TextInput label="Email de contact" defaultValue="admin@umary.com" />
                    <TextInput label="Adresse" defaultValue="Ngoa-Ekelle, Yaoundé" />
                    <Button color="blue" w="fit-content">Enregistrer les modifications</Button>
                </Stack>
            </Paper>

            <Paper p="xl" radius="md" withBorder>
                <Title order={4} mb="md">Préférences de Notification</Title>
                <Stack gap="md">
                    <Group justify="space-between">
                        <div>
                            <Text fw={500}>Notifications Email</Text>
                            <Text size="sm" c="dimmed">Recevoir des alertes par email</Text>
                        </div>
                        <Switch defaultChecked />
                    </Group>
                    <Divider />
                    <Group justify="space-between">
                        <div>
                            <Text fw={500}>Alerte File Pleine</Text>
                            <Text size="sm" c="dimmed">Notifier quand une file dépasse 50 personnes</Text>
                        </div>
                        <Switch defaultChecked />
                    </Group>
                </Stack>
            </Paper>

            <Paper p="xl" radius="md" withBorder>
                <Title order={4} mb="md">Sécurité</Title>
                <Stack gap="md" maw={500}>
                    <PasswordInput label="Ancien mot de passe" />
                    <PasswordInput label="Nouveau mot de passe" />
                    <PasswordInput label="Confirmer le nouveau mot de passe" />
                    <Button color="red" variant="outline" w="fit-content">Changer le mot de passe</Button>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default Settings;
