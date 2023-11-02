// dynamic.dto.ts
import { IsString, IsDate, IsUUID, IsObject } from 'class-validator';

export class DynamicDto {
  @IsString()
  from: string;

  @IsString()
  type: string;

  @IsObject()
  text: any; // Use the 'any' type for dynamic data.

  @IsDate()
  timestamp: Date;

  @IsUUID()
  message_id: number;

  @IsString()
  conversation_id: string;

  @IsString()
  conversation_initiated_by: string;
}

