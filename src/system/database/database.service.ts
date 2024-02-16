import { Injectable } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';

@Injectable()
export class DatabaseService {
    private connection: Connection;

    async connect(): Promise<void> {
        try {
            this.connection = await createConnection();
            console.log('Database connection established successfully!');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async close(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            console.log('Database connection closed.');
        }
    }
}
