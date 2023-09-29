import { IsArray, IsDateString, IsDefined, IsString } from 'class-validator';

export class AddSmsJobDto {
    @IsString()
    @IsDefined()
    clientId: string;

    @IsString()
    @IsDefined()
    sender: string;

    @IsArray()
    @IsDefined()
    externalNumbers: string[];

    @IsString()
    @IsDefined()
    smsText: string;

    @IsDateString()
    @IsDefined()
    sendTime: Date;
}
