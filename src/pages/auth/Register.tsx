import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';
import { queueService } from '@/services/queue.service';
import { ticketService } from '@/services/ticket.service';
import { useApi } from '@/hooks/useApi';
import { useAuthStore } from '@/stores/auth.store';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [selectedQueue, setSelectedQueue] = useState('');
    const [step, setStep] = useState<'register' | 'success'>('register');
    const [ticketNumber, setTicketNumber] = useState<string | null>(null);

    // Fetch available queues
    const { data: queues, loading: loadingQueues, execute: fetchQueues } = useApi(queueService.getAll);

    useEffect(() => {
        fetchQueues();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array - only fetch once on mount

    const { loading, execute: register } = useApi(authService.register, {
        onSuccess: async (user) => {
            // Auto-login after registration
            try {
                const loginData = await authService.login(email, password);
                setAuth(loginData.user, loginData.access_token);

                // If user selected a queue, join it automatically
                if (selectedQueue) {
                    const ticket = await ticketService.joinQueue(selectedQueue);
                    setTicketNumber(`A${ticket.ticket_number.toString().padStart(3, '0')}`);
                    toast.success('Inscription réussie! Vous êtes dans la file.');
                } else {
                    toast.success('Compte créé avec succès!');
                }

                setStep('success');

                // Redirect after showing success
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
            } catch (error) {
                toast.error('Inscription réussie, veuillez vous connecter');
                navigate('/auth/login');
            }
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedQueue) {
            toast.error('Veuillez sélectionner un service');
            return;
        }

        register({
            username,
            email,
            mot_de_passe: password, // Backend expects 'mot_de_passe'
            nom: fullName,
            role: 'client',
        });
    };

    // Success Screen
    if (step === 'success') {
        const queue = queues?.find(q => q.id === selectedQueue);

        return (
            <>
                <Helmet>
                    <title>Inscription Réussie - NoWait</title>
                </Helmet>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
                    <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-3xl shadow-2xl">
                        <div className="text-center">
                            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="h-12 w-12 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-2">
                                Bienvenue {fullName}!
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Votre compte a été créé avec succès
                            </p>
                        </div>

                        {ticketNumber && (
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
                                <div className="text-center">
                                    <p className="text-sm opacity-90 mb-2">Votre ticket</p>
                                    <div className="text-6xl font-black mb-3">{ticketNumber}</div>
                                    <p className="text-sm opacity-90 mb-4">{queue?.name}</p>
                                    <div className="bg-white/20 rounded-lg p-3">
                                        <p className="text-xs opacity-90">Une notification a été envoyée à:</p>
                                        <p className="font-semibold">{email}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="text-center text-sm text-gray-600">
                            Redirection vers votre tableau de bord...
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Registration Form
    return (
        <>
            <Helmet>
                <title>Register - NoWait</title>
                <meta name="description" content="Create a new account." />
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
                            Créer votre compte
                        </h2>
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            Rejoignez NoWait et gérez votre temps efficacement
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1">
                                    Nom complet *
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background transition-all"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                                    Adresse email *
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background transition-all"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1">
                                    Nom d'utilisateur *
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background transition-all"
                                    placeholder="johndoe123"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" id="label-password" className="block text-sm font-medium text-foreground mb-1">
                                    Mot de passe *
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="queue" className="block text-sm font-medium text-foreground mb-1">
                                    Sélectionner un service *
                                </label>
                                {loadingQueues ? (
                                    <div className="flex items-center justify-center p-4">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    </div>
                                ) : (
                                    <select
                                        id="queue"
                                        name="queue"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border border-input placeholder-muted-foreground text-foreground rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background transition-all"
                                        value={selectedQueue}
                                        onChange={(e) => setSelectedQueue(e.target.value)}
                                    >
                                        <option value="">-- Choisir un service --</option>
                                        {queues?.filter(q => q.is_active).map((queue) => (
                                            <option key={queue.id} value={queue.id}>
                                                {queue.name} {queue.waiting_count ? `(${queue.waiting_count} en attente)` : ''}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Choisissez le service pour lequel vous souhaitez obtenir un ticket
                                </p>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || loadingQueues}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Créer mon compte et obtenir mon ticket'}
                            </button>
                        </div>

                        <div className="text-sm text-center">
                            <span className="text-muted-foreground">Vous avez déjà un compte? </span>
                            <Link to="/auth/login" className="font-medium text-primary hover:text-primary/80">
                                Se connecter
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
