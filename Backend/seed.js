const { hashPassword } = require('./helper/token');
const { User, Store } = require('./database');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const createInitialData = async () => {
    try {
        const existingAdmin = await User.findOne({ where: { role: 'admin' } });
        if (existingAdmin) {
            console.log('Admin user already exists. Skipping creation.');
        } else {
            const password = 'Password@123';
            const hashedPassword = await hashPassword(password);

            await User.create({
                name: 'System Administrator',
                email: 'admin@example.com',
                password: hashedPassword,
                address: 'Baner, Pune',
                role: 'admin',
            });
            console.log('Initial admin user created successfully.');
        }

        const existingStores = await Store.findAll();
        if (existingStores.length > 0) {
            console.log('Stores already exist. Skipping creation.');
        } else {
            await Store.bulkCreate([
                {
                    name: 'Books, Bites and Beyond',
                    email: 'store_owner@example.com',
                    password: await hashPassword('Store@123'),
                    address: 'Koregaon Park, Pune',
                },
                {
                    name: 'Vijay Sales Electronics Store',
                    email: 'store_owner_1@example.com',
                    password: await hashPassword('Store@123'),
                    address: 'Hadapsar, Pune',
                },
                {
                    name: 'Fresh Fruits and Vegetable Market',
                    email: 'store_owner_2@example.com',
                    password: await hashPassword('Store@123'),
                    address: 'Koregaon Park, Pune',
                },
                {
                    name: 'Luxury Home Decor and Lifestyle',
                    email: 'store_owner_3@example.com',
                    password: await hashPassword('Store@123'),
                    address: 'Hadapsar, Pune',
                }
            ]);
            console.log('Sample stores created successfully.');
        }

    } catch (error) {
        console.error('Error creating initial data:', error);
    } finally {
        await db.close();
    }
};

db.sync({ force: false }).then(() => {
    console.log('Database synced');
    createInitialData();
});