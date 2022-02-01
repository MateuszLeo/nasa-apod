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
            const json = await response.json();
            if (response.status < 300) {
                return json;
            }
            throw new Error(json.msg);
        });
    }

    #createRequest(method: 'GET', url: string) {
        return new Request(url, { method });
    }
}
