import React, { useState } from 'react';
import { Title, Group, Button, Container, Grid, Card, Text, TextInput, Paper, ActionIcon } from '@mantine/core';
import { IconSearch, IconPlus, IconPencil, IconTrash } from '@tabler/icons-react';
import ModalForm from '../components/ModalForm';

interface ContentItem {
    id: number;
    title: string;
    description: string;
}

const initialContent: ContentItem[] = [
    { id: 1, title: 'Welcome to our platform', description: 'This is the main hero section content.' },
    { id: 2, title: 'About Us', description: 'Learn more about our company and mission.' },
    { id: 3, title: 'Services', description: 'Discover the wide range of services we offer to our clients.' },
];

const Content: React.FC = () => {
    const [content, setContent] = useState<ContentItem[]>(initialContent);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState<ContentItem | null>(null);
    const [search, setSearch] = useState('');

    const handleCreate = () => {
        setCurrentEditItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: ContentItem) => {
        setCurrentEditItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Delete this item?')) {
            setContent(content.filter(item => item.id !== id));
        }
    };

    const handleSubmit = (values: { title: string; description: string }) => {
        if (currentEditItem) {
            // Edit existing
            setContent(content.map(item =>
                item.id === currentEditItem.id ? { ...item, ...values } : item
            ));
        } else {
            // Create new
            const newItem = {
                id: Math.max(...content.map(c => c.id)) + 1 || 1,
                ...values,
            };
            setContent([...content, newItem]);
        }
    };

    const filteredContent = content.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container fluid>
            <Group justify="space-between" mb="lg">
                <Title order={2}>Content Management</Title>
            </Group>

            <Paper p="md" mb="lg" radius="md">
                <Group justify="space-between">
                    <TextInput
                        placeholder="Search content..."
                        leftSection={<IconSearch size={16} />}
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        style={{ flex: 1, maxWidth: '400px' }}
                    />
                    <Button leftSection={<IconPlus size={16} />} color="orange" onClick={handleCreate}>
                        Add Content
                    </Button>
                </Group>
            </Paper>

            <Grid>
                {filteredContent.map((item) => (
                    <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4 }}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={600} size="lg">{item.title}</Text>
                                <Group gap="xs">
                                    <ActionIcon variant="light" color="blue" onClick={() => handleEdit(item)}>
                                        <IconPencil size="1.2rem" stroke={1.5} />
                                    </ActionIcon>
                                    <ActionIcon variant="light" color="red" onClick={() => handleDelete(item.id)}>
                                        <IconTrash size="1.2rem" stroke={1.5} />
                                    </ActionIcon>
                                </Group>
                            </Group>

                            <Text size="sm" c="dimmed" lineClamp={3}>
                                {item.description}
                            </Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            <ModalForm
                opened={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialValues={currentEditItem || undefined}
                title={currentEditItem ? 'Edit Content' : 'Add Content'}
            />
        </Container>
    );
};

export default Content;
