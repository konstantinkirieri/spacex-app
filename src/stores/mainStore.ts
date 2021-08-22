import {makeObservable, action, observable, computed, flow} from 'mobx'
import {Api} from '../api'

import {favoritesStore} from './favoritesStore'
import {arrLaunchesSchema, arrRocketsSchema, ILaunchesData, IRocketsData} from '../interfaces'


class Main {
  isLoading = true
  selectedCategory: string = 'Launches'
  selectedItemId: string | null = null
  launchesItems: Array<ILaunchesData> = []
  rocketsItems: Array<IRocketsData> = []
  rocketItem: Array<IRocketsData> = []

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      launchesItems: observable,
      rocketsItems: observable,
      rocketItem: observable,
      selectedCategory: observable,
      selectedItemId: observable,
      setCategory: action.bound,
      setItemId: action.bound,
      getRocketById: action,
      getCurrentData: computed,
      getCurrentItem: computed,
      fetchData: flow.bound,
    })
    console.log('Start constructor main store')
  }

  setCategory(category: string) {
    this.selectedCategory = category
    this.selectedItemId = null
  }

  setItemId(id: string | null) {
    this.selectedItemId = id
  }

  get getCurrentData(): Array<ILaunchesData | IRocketsData> {
    if (this.selectedCategory === 'Rockets')
      return this.rocketsItems

    if (this.selectedCategory === 'Favorites')
      if (!favoritesStore.favoritesDataStore) {
        return []
      } else {
        return favoritesStore.favoritesDataStore.slice().sort((a, b) => b.favoriteDate - a.favoriteDate)
      }

    return this.launchesItems
  }

  get getCurrentItem(): ILaunchesData | IRocketsData {
    return this.getCurrentData.find((item: {id: string}) => item.id === this.selectedItemId) || this.getCurrentData[0]
  }

  getRocketById(itemId: string) {
    return this.rocketsItems.find((item: {id: string}) => item.id === itemId);
  }

  *fetchData(type: string) {
    const api = new Api()
    this.isLoading = true

    if(type === 'Launches') {
      yield api.fetchLaunches(1)
        .then((item) => {
          this.launchesItems = arrLaunchesSchema.parse(item)
          this.isLoading = false
      })
    }

    if(type === 'Rockets') {
      yield api.fetchRockets()
        .then((item) => {
          this.rocketsItems = arrRocketsSchema.parse(item)
          this.isLoading = false
        })
    }
  }
}

export const mainStore = new Main()

