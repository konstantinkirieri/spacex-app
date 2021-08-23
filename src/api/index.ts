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
    }
  }

  async fetchRockets(): Promise<any[]> {
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
  }

  async fetchLaunches(page: number): Promise<any[]> {
    const result = await this._getData({
      path: 'launches/query',
      data: {
        options: {
          limit: 15,
          page,
          pagination: true
        }
      },
      config: {method: 'POST'}
    })
    return this._transformLaunchesData(result.docs)
  }

  _transformLaunchesData(data: any): any[] {
    return data.map((item: ILaunchesData) => {
      return {
        ...item,
        dataType: 'Launches',
        favoriteDate: 0,
      }
    })
  }

  _transformRocketsData(data: any): any[] {
    return data.map((item: IRocketsData) => {
      return {
        ...item,
        dataType: 'Rockets',
        favoriteDate: 0,
      }
    })
  }
}
