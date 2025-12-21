import apiClient from '../lib/api-client';
import { NotificationSettings } from '../interface/api.interface';

export const notificationService = {
    saveSettings: async (settings: NotificationSettings): Promise<NotificationSettings> => {
        const response = await apiClient.post<NotificationSettings>('/notifications/settings', settings);
        return response.data;
    },

    getSettings: async (ticketId: string): Promise<NotificationSettings> => {
        const response = await apiClient.get<NotificationSettings>(`/notifications/settings/${ticketId}`);
        return response.data;
    },

    // Integration for Gmail/Email notifications
    sendEmail: async (email: string, subject: string, content: string): Promise<void> => {
        // In a real scenario, this would call a backend endpoint that handles SMTP/SendGrid/Gmail API
        await apiClient.post('/notifications/', {
            destinataire: email,
            sujet: subject,
            contenu: content,
            canal: 'email'
        });
    },

    notifyClient: async (ticketId: string, message: string): Promise<void> => {
        await apiClient.post('/notifications/', {
            ticket_id: ticketId,
            message: message,
            type: 'APP_NOTIFICATION'
        });
    }
};
