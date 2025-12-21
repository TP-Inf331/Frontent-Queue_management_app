import { User, Queue, Ticket } from '@/interface/api.interface';

/**
 * Normalizes backend user response to frontend format
 * Backend uses: nom, user_id, date_creation
 * Frontend uses: full_name, id, created_at
 */
export const normalizeUser = (backendUser: User): User => {
    return {
        ...backendUser,
        id: backendUser.user_id?.toString() || backendUser.id,
        full_name: backendUser.nom || backendUser.full_name,
        username: backendUser.email?.split('@')[0] || backendUser.username,
        created_at: backendUser.date_creation || backendUser.created_at,
    };
};

/**
 * Normalizes backend queue response to frontend format
 * Backend uses: queue_id, nom, date_creation
 * Frontend uses: id, name, created_at
 */
export const normalizeQueue = (backendQueue: Queue): Queue => {
    return {
        ...backendQueue,
        id: backendQueue.queue_id?.toString() || backendQueue.id,
        name: backendQueue.nom || backendQueue.name,
        created_at: backendQueue.date_creation || backendQueue.created_at,
        is_active: true, // Backend doesn't have this field, assume active by default
    };
};

/**
 * Normalizes backend ticket response to frontend format
 * Backend uses: ticket_id, numero, statut, heure_arrivee
 * Frontend uses: id, ticket_number, status, created_at
 */
export const normalizeTicket = (backendTicket: Ticket): Ticket => {
    // Map French status to English
    const statusMap: Record<string, 'waiting' | 'called' | 'completed' | 'cancelled'> = {
        'attente': 'waiting',
        'appele': 'called',
        'termine': 'completed',
        'annule': 'cancelled',
    };

    return {
        ...backendTicket,
        id: backendTicket.ticket_id?.toString() || backendTicket.id,
        ticket_number: backendTicket.numero || backendTicket.ticket_number,
        status: backendTicket.statut ? statusMap[backendTicket.statut] || 'waiting' : backendTicket.status,
        created_at: backendTicket.heure_arrivee || backendTicket.created_at,
        called_at: backendTicket.heure_passage || backendTicket.called_at,
    };
};
