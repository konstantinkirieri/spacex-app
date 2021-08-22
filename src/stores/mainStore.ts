import {makeObservable, action, observable, computed} from 'mobx'
import {launchesStore} from './launchesStore'
import {rocketsStore} from './rocketsStore'
import {favoritesStore} from './favoritesStore'
import {ILaunchesData, IRocketsData} from '../interfaces'

class Main {
  selectedCategory: string = 'Launches'
  selectedItemId: string | null = null

  constructor() {
    makeObservable(this, {
      selectedCategory: observable,
      selectedItemId: observable,
      setCategory: action.bound,
      setItemId: action.bound,
      getCurrentData: computed,
      getCurrentItem: computed
    })
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
      return rocketsStore.rocketsDataStore
    if (this.selectedCategory === 'Favorites')
      if (!favoritesStore.favoritesDataStore) {
        return []
      } else {
        return favoritesStore.favoritesDataStore.slice().sort((a, b) => b.favoriteDate - a.favoriteDate)
      }

    return launchesStore.launchesDataStore
  }

  get getCurrentItem(): ILaunchesData | IRocketsData {
    const result = this.getCurrentData.find((item: {id: string}) => item.id === this.selectedItemId)

    if (result) {
      return result
    } else {
      return this.getCurrentData[0]
    }
  }
}

export const mainStore = new Main()

