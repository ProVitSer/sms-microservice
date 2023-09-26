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
}
