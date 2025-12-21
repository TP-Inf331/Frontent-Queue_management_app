export type UserRole = 'admin' | 'agent' | 'client';

export interface User {
    id?: string; // For frontend compatibility
    user_id?: number; // Backend uses user_id
    username?: string;
    email: string;
    role: UserRole;
    full_name?: string; // Frontend field
    nom?: string; // Backend field (French for "name")
    phone?: string;
    date_creation?: string; // Backend field
    created_at?: string; // Frontend field
    password?: string; // Frontend field
    mot_de_passe?: string; // Backend field (French for "password")
    managed_queue_id?: string | number; // ID of the queue this user manages
}

export interface Queue {
    id?: string; // Frontend field
    queue_id?: number; // Backend field
    name?: string; // Frontend field
    nom?: string; // Backend field (French)
    description?: string;
    institution?: string; // Backend field
    code_unique?: string; // Backend field
    is_active?: boolean;
    created_at?: string; // Frontend field
    date_creation?: string; // Backend field
    current_ticket_number?: number;
    waiting_count?: number;
    max_capacity?: number; // Backend field
    active_ticket?: Ticket;
    waitlist?: Ticket[];
}


export interface Ticket {
    id?: string; // Frontend field
    ticket_id?: number; // Backend field
    queue_id: string | number;
    user_id: string | number;
    ticket_number?: number; // Frontend field
    numero?: number; // Backend field (French for "number")
    status?: 'waiting' | 'called' | 'completed' | 'cancelled'; // Frontend
    statut?: string; // Backend field (French for "status")
    prioritaire?: boolean; // Backend field (priority)
    created_at?: string; // Frontend field
    heure_arrivee?: string; // Backend field (arrival time)
    called_at?: string; // Frontend field
    heure_passage?: string; // Backend field (called time)
    cancelled?: boolean; // Backend field
    queue_name?: string;
    position?: number;
    total_in_queue?: number;
    estimated_wait_time?: number; // in minutes
}

export interface NotificationSettings {
    id?: string;
    ticket_id: string;
    notify_before_5: boolean;
    notify_before_2: boolean;
    notify_on_turn: boolean;
    notify_on_delay: boolean;
    volume: number;
    vibration: boolean;
}

export interface QueueStats {
    total_waiting: number;
    average_waiting_time: number; // in minutes
    last_ticket_number: number;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}
