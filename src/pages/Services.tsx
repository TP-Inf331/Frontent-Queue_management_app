
import React from 'react';
import Card from '@/components/Card';
import { Helmet } from 'react-helmet-async';

const Services: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Helmet>
                <title>Services - NoWait</title>
                <meta name="description" content="Explore our queue management services." />
            </Helmet>

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Our Services</h1>
                <p className="text-lg text-muted-foreground">Comprehensive solutions for your business needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card
                    title="Queue Management"
                    description="Standard queue management for retail and banking."
                    image="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800"
                    price="$49/mo"
                    footer={<button className="text-primary font-semibold hover:underline">Get Started</button>}
                />
                <Card
                    title="Self-Service Kiosks"
                    description="Software for touch-screen kiosks to allow self check-in."
                    image="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800"
                    price="$99/mo"
                    footer={<button className="text-primary font-semibold hover:underline">Get Started</button>}
                />
                <Card
                    title="Virtual Queuing"
                    description="Allow customers to join the queue from their mobile phones."
                    image="https://images.unsplash.com/photo-1512428559087-560fa0db7f59?auto=format&fit=crop&q=80&w=800"
                    price="$79/mo"
                    footer={<button className="text-primary font-semibold hover:underline">Get Started</button>}
                />
            </div>
        </div>
    );
};

export default Services;
