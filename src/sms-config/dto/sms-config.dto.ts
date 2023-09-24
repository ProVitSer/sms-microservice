import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SmsProviderType } from '../interfaces/sms.-config.enum';

export class SmsProviderConfigDto {
    @IsEnum(SmsProviderType)
    smsProvider: SmsProviderType;

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
}
