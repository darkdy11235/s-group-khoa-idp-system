import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from 'src/system/database/database.service';

@Controller()
export class AppController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get('test-connection')
    async testConnection(): Promise<string> {
        await this.databaseService.connect();
        await this.databaseService.close();
        return 'Database connection tested.';
    }
}
