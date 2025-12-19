
import React from 'react';
import { Modal, TextInput, Textarea, Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

interface FormValues {
    title: string;
    description: string;
}

interface ModalFormProps {
    opened: boolean;
    onClose: () => void;
    onSubmit: (values: FormValues) => void;
    initialValues?: FormValues;
    title: string;
}

const ModalForm: React.FC<ModalFormProps> = ({ opened, onClose, onSubmit, initialValues, title }) => {
    const form = useForm({
        initialValues: initialValues || {
            title: '',
            description: '',
        },
    });

    // Reset form when initialValues change
    React.useEffect(() => {
        if (initialValues) {
            form.setValues(initialValues);
        } else {
            form.reset();
        }
    }, [initialValues]);

    return (
        <Modal opened={opened} onClose={onClose} title={title}>
            <form onSubmit={form.onSubmit((values) => {
                onSubmit(values);
                onClose(); // Close on submit
            })}>
                <Stack>
                    <TextInput
                        label="Title"
                        placeholder="Item title"
                        required
                        {...form.getInputProps('title')}
                    />
                    <Textarea
                        label="Description"
                        placeholder="Item description"
                        minRows={4}
                        {...form.getInputProps('description')}
                    />
                    <Button type="submit" fullWidth mt="md">
                        Save
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default ModalForm;
