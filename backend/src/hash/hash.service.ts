import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashService {
  async hashPassword(password) {
    return await hash(password, 10);
  }

  async comparePasswords(password, hashedPassword) {
    return await compare(password, hashedPassword);
  }
}
