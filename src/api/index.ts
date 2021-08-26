import {action, makeObservable, observable} from 'mobx'
import {ILaunchesData, IRocketsData} from '../interfaces'

export const BASE_URL = 'https://api.spacexdata.com/v4/'

class Api {
  totalLaunches: number = 0
  totalRockets: number = 0
  errorMessage: string = ''
  constructor() {
    makeObservable(this, {
      updateTotalLaunches: action.bound,
      updateTotalRockets: action.bound,
      totalLaunches: observable,
      totalRockets: observable,
      errorMessage: observable,
      updateErrorMessage: action.bound
    })
  }

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
      this.updateErrorMessage(
        "Error! Don't get data from server"
      )
    }
  }

  async fetchRockets(): Promise<any[] | undefined> {
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
      this.updateTotalRockets(result.totalDocs)
      return this._transformRocketsData(result.docs)
    } catch (e) {
      console.error('Loading rockets error: ', e)
    }
  }

  async fetchLaunches(
    page: number
  ): Promise<any[] | undefined> {
    try {
      const result = await this._getData({
        path: 'launches/query',
        data: {
          options: {
            limit: 15,
            sort: {
              date_local: 'desc'
            },
            page,
            pagination: true
          }
        },
        config: {method: 'POST'}
      })
      this.updateTotalLaunches(result.totalDocs)
      return this._transformLaunchesData(result.docs)
    } catch (e) {
      console.error('Loading rockets error: ', e)
    }
  }

  _transformLaunchesData(data: any): any[] {
    return data.map((item: ILaunchesData) => {
      return {
        ...item,
        dataType: 'Launches',
        favoriteDate: 0
      }
    })
  }

  _transformRocketsData(data: any): any[] {
    return data.map((item: IRocketsData) => {
      return {
        ...item,
        dataType: 'Rockets',
        favoriteDate: 0
      }
    })
  }

  updateTotalLaunches(total: number) {
    this.totalLaunches = total
  }

  updateTotalRockets(total: number) {
    this.totalRockets = total
  }

  updateErrorMessage(message: string) {
    this.errorMessage = message
  }
}

export const api = new Api()
