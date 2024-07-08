export interface Comic {
    characters: Obj;
    collectedIssues: any[];
    creators: Obj;
    dates: ComicDate[];
    description: string | null;
    diamondCode: string;
    digitalId?: number;
    ean: string;
    events: Obj;
    format: string;
    id?: number;
    images: ImageModel[];
    isbn: string;
    issn: string;
    issueNumber: number;
    modified: string;
    pageCount: number;
    prices: Price[];
    resourceURI: string;
    series: Items;
    stories: Obj;
    textObjects: any[];
    thumbnail: ImageModel;
    title: string;
    upc: string;
    urls: DataUrls[];
    variantDescription: string;
    variants: Items[];
}

export interface ComicDetail {
    creators?: Array<{name: string, role: string} | undefined>;
    onsaleDate: string;
    description?: string;
    id?: number;
    image: string;
    pageCount?: number;
    printPrice?: string;
    title?: string;
    clickThrough?: string;
}

export interface ComicDate {
    type?: string;
    date?: string;
}

export interface Price {
    price: number;
    type: string;
}

export interface Obj {
    available?: number; collectionURI?: string; items: Items[]; returned?: number;
}

export interface DataUrls {
    type: string; url: string;
}

export interface ImageModel {
    extension?: string; path?: string;
}

export interface Items {
    resourceURI?: string;
    name: string;
    type?: string;
    role?: string;
}

export interface ComicStore {
    count?: number;
    limit?: number;
    offset?: number;
    results: Comic[];
}
