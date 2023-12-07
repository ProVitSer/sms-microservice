import { IsDefined, IsString } from 'class-validator';

export class SendSmsDto {
    @IsString()
    @IsDefined()
    clientId: string;

    @IsString()
    @IsDefined()
    externalNumber: string;

    @IsString()
    @IsDefined()
    sender: string;

    @IsString()
    @IsDefined()
    smsText: string;
}
