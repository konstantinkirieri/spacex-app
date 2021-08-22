import {makeObservable, observable, action, flow} from 'mobx'
import {favoritesStore} from './favoritesStore'

import { arrRocketsSchema, IRocketsData } from '../interfaces'
import {Api} from '../api'

const api = new Api()

export class RocketsStore {
  isLoading: boolean = true
  rocketsDataStore: Array<IRocketsData> = []
  rocketItem: any
  favoritesStore

  constructor() {
    makeObservable(this, {
      rocketsDataStore: observable,
      isLoading: observable,
      rocketItem: observable,
      loadRockets: flow.bound,
      updateRockets: action.bound,
      setIsLoading: action.bound,
      getItem: action.bound
    })
    this.favoritesStore = favoritesStore
    this.loadRockets()
  }

  updateRockets(item: Array<IRocketsData>) {
    this.rocketsDataStore = item
  }

  setIsLoading(status: boolean) {
    this.isLoading = status
  }

  *loadRockets() {
    this.setIsLoading(true)
    yield api.fetchRockets()
      .then((item) => {
        this.updateRockets(arrRocketsSchema.parse(item))
        this.setIsLoading(false)
    })
  }

  getItem(id: string) {
    this.rocketItem = this.rocketsDataStore.find((item: any) => item.id === id)
  }
}

export const rocketsStore = new RocketsStore()
