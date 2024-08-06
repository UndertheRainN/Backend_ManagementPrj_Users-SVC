import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginatedUser, User, UserDocument } from './entities/user.entity';
import { PinoLogger } from 'nestjs-pino';
import * as bcrypt from 'bcrypt';
import { FilterUserInputByPage } from './dto/filter-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly logger: PinoLogger,
  ) {
    this.logger.info(UsersService.name);
  }

  async generate(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async create(
    createUserInput: CreateUserInput,
  ): Promise<Omit<UserDocument, 'password'>> {
    try {
      this.logger.info('UsersService#create %o', createUserInput);
      const createModel = new this.userModel({
        ...createUserInput,
        password: await this.generate(createUserInput.password),
      });
      const result = createModel.save();
      this.logger.info('UsersService#findAll.create %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#create. %o', error);
      throw new BadRequestException(
        'Lỗi tạo tài khoản, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async findAll(filter: FilterUserInputByPage): Promise<PaginatedUser> {
    try {
      this.logger.info('UsersService#findAll %o', filter);
      const count = await this.userModel.countDocuments(filter.search).exec();
      const nodes = this.userModel.find(filter.search);
      if (filter.page && filter.pageSize) {
        nodes.limit(filter.pageSize).skip(filter.page - 1);
      }
      if (filter.sort) {
        nodes.sort({ [filter.sorts_params]: filter.sort === 'ASC' ? 1 : -1 });
      }
      // const [data, count] = await this.usersRepository.findAndCount({
      //   where: filter,
      //   skip: 0,
      //   take: 10,
      // });
      const results = await nodes.exec();
      this.logger.info('UsersService#findAll %o', results, count);
      return { total: count, nodes: results };
    } catch (error) {
      this.logger.error('UsersService#findAll %o', error);
      throw new BadRequestException(
        'Lỗi tạo tài khoản, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      this.logger.info('UsersService#findByUsername %o', username);
      const result = await this.userModel.findOne({ username }).exec();
      // const result = await this.usersRepository.findOne({
      //   where: { username },
      // });
      this.logger.info('UsersService#findByUsername %o', result);
      if (!result) {
        throw new BadRequestException('Không tìm thấy tài khoản');
      }
      return result;
    } catch (error) {
      this.logger.error('UsersService#findByUsername %o', error);
      throw new BadRequestException('Không tìm thấy tài khoản');
    }
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    try {
      this.logger.info('UsersService#update %a%o', _id, updateUserInput);
      const result = await this.userModel
        .findOneAndUpdate({ _id }, updateUserInput, { new: true })
        .exec();
      // const result = await this.usersRepository.update(id, updateUserInput);
      this.logger.info('UsersService#update.result %o', result);
      return result;
    } catch (error) {
      this.logger.error('UsersService#result %o', error);
      throw new BadRequestException(
        'Lỗi tạo tài khoản, vui lòng kiểm tra lại thông tin nhập',
      );
    }
  }

  remove(id: number) {
    return this.userModel.deleteOne({ id });
  }
  getRole(role: string) {
    return this.userModel.find({ roleCode: role }).exec();
  }
}
