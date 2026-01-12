import apiClient from '../lib/api-client';
import { User } from '../interface/api.interface';
import { normalizeUser } from '../lib/normalizers';

export interface ClientRegistrationData {
    email: string;
    mot_de_passe: string;
    nom: string;
    queue_id: string;
}

export const clientService = {
    /**
     * Register a new client user
     * Clients are registered through /clients/ endpoint with simplified data
     */
    register: async (clientData: ClientRegistrationData): Promise<User> => {
        const response = await apiClient.post<User>('/clients/', {
            email: clientData.email,
            mot_de_passe: clientData.mot_de_passe,
            nom: clientData.nom,
            // Backend should automatically:
            // - Set role to 'client'
            // - Use email prefix as username
        });
        return normalizeUser(response.data);
    },
};
