import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { HashService } from '../hash/hash.service';
import { errors } from '../utils/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async createUser(data) {
    const hashedPassword = await this.hashService.hashPassword(data.password);
    return await this.usersRepository.save({
      ...data,
      password: hashedPassword,
    });
  }

  async updateUser(id, data) {
    const user = await this.usersRepository.findOneBy({ id });
    if (data.email && user.email !== data.email)
      throw new BadRequestException(errors.WRONG_DATA);
    if (data.password)
      data.password = await this.hashService.hashPassword(data.password);
    const updatedUser = {
      ...user,
      username: data?.username,
      password: data?.password,
      email: data?.email,
      about: data?.about,
      avatar: data?.avatar,
    };
    await this.usersRepository.update(id, updatedUser);
    return await this.usersRepository.findOneBy({ id });
  }

  async findUserByEmail(email) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findUserByUsername(username) {
    return await this.usersRepository.findOneBy({ username });
  }

  async findUserById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async searchUsers(data) {
    return await this.usersRepository.find({
      where: [{ username: Like(`${data}%`) }, { email: Like(`${data}%`) }],
    });
  }
}
