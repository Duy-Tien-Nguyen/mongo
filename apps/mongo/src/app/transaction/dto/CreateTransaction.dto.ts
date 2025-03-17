import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { TransactionStatus, TransactionType } from '../../lib/enum/Tracsaction.enum';
import { Types } from 'mongoose';

export class CreateTransactionDto {
  @ApiProperty({
    example: '67d553b3e17a928a87153f03',
    description: 'ID của người gửi',
  })
  @IsNotEmpty()
  @IsMongoId()
  fromUser: Types.ObjectId;

  @ApiProperty({
    example: '67d54ca17760df333548e40b',
    description: 'ID của người nhận',
  })
  @IsNotEmpty()
  @IsMongoId()
  toUser: Types.ObjectId;

  @ApiProperty({ example: 100, description: 'Số tiền giao dịch', minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: 'TRANSFER',
    description: 'Loại giao dịch',
  })
  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsEnum(TransactionStatus)
  status?: string;
}

export class UpdateTransactionDto {
  @ApiProperty({
    example: 'COMPLETED',
    description: 'Trạng thái giao dịch',
    enum: TransactionStatus,
    required: false,
  })
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;
}
