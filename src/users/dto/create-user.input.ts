import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @MaxLength(20, { message: 'Giới hạn tối đa là 20 ký tự' })
  @MinLength(5, { message: 'Giới hạn tối thiểu là 5 ký tự' })
  @Field({ description: 'Tên đăng nhập', name: 'username' })
  username: string;
  /**
   * ---------------------------------
   */
  // @Column()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Field({ description: 'Mật khẩu' })
  password: string;
  /**
   * ---------------------------------
   */
  // @CreateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  // })
  // @Field({ description: 'Ngày tạo', name: 'createdAt' })
  // createdAt?: Date;
  /**
   * ---------------------------------
   */
  // @UpdateDateColumn({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP(6)',
  //   onUpdate: 'CURRENT_TIMESTAMP(6)',
  // })
  // @Field({ description: 'Ngày cập nhật', name: 'updatedAt' })
  // updatedAt?: Date;
  /**
   * ---------------------------------
   */
  // @Column({ nullable: true, type: 'longtext' })
  @Field({ description: 'Mô tả', nullable: true })
  description?: string;
  /**
   * ---------------------------------
   */
  @Field({ description: 'Trạng thái', defaultValue: 'A', nullable: true })
  // @Column({ default: 'A' })
  status?: 'A' | 'I';
  /**
   * ---------------------------------
   */
  @Field({ description: 'Ảnh Avatar', name: 'img_avatar', nullable: true })
  // @Column({ nullable: true })
  img_avatar?: string;
  /**
   * ---------------------------------
   */
  @Field({ description: 'Email', nullable: true })
  // @Column({ nullable: true })
  @IsEmail()
  @MaxLength(100)
  @MinLength(10)
  email?: string;
  /**
   * ---------------------------------
   */
  // @Column({
  //   nullable: true,
  // })
  @Field({ description: 'Ngày sinh', nullable: true, name: 'birth_day' })
  birth_day?: Date;
  /**
   * ---------------------------------
   */
  // @Column({ default: 'ADMIN' })
  @Field({ description: 'Vai trò', nullable: true })
  role?: 'ADMIN' | 'USER';
  /**
   * ---------------------------------
   */
  // @Column({ nullable: true })
  @MaxLength(11)
  @IsPhoneNumber('VI', { message: 'Số điện thoại không đúng định dạng' })
  @Field({ description: 'Số điện thoại', nullable: true })
  phone?: string;
  /**
   * ---------------------------------
   */
  // @Column({ nullable: true })
  @MaxLength(11)
  @Field({ description: 'Họ', nullable: true, name: 'first_name' })
  first_name?: string;
  /**
   * ---------------------------------
   */
  // @Column({ nullable: true })
  @MaxLength(11)
  @Field({ description: 'Tên', nullable: true, name: 'last_name' })
  last_name?: string;
}
