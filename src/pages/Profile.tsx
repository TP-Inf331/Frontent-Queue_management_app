import React from 'react';

const Profile: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold mb-8">User Profile</h1>
            <div className="bg-card p-8 rounded-lg shadow border border-border">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">JD</div>
                    <div>
                        <h2 className="text-2xl font-bold">John Doe</h2>
                        <p className="text-muted-foreground">john.doe@example.com</p>
                    </div>
                </div>
                <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                    <p>Preferences and account details would go here.</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
