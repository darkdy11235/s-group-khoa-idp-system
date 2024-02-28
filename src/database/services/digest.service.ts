import { compare, genSalt, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DigestService {
  public async hash(data: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(data, salt);
  }

  public async compare(data: string, encrypted: string): Promise<boolean> {
    return await compare(encrypted, data);
  }
}