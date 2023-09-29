import { IsArray, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SmsApiProviderType } from '../interfaces/sms.-config.enum';

export class SmsProviderConfigDto {
    @IsEnum(SmsApiProviderType)
    smsApiProvider: SmsApiProviderType;

    @IsEmail({}, { message: 'Некорретный формат почты' })
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    api_key?: string;

    @IsString()
    @IsOptional()
    api_id?: string;

    @IsString()
    @IsOptional()
    login?: string;

    @IsString()
    @IsOptional()
    password?: string;
}

export class SmsConfignDto {
    @IsString()
    @IsNotEmpty()
    clientId: string;

    @IsDefined()
    smsProviderConfig: SmsProviderConfigDto;

    @IsArray()
    @IsNotEmpty()
    senders: string[];
}
