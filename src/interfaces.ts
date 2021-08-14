export interface ILaunchesData {
    id: string,
    links: {
        patch: {
            small: string
        },
        webcast: string,
        wikipedia: string
    },
    name: string,
    details: string,
    //todo лучше использовать литерал, 'Launches', раз он всегда один
    dataType: string,
    success: boolean,
    flight_number: string,
    rocket: string
}

export interface IRocketsData {
    id: string,
    flickr_images: string,
    name: string,
    description: string,
    //todo здесь тоже, 'Rockets'
    dataType: string
}
