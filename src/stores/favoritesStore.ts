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
    const setFavoriteDate = Date.now()
    item = {
      ...item,
      favoriteDate: setFavoriteDate
    }
    this.favoritesDataStore.push(item)
    this.updateLocalStorage()
  }

  deleteFromStore(id: string | null) {
    const index = this.favoritesDataStore.findIndex(
      (item: {id: string}) => item.id === id
    )
    this.favoritesDataStore.splice(index, 1)
    this.updateLocalStorage()
  }

  loadFromLocalStorage() {
    const getItem = localStorage.getItem('favorites')
    return !getItem ? [] : JSON.parse(getItem)
  }

  updateLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.favoritesDataStore))
  }
}

export const favoritesStore = new FavoritesStore()
