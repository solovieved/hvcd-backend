import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema.js';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserMapper } from './user.mapper.js';
import { UserDto } from './dto/user.dto.js';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user: UserDocument = await this.userModel.create({
      ...createUserDto,
    });

    return UserMapper.toDto(user);
  }

  async findOrCreate(createUserDto: CreateUserDto): Promise<UserDto> {
    let user: UserDocument = await this.userModel.findOne({
      phone: createUserDto.phone,
    });

    if (!user) {
      user = await this.userModel.create({ ...createUserDto });
    }

    return UserMapper.toDto(user);
  }

  async findByPhone(phone: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ phone });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.toDto(user);
  }
}
