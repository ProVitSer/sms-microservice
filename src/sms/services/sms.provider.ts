export abstract class SmsProvider {
    protected abstract smsSend(): Promise<any>;
}
