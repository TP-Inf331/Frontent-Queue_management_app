import api from './api';

export interface OrganizationSettings {
    id: string;
    name: string;
    email: string;
    address: string;
}

export interface NotificationSettings {
    emailNotifications: boolean;
    queueFullAlert: boolean;
}

export const settingsService = {
    getOrganization: async (): Promise<OrganizationSettings> => {
        const res = await api.get<OrganizationSettings>('/organization');
        return res.data;
    },

    updateOrganization: async (payload: OrganizationSettings): Promise<OrganizationSettings> => {
        const res = await api.put<OrganizationSettings>('/organization', payload);
        return res.data;
    },

    getNotifications: async (): Promise<NotificationSettings> => {
        const res = await api.get<NotificationSettings>('/settings/notifications');
        return res.data;
    },

    updateNotifications: async (payload: NotificationSettings): Promise<NotificationSettings> => {
        const res = await api.put<NotificationSettings>('/settings/notifications', payload);
        return res.data;
    },
};



