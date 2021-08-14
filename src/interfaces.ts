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
    dataType: 'Launches',
    success: boolean,
    flight_number: string,
    rocket: string,
    isFavorite: boolean,
}

export interface IRocketsData {
    id: string,
    flickr_images: string,
    name: string,
    description: string,
    dataType: 'Rockets',
    height: {
        meters: number
    },
    diameter: {
        meters: string
    },
    mass: {
        kg: string
    },
    isFavorite: boolean,
}

