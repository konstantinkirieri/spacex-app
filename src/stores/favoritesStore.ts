import {makeObservable, observable, action} from 'mobx'
import { ILaunchesData, IRocketsData } from '../interfaces'

export class FavoritesStore {
  favoritesDataStore: Array<ILaunchesData | IRocketsData> = this.loadFromLocalStorage()

  constructor() {
    makeObservable(this, {
      favoritesDataStore: observable,
      addToStore: action.bound,
      deleteFromStore: action.bound,
      loadFromLocalStorage: action.bound,
      updateLocalStorage: action.bound
    })
  }

  addToStore(item: ILaunchesData | IRocketsData) {
    item.favoriteDate = Date.now()
    this.favoritesDataStore.push(item)
    this.updateLocalStorage()
  }

  deleteFromStore(id: string | null): void {
    const index = this.favoritesDataStore.findIndex(
      (item: {id: string}) => item.id === id
    )
    this.favoritesDataStore.splice(index, 1)
    this.updateLocalStorage()
  }

  loadFromLocalStorage(): Array<ILaunchesData | IRocketsData> {
    const localStorageItem = localStorage.getItem('favorites')
    return !localStorageItem ? [] : JSON.parse(localStorageItem)
  }

  updateLocalStorage(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favoritesDataStore))
  }
}

export const favoritesStore = new FavoritesStore()
