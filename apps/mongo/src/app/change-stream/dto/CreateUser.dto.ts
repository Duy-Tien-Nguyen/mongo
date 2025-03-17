import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsInt, Min, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { Role } from '../../lib/enum/Role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Duy', description: 'Tên của người dùng' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'duy@example.com', description: 'Email của người dùng', uniqueItems: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 25, description: 'Tuổi của người dùng', minimum: 0 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({ example: 10000000000, description: 'Số tiền trong ví', minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  balance?: number = 0;

  @ApiProperty({ example: 'user', description: 'Vai trò của người dùng', enum: Role, required: false , default: Role.USER})
  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.USER;
}

export class UpdateUserDto extends CreateUserDto {}