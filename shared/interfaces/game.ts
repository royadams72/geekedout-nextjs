export interface Game {
    description: string;
    end_date: string;
    gamerpower_url: string;
    id: number;
    image: string;
    instructions: string;
    open_giveaway: string;
    open_giveaway_url: string;
    platforms: string;
    published_date: string;
    status: string;
    thumbnail: string;
    title: string;
    type: string;
    users: string;
    worth: string;
}

export interface GameDetail {
    description: string;
    gamerpower_url: string;
    image: string;
    instructions: string;
    platforms: string;
    published_date: string;
    title: string;
    type: string;
    worth: string;
}
