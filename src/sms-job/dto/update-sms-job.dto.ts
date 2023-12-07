import { IsString, IsNotEmpty, IsOptional, IsArray, IsDateString } from 'class-validator';

export class UpdateSmsJobDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    sender?: string;

    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    externalNumbers?: string[];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    smsText?: string;

    @IsDateString()
    @IsNotEmpty()
    @IsOptional()
    sendTime?: Date;
}
