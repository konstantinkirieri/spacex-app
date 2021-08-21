import {makeObservable, action, observable} from 'mobx'
import {launchesStore} from './launchesStore'
import {rocketsStore} from './rocketsStore'
import {favoritesStore} from './favoritesStore'
import {ILaunchesData, IRocketsData} from '../interfaces'

class Main {
  selectedCategory: string = 'Launches'
  selectedItemId: string | null = null
  currentData: Array<ILaunchesData | IRocketsData> | null = []

  constructor() {
    makeObservable(this, {
      selectedCategory: observable,
      selectedItemId: observable,
      setCategory: action.bound,
      setItemId: action.bound,
      getCurrentData: action.bound,
      currentData: observable
      //getAllItems: action,
    })
  }
  setCategory(category: string) {
    this.selectedCategory = category
    this.selectedItemId = null

  }
  setItemId(id: string | null) {
    this.selectedItemId = id
  }

  getCurrentData(): Array<ILaunchesData | IRocketsData> | null {
    if (this.selectedCategory === 'Launches')
        this.currentData = launchesStore.launchesDataStore
    if (this.selectedCategory === 'Rockets')
        this.currentData = rocketsStore.rocketsDataStore
    if (this.selectedCategory === 'Favorites')
        this.currentData = favoritesStore.favoritesDataStore

    return null
  }
}

export const mainStore = new Main();

