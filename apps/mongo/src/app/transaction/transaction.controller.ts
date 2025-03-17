import { Controller, Get, Post, Put, Param, Body } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto, UpdateTransactionDto } from "./dto/CreateTransaction.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import { Transaction } from "./schema/transaction.schema";

@ApiTags("Transactions") 
@Controller("transactions")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: "Tạo giao dịch mới" })
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({
    status: 201,
    description: "Giao dịch đã được tạo",
    type: Transaction,
  })
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy thông tin giao dịch theo ID" })
  @ApiParam({ name: "id", description: "ID của giao dịch" })
  @ApiResponse({
    status: 200,
    description: "Thông tin giao dịch",
    type: Transaction,
  })
  @ApiNotFoundResponse({ description: "Không tìm thấy giao dịch" })
  async getTransactionById(@Param("id") id: string) {
    return this.transactionService.findTransactionById(id);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Lấy danh sách giao dịch của một user" })
  @ApiParam({ name: "userId", description: "ID của user" })
  @ApiResponse({
    status: 200,
    description: "Danh sách giao dịch của user",
    type: [Transaction],
  })
  async getUserTransactions(@Param("userId") userId: string) {
    return this.transactionService.findUserTransactions(userId);
  }

  @Put(":id/status")
  @ApiOperation({ summary: "Cập nhật trạng thái giao dịch" })
  @ApiParam({ name: "id", description: "ID của giao dịch" })
  @ApiBody({ type: UpdateTransactionDto })
  @ApiResponse({
    status: 200,
    description: "Trạng thái giao dịch đã được cập nhật",
    type: Transaction,
  })
  @ApiNotFoundResponse({ description: "Không tìm thấy giao dịch" })
  async updateTransactionStatus(
    @Param("id") id: string,
    @Body() updateTransactionDto: UpdateTransactionDto
  ) {
    return this.transactionService.updateTransactionStatus(
      id,
      updateTransactionDto.status
    );
  }
}
