import { SmsApiProviderType } from '@app/platform-types/sms/types';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSmsConfignDto {
    @IsString()
    @IsNotEmpty()
    clientId: string;

    @IsEnum(SmsApiProviderType)
    smsApiProvider: SmsApiProviderType;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    api_key?: string;

    @IsString()
    @IsOptional()
    login?: string;

    @IsString()
    @IsOptional()
    password?: string;
}
