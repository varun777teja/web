import { User } from './types';

// In-memory array to simulate a database
let users: User[] = [
    { id: 1, name: 'Demo User', email: 'demo@example.com', password: 'password' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password123' },
];

// Simulate async database operations
export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            resolve(user);
        }, 500);
    });
};

export const addUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const user: User = {
                id: users.length + 1,
                ...newUser,
            };
            users.push(user);
            // In a real app, you wouldn't return the password
            const { password, ...userWithoutPassword } = user;
            resolve(userWithoutPassword);
        }, 500);
    });
};