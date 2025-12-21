import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Loader2, ArrowLeft, Bell, CheckCircle2, PauseCircle, Clock } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { ticketService } from '@/services/ticket.service';
import { notificationService } from '@/services/notification.service';
import { Ticket } from '@/interface/api.interface';

interface TicketStatusProps {
    ticketId: string;
    onBack?: () => void;
}

export const TicketStatus: React.FC<TicketStatusProps> = ({ ticketId, onBack }) => {
    const [view, setView] = useState<'live' | 'notifications' | 'leave' | 'success'>('live');
    const [leaveReason, setLeaveReason] = useState('Trop long');

    // Notification states
    const [notifN5, setNotifN5] = useState(true);
    const [notifN2, setNotifN2] = useState(true);
    const [notifTurn, setNotifTurn] = useState(true);
    const [notifDelay, setNotifDelay] = useState(true);
    const [volume, setVolume] = useState([80]);
    const [vibration, setVibration] = useState(true);

    const { data: ticket, loading, execute: fetchTicket } = useApi(() => ticketService.getById(ticketId), {
        executeOnMount: !!ticketId
    } as any);

    useEffect(() => {
        fetchTicket();
        const interval = setInterval(fetchTicket, 10000);
        return () => clearInterval(interval);
    }, [ticketId, fetchTicket]);

    const { loading: savingNotifs, execute: saveNotifs } = useApi(
        () => notificationService.saveSettings({
            ticket_id: ticketId,
            notify_before_5: notifN5,
            notify_before_2: notifN2,
            notify_on_turn: notifTurn,
            notify_on_delay: notifDelay,
            volume: volume[0],
            vibration: vibration
        }),
        { successMessage: 'Paramètres enregistrés!', onSuccess: () => setView('live') }
    );

    const { loading: cancelling, execute: cancelTicket } = useApi(
        () => ticketService.cancel(ticketId),
        { successMessage: 'Vous avez quitté la file.', onSuccess: onBack }
    );

    if (loading && !ticket) {
        return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="animate-spin" /></div>;
    }

    if (!ticket) return <div className="p-8 text-center">Ticket introuvable.</div>;

    // Success View (Image 0)
    if (view === 'success') {
        return (
            <div className="flex flex-col gap-6 items-center p-6 bg-slate-50 min-h-screen">
                <header className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                    <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-5 w-5" /></Button>
                    <div className="text-sm font-semibold">UY1 / Service scolarité</div>
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                </header>

                <Card className="w-full max-w-sm shadow-xl rounded-2xl border-none">
                    <CardContent className="pt-10 flex flex-col items-center gap-6 text-center">
                        <div className="bg-emerald-100 p-4 rounded-full">
                            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Inscription réussie !</h2>
                            <p className="text-slate-500 font-medium">{ticket.queue_name}</p>
                            <p className="text-slate-400 text-sm">Université de Yaoundé I</p>
                        </div>

                        <div className="w-full py-4 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                            <span className="text-xs uppercase text-slate-400 font-bold">Votre numéro :</span>
                            <div className="text-4xl font-black text-blue-600">A{ticket.ticket_number.toString().padStart(3, '0')}</div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                            <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                                <span className="text-[10px] text-slate-400">Position :</span>
                                <span>{ticket.position}ème</span>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                                <span className="text-[10px] text-slate-400">Temps estimé :</span>
                                <span>{ticket.estimated_wait_time} minutes</span>
                            </div>
                        </div>

                        <Button className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-xl" onClick={() => setView('live')}>
                            VOIR MA POSITION
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Notifications View (Image 3)
    if (view === 'notifications') {
        return (
            <div className="flex flex-col gap-6 items-center p-6 bg-slate-50 min-h-screen">
                <Card className="w-full max-w-sm shadow-xl rounded-2xl border-none p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-orange-100 p-2 rounded-lg"><Bell className="h-6 w-6 text-orange-500" /></div>
                        <h2 className="text-xl font-black uppercase tracking-tight">Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-bold text-slate-500">Vous serez notifié :</p>
                        {[
                            { label: 'Quand 5 personnes sont avant vous', state: notifN5, set: setNotifN5 },
                            { label: 'Quand 2 personnes sont avant vous', state: notifN2, set: setNotifN2 },
                            { label: "Quand c'est votre tour", state: notifTurn, set: setNotifTurn },
                            { label: 'En cas de délai exceptionnel', state: notifDelay, set: setNotifDelay },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <Checkbox id={`notif-${i}`} checked={item.state} onCheckedChange={(v) => item.set(!!v)} />
                                <label htmlFor={`notif-${i}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {item.label}
                                </label>
                            </div>
                        ))}

                        <div className="pt-6 space-y-4">
                            <p className="text-sm font-bold text-slate-500">Volume :</p>
                            <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
                            <div className="flex items-center space-x-3">
                                <Checkbox id="vibration" checked={vibration} onCheckedChange={(v) => setVibration(!!v)} />
                                <label htmlFor="vibration" className="text-sm font-medium">Vibration</label>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-xl mt-12" onClick={() => saveNotifs()} disabled={savingNotifs}>
                        {savingNotifs ? 'ENREGISTREMENT...' : 'ENREGISTRER'}
                    </Button>
                </Card>
            </div>
        );
    }

    // Leave View (Image 2)
    if (view === 'leave') {
        return (
            <div className="flex flex-col gap-6 items-center p-6 bg-slate-50 min-h-screen">
                <Card className="w-full max-w-sm shadow-xl rounded-2xl border-none p-6 text-center">
                    <h2 className="text-xl font-black mt-4">Voulez-vous vraiment quitter la file ?</h2>

                    <div className="my-8 p-4 bg-red-50 border border-red-100 rounded-xl text-left space-y-2">
                        <div className="flex items-start gap-2 text-red-600 text-xs font-bold">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-600 mt-1" />
                            <span>Votre position sera perdue</span>
                        </div>
                        <div className="flex items-start gap-2 text-red-600 text-xs font-bold">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-600 mt-1" />
                            <span>Vous devrez vous réinscrire</span>
                        </div>
                    </div>

                    <div className="space-y-2 text-left mb-8">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Raison (optionnelle) :</label>
                        <select
                            className="w-full p-4 bg-white border border-slate-200 rounded-xl text-sm font-bold appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDggMTAgTCAxMiAxNCBMIDE2IDEwIiBzdHJva2U9IiM2NDc0OGIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center]"
                            value={leaveReason}
                            onChange={(e) => setLeaveReason(e.target.value)}
                        >
                            <option>Trop long</option>
                            <option>Urgence</option>
                            <option>Autre</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="destructive" className="h-14 font-black rounded-xl" onClick={() => cancelTicket()} disabled={cancelling}>
                            {cancelling ? '...' : 'QUITTER'}
                        </Button>
                        <Button variant="secondary" className="h-14 font-black rounded-xl text-slate-400" onClick={() => setView('live')}>
                            RESTER
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    // Live View (Image 4 and 1)
    return (
        <div className="flex flex-col gap-6 items-center p-6 bg-slate-50 min-h-screen">
            <header className="w-full flex items-center justify-between bg-white p-4 rounded-xl shadow-sm">
                <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-5 w-5" /></Button>
                <div className="text-sm font-semibold">UY1 / Service scolarité</div>
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
            </header>

            <div className="w-full max-w-sm space-y-4">
                {/* Paused Banner (Image 1) */}
                {ticket.status === 'cancelled' && (
                    <Card className="border-none shadow-md bg-white rounded-2xl p-6 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <PauseCircle className="h-10 w-10 text-orange-500" />
                        </div>
                        <h2 className="text-lg font-black uppercase leading-tight mb-4">File temporairement en pause</h2>
                        <div className="bg-blue-50 p-4 rounded-xl text-blue-600 text-xs font-bold mb-4">
                            Notre position est préservée<br />
                            Reprise estimée : <span className="underline italic">30 minutes</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold mb-6">Raison : Pause déjeuner</p>
                        <div className="flex flex-col gap-3">
                            <Button className="h-14 bg-orange-600 hover:bg-orange-700 font-bold rounded-xl text-white">Quitter et recevoir un rappel</Button>
                            <Button variant="outline" className="h-14 border-slate-200 font-bold rounded-xl text-slate-600" onClick={() => fetchTicket()}>Rester en attente</Button>
                        </div>
                    </Card>
                )}

                {/* Number Card */}
                <Card className="border-none shadow-md bg-white rounded-2xl overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-black uppercase text-slate-400">Votre numéro</span>
                        <div className="text-5xl font-black text-blue-600">A{ticket.ticket_number.toString().padStart(3, '0')}</div>
                    </CardContent>
                </Card>

                {/* Position Card */}
                <Card className="border-none shadow-md bg-white rounded-2xl overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-black uppercase text-slate-400">Votre position</span>
                        <div className="text-5xl font-black text-blue-600">
                            {ticket.position}
                            <span className="text-2xl ml-1">ème</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Sur {ticket.total_in_queue || '24'}</span>
                    </CardContent>
                </Card>

                {/* Time Est Card */}
                <Card className="border-none shadow-md bg-white rounded-2xl overflow-hidden">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="bg-slate-50 p-2 rounded-lg"><Clock className="h-5 w-5 text-slate-600" /></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase text-slate-400">Temps estimé</span>
                            <div className="text-lg font-black">{ticket.estimated_wait_time || '60'} minutes</div>
                            <span className="text-[10px] text-slate-400 font-medium font-italic mt-[-2px]">(basé sur 5 min/personne)</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Serving Status Card */}
                <Card className="border-none shadow-md bg-white rounded-2xl overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                        <div className="text-[10px] font-black uppercase text-slate-400">En service actuellement</div>
                        <div className="bg-emerald-100 p-3 rounded-lg text-center text-xl font-black text-emerald-700">A012</div>

                        <div className="space-y-2">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Prochains appels :</div>
                            <div className="flex gap-2">
                                {['A013', 'A014', 'A015', 'A016'].map(num => (
                                    <div key={num} className="flex-1 bg-slate-50 p-2 rounded-md text-center text-xs font-black text-slate-600 border border-slate-100">{num}</div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Info Box */}
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 space-y-2">
                    <div className="flex items-start gap-2 text-[10px] text-slate-500 font-medium">
                        <div className="h-1 w-1 rounded-full bg-slate-300 mt-1.5" />
                        <span>Consultez votre place en ligne</span>
                    </div>
                    <div className="flex items-start gap-2 text-[10px] text-slate-500 font-medium">
                        <div className="h-1 w-1 rounded-full bg-slate-300 mt-1.5" />
                        <span>Evitez de vous absenter à moins 10 mins de votre tour</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <Button className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 font-bold rounded-xl space-x-2" onClick={() => setView('notifications')}>
                        <Bell className="h-4 w-4" />
                        <span>Activer les notifications</span>
                    </Button>
                    <Button variant="destructive" className="flex-1 h-12 bg-red-100 hover:bg-red-200 text-red-600 border-none font-bold rounded-xl" onClick={() => setView('leave')}>
                        Quitter la file
                    </Button>
                </div>
            </div>
        </div>
    );
};
