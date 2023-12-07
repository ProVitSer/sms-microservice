import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SmsConfigActivateDto {
    @IsString()
    @IsNotEmpty()
    clientId: string;

    @IsBoolean()
    isActive: boolean;
}
