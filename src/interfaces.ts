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
    dataType: string
}