import {makeObservable, observable, action, flow} from 'mobx'
import {favoritesStore} from './favoritesStore'

import { arrLaunchesSchema, ILaunchesData } from '../interfaces'
import {Api} from '../api'

const api = new Api()

export class LaunchesStore {
  isLoading = true
  launchesDataStore: Array<ILaunchesData> = []
  favoritesStore
  nextPage: number

  constructor() {
    makeObservable(this, {
      launchesDataStore: observable,
      isLoading: observable,
      loadLaunches: flow.bound,
      updateLaunches: action.bound,
      setIsLoading: action.bound,
      addToFavorites: action.bound
    })
    this.favoritesStore = favoritesStore
    this.loadLaunches()
    this.nextPage = 0
  }

  updateLaunches(item: Array<ILaunchesData>) {
    this.launchesDataStore = this.launchesDataStore.concat(item)
  }

  setIsLoading(status: boolean) {
    this.isLoading = status
  }

  *loadLaunches() {
    this.setIsLoading(true)
    this.nextPage++
    yield api.fetchLaunches(this.nextPage)
      .then((item) => {
        this.updateLaunches(arrLaunchesSchema.parse(item))
        this.setIsLoading(false)
    })
  }

  addToFavorites(id: string | null) {
    const index = this.launchesDataStore.findIndex(
      (item: {id: string}) => item.id === id
    )
    this.favoritesStore.addToStore(this.launchesDataStore[index])
  }
}

export const launchesStore = new LaunchesStore()
