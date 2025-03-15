import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsInt, Min, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../lib/enum/Role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Duy', description: 'Tên của người dùng' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'duy@example.com', description: 'Email của người dùng', uniqueItems: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 25, description: 'Tuổi của người dùng', minimum: 0 })
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({ example: 'user', description: 'Vai trò của người dùng', enum: Role, required: false , default: Role.USER})
  @IsEnum(Role)
  @IsOptional()
  role: Role = Role.USER;
}
