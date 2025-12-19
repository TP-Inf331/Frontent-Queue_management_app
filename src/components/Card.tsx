import React from 'react';

interface CardProps {
    title: string;
    description: string;
    image?: string;
    price?: string;
    footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, image, price, footer }) => {
    return (
        <div className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-2xl transition-shadow duration-300">
            {image && (
                <div className="h-48 w-full overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
            )}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{title}</h3>
                    {price && <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">{price}</span>}
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
                {footer && <div className="mt-4 pt-4 border-t border-border">{footer}</div>}
            </div>
        </div>
    );
};

export default Card;
