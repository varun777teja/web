import { User, Product, Order, OrderStatus } from './types';

let products: Product[] = [
    { id: 1, name: 'Holographic Alien Sticker', price: '2.99', imageUrl: 'https://image2url.com/images/1760460965232-a9b0c609-8438-4e01-9f93-3701255e2d14.png', category: 'sticker', description: 'A shiny, out-of-this-world alien sticker.' },
    { id: 2, name: '"Good Vibes" Retro Sticker', price: '2.50', imageUrl: 'https://image2url.com/images/1760460965232-84391e0a-0a71-4a4b-972f-5b6515c0e181.png', category: 'sticker', description: 'Spread positivity with this groovy sticker.' },
    { id: 3, name: 'Sad Hamster Meme Sticker', price: '3.50', imageUrl: 'https://image2url.com/images/1760460965232-6a8b1399-555e-4ed3-a0e2-d7b38d389a69.png', category: 'sticker', description: 'For when you\'re feeling a little dramatic.' },
    { id: 4, name: 'National Park Polaroid Print', price: '5.99', imageUrl: 'https://i.imgur.com/vHqiI1X.png', category: 'photo', description: 'Capture the beauty of the great outdoors.' },
    { id: 5, name: 'Vintage Polaroid Camera Print', price: '4.99', imageUrl: 'https://i.imgur.com/5O0nQ1E.png', category: 'photo', description: 'A classic shot for a classic vibe.' },
    { id: 6, name: 'Beach Sunset Polaroid Print', price: '5.50', imageUrl: 'https://i.imgur.com/fA2IN1Z.png', category: 'photo', description: 'Golden hour memories that last forever.' },
];

let users: User[] = [
    { id: 1, name: 'Demo User', email: 'demo@example.com', password: 'password' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password123' },
    { id: 3, name: 'Admin Nurav', email: 'nuravhost@outlook.com', password: 'nurav@2006' },
];

let orders: Order[] = [];

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Product Functions ---
export const getProducts = async (): Promise<Product[]> => {
    await simulateDelay(200);
    return [...products];
};

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    await simulateDelay(300);
    const newProduct: Product = {
        id: Date.now(), // Simple unique ID
        ...productData
    };
    products.push(newProduct);
    return newProduct;
};

export const updateProduct = async (updatedProduct: Product): Promise<Product> => {
    await simulateDelay(300);
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index === -1) throw new Error("Product not found");
    products[index] = updatedProduct;
    return updatedProduct;
};

export const deleteProduct = async (productId: number): Promise<void> => {
    await simulateDelay(300);
    products = products.filter(p => p.id !== productId);
};

// --- User Functions ---
export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    await simulateDelay(300);
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const addUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
    await simulateDelay(300);
    const user: User = { id: Date.now(), ...newUser };
    users.push(user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const getAllUsers = async (): Promise<Omit<User, 'password'>[]> => {
    await simulateDelay(200);
    return users.map(({ password, ...user }) => user);
};

export const deleteUser = async (userId: number): Promise<void> => {
    await simulateDelay(300);
    users = users.filter(u => u.id !== userId);
};

// --- Order Functions ---
export const getOrders = async (): Promise<Order[]> => {
    await simulateDelay(200);
    return [...orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
};

export const addOrder = async (orderData: Omit<Order, 'id' | 'status'>): Promise<Order> => {
    await simulateDelay(300);
    const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        status: 'Pending',
        ...orderData
    };
    orders.push(newOrder);
    return newOrder;
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<Order> => {
    await simulateDelay(300);
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) throw new Error("Order not found");
    orders[index].status = status;
    return orders[index];
};