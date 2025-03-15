import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUser.dto';
import { User } from './schema/user.schema';

@ApiTags('Users') // Gắn nhãn cho Swagger UI
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo người dùng mới' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Người dùng đã được tạo', type: User })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  @ApiResponse({ status: 200, description: 'Danh sách người dùng', type: [User] })
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':email')
  @ApiOperation({ summary: 'Tìm người dùng theo email' })
  @ApiParam({ name: 'email', description: 'Email của người dùng' })
  @ApiResponse({ status: 200, description: 'Người dùng tìm thấy', type: User })
  // @ApiNotFoundResponse({ status: 404, description: 'Không tìm thấy người dùng' })
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    return user;
  }

  @Post('fake/:count')
  @ApiOperation({ summary: 'Tạo người dùng giả lập' })
  @ApiParam({ name: 'count', description: 'Số lượng người dùng muốn tạo' })
  @ApiResponse({ status: 201, description: 'Người dùng giả lập đã được tạo' })
  async generateFakeUsers(@Param('count') count: number): Promise<void> {
    await this.userService.fakeUsers(Number(count));
  }
}
