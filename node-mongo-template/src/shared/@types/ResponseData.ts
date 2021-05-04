interface Data<T> {
    items?: T[];
    limit?: number;
    offset?: number;
    totalPage?: number;
    item?: T;

    [key: string]: T[] | T | number | undefined
}

interface Error {
    code: string
    message?: string
    stack?: string
}

export class ResponseData<T> {
    private success: boolean

    constructor(private data?: Data<T> | null, private error?: Error) {
        this.success = !error
    }
}