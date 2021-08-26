import {ILaunchesData, IRocketsData} from '../interfaces'

export const BASE_URL = 'https://api.spacexdata.com/v4/'

export class Api {
  async _getData(source: {
    path: string
    data?: any
    config?: any
  }) {
    const {path, data, config} = source
    try {
      const request = await fetch(`${BASE_URL}${path}`, {
        ...config,
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      })
      return await request.json()
    } catch (e) {
      console.error('getData Error: ', e)
      return
    }
  }

  async fetchRockets(): Promise<Array<IRocketsData> | undefined> {
    try {
      const result = await this._getData({
        path: 'rockets/query',
        data: {
          options: {
            limit: 4
          }
        },
        config: {method: 'POST'}
      })
      return this._transformRocketsData(result.docs)
    } catch (e) {
      console.error('Loading rockets error: ', e)
      return
    }
  }

  async fetchLaunches(
    page: number
  ): Promise<Array<ILaunchesData> | undefined> {
    try {
      const result = await this._getData({
        path: 'launches/query',
        data: {
          options: {
            limit: 15,
            sort: {
              date_unix: 'desc'
            },
            page,
            pagination: true
          }
        },
        config: {method: 'POST'}
      })
      return this._transformLaunchesData(result.docs)
    } catch (e) {
      console.error('Loading rockets error: ', e)
      return
    }
  }

  _transformLaunchesData(data: Array<ILaunchesData>): Array<ILaunchesData> {
    return data.map((item: ILaunchesData) => {
      return {
        ...item,
        dataType: 'Launches',
        favoriteDate: 0
      }
    })
  }

  _transformRocketsData(data: Array<IRocketsData>): Array<IRocketsData> {
    return data.map((item: IRocketsData) => {
      return {
        ...item,
        dataType: 'Rockets',
        favoriteDate: 0
      }
    })
  }
}
