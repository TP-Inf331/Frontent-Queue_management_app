/**
 * Seed Script: Create 10 Sample Queues/Services
 * 
 * Run this script to populate your database with sample queues for testing
 * Usage: npx tsx scripts/seed-queues.ts
 */

import axios from 'axios';

const API_URL = process.env.VITE_API_URL || 'http://localhost:8000';

// Sample queues representing different service types
const sampleQueues = [
    {
        name: 'Service Scolarité',
        description: 'Inscription, relevés de notes, attestations et services académiques',
        is_active: true
    },
    {
        name: 'Service Facturation',
        description: 'Paiements, factures et questions financières',
        is_active: true
    },
    {
        name: 'Consultation Médicale',
        description: 'Consultation générale et urgences non critiques',
        is_active: true
    },
    {
        name: 'Service Carte Étudiante',
        description: 'Création, renouvellement et remplacement de cartes étudiantes',
        is_active: true
    },
    {
        name: 'Bureau des Admissions',
        description: 'Candidatures, orientations et informations sur les programmes',
        is_active: true
    },
    {
        name: 'Service Bibliothèque',
        description: 'Emprunts, retours et assistance documentaire',
        is_active: true
    },
    {
        name: 'Guichet Banque',
        description: 'Opérations bancaires courantes et retraits',
        is_active: true
    },
    {
        name: 'Service Restauration',
        description: 'Commandes, réservations et réclamations cafétéria',
        is_active: true
    },
    {
        name: 'Support IT',
        description: 'Assistance technique, réseaux et comptes informatiques',
        is_active: true
    },
    {
        name: 'Service Logement',
        description: 'Attribution, gestion et réclamations résidences universitaires',
        is_active: true
    }
];

async function getAuthToken(): Promise<string | null> {
    try {
        // Try to get admin credentials from environment or use default
        const username = process.env.ADMIN_USERNAME || 'admin';
        const password = process.env.ADMIN_PASSWORD || 'admin123';

        console.log(`\n🔑 Attempting to login as admin...`);

        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await axios.post(`${API_URL}/auth/token`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log('✅ Login successful!');
        return response.data.access_token;
    } catch (error: any) {
        console.error('❌ Login failed:', error.response?.data || error.message);
        console.log('\nℹ️  Make sure you have an admin account or update ADMIN_USERNAME and ADMIN_PASSWORD environment variables');
        return null;
    }
}

async function createQueue(queueData: any, token: string): Promise<boolean> {
    try {
        const response = await axios.post(`${API_URL}/queues/`, queueData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log(`  ✅ Created: ${queueData.name}`);
        return true;
    } catch (error: any) {
        if (error.response?.status === 409 || error.response?.data?.detail?.includes('already exists')) {
            console.log(`  ⏭️  Skipped: ${queueData.name} (already exists)`);
            return false;
        }
        console.error(`  ❌ Failed to create ${queueData.name}:`, error.response?.data || error.message);
        return false;
    }
}

async function seedQueues() {
    console.log('\n🌱 Starting Queue Seeding Process...\n');
    console.log(`📍 API URL: ${API_URL}\n`);

    // Step 1: Authenticate
    const token = await getAuthToken();
    if (!token) {
        console.log('\n❌ Seeding aborted: Could not authenticate');
        process.exit(1);
    }

    // Step 2: Create queues
    console.log('\n📋 Creating queues...\n');

    let created = 0;
    let skipped = 0;
    let failed = 0;

    for (const queue of sampleQueues) {
        const success = await createQueue(queue, token);
        if (success) {
            created++;
        } else {
            // Check if it was skipped or failed by looking at the log
            // This is a simple heuristic
            skipped++;
        }
    }

    // Step 3: Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Seeding Summary');
    console.log('='.repeat(50));
    console.log(`✅ Created: ${created} queue(s)`);
    console.log(`⏭️  Skipped: ${skipped} queue(s) (already existed)`);
    console.log(`❌ Failed: ${failed} queue(s)`);
    console.log('='.repeat(50));

    if (created > 0) {
        console.log('\n🎉 Queues have been successfully seeded!');
        console.log('\n💡 You can now:');
        console.log('   - Visit http://localhost:4001/auth/register to register clients');
        console.log('   - Visit http://localhost:4001/admin/queues to manage queues');
        console.log('   - Visit http://localhost:4001/services to view all services\n');
    } else if (skipped === sampleQueues.length) {
        console.log('\n✨ All queues already exist in the database');
    }
}

// Run the seeding
seedQueues().catch((error) => {
    console.error('\n💥 Fatal error during seeding:', error);
    process.exit(1);
});
