import { ValidationError } from 'class-validator';
import { Observable } from 'rxjs';

export class Utils {
    static getStatusObserver<T>(fn: () => Promise<T>, thisContext: any, timeout: number): Observable<T> {
        const getFunction = fn.bind(thisContext);
        return new Observable<T>((subscriber) => {
            let timer: NodeJS.Timeout;
            (async function getStatus(fn) {
                fn()
                    .then((status: any) => {
                        timer = setTimeout(() => getStatus(fn), timeout);
                        subscriber.next(status);
                    })
                    .catch((err) => {
                        subscriber.error(err);
                    });
            })(getFunction);

            return function unsubscribe() {
                clearTimeout(timer);
            };
        });
    }

    static asyncTimeout(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    static getEnv(): string {
        return (process?.env?.NODE_ENV || 'development') as string;
    }

    public static formatError(error: ValidationError): Array<{ field: string; error: { [type: string]: string } }> {
        const message: Array<{ field: string; error: { [type: string]: string } }> = [];

        function getChildren(childrenError: ValidationError, prop: string) {
            if (Array.isArray(childrenError.children) && childrenError.children.length != 0) {
                for (let i = 0; i < childrenError.children.length; i++) {
                    getChildren(childrenError.children[i], `${prop}.${childrenError.children[i].property}`);
                }
            }
            !!childrenError.constraints ? message.push({ field: prop, error: childrenError.constraints }) : '';
        }

        getChildren(error, error.property);

        return message;
    }
}
