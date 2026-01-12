import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { queueService } from '@/services/queue.service';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

// 10 Sample queues for seeding
const SAMPLE_QUEUES = [
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

interface SeedResult {
    name: string;
    status: 'success' | 'error' | 'skipped';
    message?: string;
}

const SeedQueues: React.FC = () => {
    const [isSeeding, setIsSeeding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState<SeedResult[]>([]);
    const [completed, setCompleted] = useState(false);

    const handleSeed = async () => {
        setIsSeeding(true);
        setProgress(0);
        setResults([]);
        setCompleted(false);

        const totalQueues = SAMPLE_QUEUES.length;
        const newResults: SeedResult[] = [];

        for (let i = 0; i < SAMPLE_QUEUES.length; i++) {
            const queue = SAMPLE_QUEUES[i];

            try {
                await queueService.create(queue);
                newResults.push({
                    name: queue.name,
                    status: 'success',
                    message: 'Créé avec succès'
                });
            } catch (error: any) {
                const errorMessage = error.response?.data?.detail || error.message;

                // Check if it's a duplicate error
                if (errorMessage?.includes('already exists') || errorMessage?.includes('existe déjà')) {
                    newResults.push({
                        name: queue.name,
                        status: 'skipped',
                        message: 'Existe déjà'
                    });
                } else {
                    newResults.push({
                        name: queue.name,
                        status: 'error',
                        message: errorMessage
                    });
                }
            }

            setProgress(((i + 1) / totalQueues) * 100);
            setResults([...newResults]);

            // Small delay to avoid overwhelming the API
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        setIsSeeding(false);
        setCompleted(true);
    };

    const successCount = results.filter(r => r.status === 'success').length;
    const skippedCount = results.filter(r => r.status === 'skipped').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">🌱 Créer 10 Services de Test</CardTitle>
                    <CardDescription>
                        Cliquez sur le bouton ci-dessous pour créer automatiquement 10 services/files d'attente variés dans votre application.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!isSeeding && !completed && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                <p className="font-semibold mb-2">Ces services seront créés :</p>
                                <ul className="list-disc list-inside space-y-1">
                                    {SAMPLE_QUEUES.slice(0, 5).map(q => (
                                        <li key={q.name}>
                                            <strong>{q.name}</strong> - {q.description}
                                        </li>
                                    ))}
                                    <li>... et 5 autres services</li>
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {isSeeding && (
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Création en cours... {Math.round(progress)}%
                            </p>
                            <Progress value={progress} className="w-full" />
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {results.map((result, index) => (
                                <Card key={index} className={`border-l-4 ${result.status === 'success' ? 'border-l-green-500' :
                                        result.status === 'skipped' ? 'border-l-yellow-500' : 'border-l-red-500'
                                    }`}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            {result.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                            {result.status === 'skipped' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                                            {result.status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
                                            <div className="flex-1">
                                                <p className="font-semibold">{result.name}</p>
                                                {result.message && (
                                                    <p className="text-xs text-muted-foreground">{result.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {completed && (
                        <Alert className="bg-green-50 border-green-200">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription>
                                <p className="font-semibold mb-1">Processus terminé !</p>
                                <p className="text-sm">
                                    ✅ Créés: {successCount} |
                                    ⏭️ Existants: {skippedCount} |
                                    ❌ Erreurs: {errorCount}
                                </p>
                            </AlertDescription>
                        </Alert>
                    )}

                    <Button
                        onClick={handleSeed}
                        disabled={isSeeding}
                        size="lg"
                        className="w-full"
                    >
                        {isSeeding ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Création en cours...
                            </>
                        ) : completed ? 'Recréer les services' : 'Créer les 10 services'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default SeedQueues;
