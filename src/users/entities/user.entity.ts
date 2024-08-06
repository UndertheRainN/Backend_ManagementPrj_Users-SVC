import { Roles } from '@/role/entities/role.entity';
import { ObjectType, Field, ID, OmitType, Directive } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import  { HydratedDocument } from 'mongoose';
import { Paginated } from 'src/common/paginated.input';
@ObjectType('User')
@Directive('@key(fields: "_id")')
@Schema({ autoIndex: true, timestamps: true })
export class User {
  @Field(() => ID, { nullable: true })
  _id: string;
  /**
   * ---------------------------------******-------------------------
   */

  @Prop({ required: true, unique: true, index: true })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @MaxLength(20, { message: 'Giới hạn tối đa là 20 ký tự' })
  @MinLength(5, { message: 'Giới hạn tối thiểu là 5 ký tự' })
  @Field({ description: 'Tên đăng nhập', name: 'username' })
  username: string;
  /**
   * ---------------------------------
   */
  @Prop({ required: true })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Field({ description: 'Mật khẩu' })
  password: string;
  /**
   * ---------------------------------
   */
  @Field()
  createdAt?: Date;
  /**
   * ---------------------------------
   */
  @Field()
  updatedAt?: Date;
  /**
   * ---------------------------------
   */
  @Prop()
  @Field({ description: 'Mô tả', nullable: true })
  description?: string;
  /**
   * ---------------------------------
   */
  @Field({ description: 'Trạng thái', nullable: true })
  @Prop({ default: 'A' })
  status?: 'A' | 'I';
  /**
   * ---------------------------------
   */
  @Field({ description: 'Ảnh Avatar', name: 'img_avatar', nullable: true })
  // @Column({ nullable: true })
  @Prop()
  img_avatar?: string;
  /**
   * ---------------------------------
   */
  @Field({ description: 'Email', nullable: true })
  // @Column({ nullable: true })
  @Prop()
  @IsEmail()
  @MaxLength(100)
  @MinLength(10)
  email?: string;
  /**
   * ---------------------------------
   */
  @Prop()
  @Field({ description: 'Ngày sinh', nullable: true, name: 'birth_day' })
  birth_day?: Date;
  /**
   * ---------------------------------
   */
  @Prop()
  @Field({ description: 'Vai trò', nullable: true })
  roleCode?: string;

  @Field((type) => Roles, { name: 'role' })
  role: Roles;
  /**
   * ---------------------------------
   */
  // @Column({ nullable: true })
  @Prop()
  @MaxLength(11)
  @IsPhoneNumber('VI', { message: 'Số điện thoại không đúng định dạng' })
  @Field({ description: 'Số điện thoại', nullable: true })
  phone?: string;
  /**
   * ---------------------------------
   */
  // @Column({ nullable: true })
  @Prop({ name: 'first_name' })
  @MaxLength(11)
  @Field({ description: 'Họ', nullable: true, name: 'first_name' })
  first_name?: string;
  /**
   * ---------------------------------
   */
  // @Column({ nullable: true })
  @Prop()
  @MaxLength(11)
  @Field({ description: 'Tên', nullable: true, name: 'last_name' })
  last_name?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 1 });
export type UserDocument = HydratedDocument<User>;
@ObjectType()
export class UserNotPassword extends OmitType(User, ['password']) {}
@ObjectType()
export class PaginatedUser extends Paginated(UserNotPassword) {}
