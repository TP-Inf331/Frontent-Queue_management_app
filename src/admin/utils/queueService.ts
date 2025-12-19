export interface Person {
    id: string;
    ticketNumber: string;
    name: string;
    arrivalTime: string;
    waitTime: string;
    status: 'waiting' | 'service' | 'completed';
}

export interface QueueItem {
    id: string;
    name: string;
    status: 'OUVERT' | 'FERMÉE' | 'PAUSE';
    waiting: number;
    avgTime: string | null;
    capacity: number | null; // null means unlimited
    activeTicket?: Person | null;
    waitlist: Person[];
}

const STORAGE_KEY = 'nowait_queues';

const generateInitialData = (): QueueItem[] => [
    {
        id: '1',
        name: 'Service Scolarité',
        status: 'OUVERT',
        waiting: 12,
        avgTime: '10 min',
        capacity: 50,
        activeTicket: { id: 'p1', ticketNumber: 'A042', name: 'Kenmoe merveille', arrivalTime: '10:00', waitTime: '2 min', status: 'service' },
        waitlist: [
            { id: 'p2', ticketNumber: 'A043', name: 'User 2', arrivalTime: '10:05', waitTime: '12 min', status: 'waiting' },
            { id: 'p3', ticketNumber: 'A044', name: 'User 3', arrivalTime: '10:10', waitTime: '17 min', status: 'waiting' },
        ]
    },
    { id: '2', name: 'Certificat Médical', status: 'OUVERT', waiting: 8, avgTime: '5 min', capacity: null, waitlist: [] },
    { id: '3', name: 'Cantine', status: 'FERMÉE', waiting: 0, avgTime: null, capacity: 100, waitlist: [] },
    { id: '4', name: 'Dépôt des requêtes', status: 'PAUSE', waiting: 0, avgTime: '8 min', capacity: 20, waitlist: [] },
];

export const queueService = {
    getAll: (): QueueItem[] => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            const initial = generateInitialData();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
            return initial;
        }
        return JSON.parse(stored);
    },

    getById: (id: string): QueueItem | undefined => {
        const queues = queueService.getAll();
        return queues.find(q => q.id === id);
    },

    add: (queue: Omit<QueueItem, 'id' | 'waiting' | 'activeTicket' | 'waitlist'>): QueueItem => {
        const queues = queueService.getAll();
        const newQueue: QueueItem = {
            ...queue,
            id: Date.now().toString(),
            waiting: 0,
            activeTicket: null,
            waitlist: []
        };
        queues.push(newQueue);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(queues));
        return newQueue;
    },

    update: (id: string, updates: Partial<QueueItem>): QueueItem | null => {
        const queues = queueService.getAll();
        const index = queues.findIndex(q => q.id === id);
        if (index === -1) return null;

        queues[index] = { ...queues[index], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(queues));
        return queues[index];
    },

    callNext: (queueId: string): QueueItem | null => {
        const queues = queueService.getAll();
        const index = queues.findIndex(q => q.id === queueId);
        if (index === -1) return null;

        const queue = queues[index];
        if (queue.waitlist.length === 0) return queue;

        // Move current active to completed (or just discard for simple logic)
        // Move next waiting to active
        const nextPerson = queue.waitlist.shift();

        if (nextPerson) {
            queue.activeTicket = { ...nextPerson, status: 'service', waitTime: '0 min' };
            queue.waiting = Math.max(0, queue.waiting - 1);
        }

        queues[index] = queue;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(queues));
        return queue;
    }
};
