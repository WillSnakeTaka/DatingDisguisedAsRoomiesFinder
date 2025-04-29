import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
    try {
        const listings = await prisma.listing.findMany();
        console.log('Listings:', listings);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
