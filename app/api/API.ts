type Fetcher = (request: Request) => Promise<Response>;

export class API<T> {
    #url: string;
    #key: string;
    #fetcher: Fetcher;

    constructor(url: string, key: string, fetcher: Fetcher) {
        this.#url = url;
        this.#key = key;
        this.#fetcher = fetcher;
    }

    get(date: string): Promise<T> {
        const params = new URLSearchParams({ api_key: this.#key, date });
        return this.#fetcher(this.#createRequest('GET', this.#url + '?' + params.toString())).then(async (response) => {
            if (response.status < 300) {
                return response.json();
            }
            if (response.status > 499) {
                throw new ServerError();
            }
            throw new ClientError();
        });
    }

    #createRequest(method: 'GET', url: string) {
        return new Request(url, { method });
    }
}

class ServerError extends Error {
    constructor() {
        super();
    }
}

class ClientError extends Error {
    constructor() {
        super();
    }
}
