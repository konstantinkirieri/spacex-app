import {makeObservable, observable, action} from 'mobx'
import {ILaunchesData, IRocketsData} from '../interfaces'

export class Favorites {
  favoritesDataStore: Array<ILaunchesData | IRocketsData> =
    Favorites.loadFromLocalStorage()

  constructor() {
    makeObservable(this, {
      favoritesDataStore: observable,
      addItem: action.bound,
      deleteItem: action.bound
    })
  }

  private static loadFromLocalStorage(): Array<ILaunchesData | IRocketsData> {
    const localStorageItem = localStorage.getItem('favorites')

    return !localStorageItem
      ? []
      : JSON.parse(localStorageItem).sort(
          (a: {favoriteDate: number}, b: {favoriteDate: number}) =>
            b.favoriteDate - a.favoriteDate
        )
  }

  private updateLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.favoritesDataStore))
  }

  set addToFavorites(item: ILaunchesData | IRocketsData) {
    item.favoriteDate = Date.now()
    this.addItem(item)
    this.updateLocalStorage()
  }

  set deleteFromFavorites(id: string | null) {
    const index = this.favoritesDataStore.findIndex(
      (item: {id: string}) => item.id === id
    )
    this.deleteItem(index)
    this.updateLocalStorage()
  }

  addItem(item: ILaunchesData | IRocketsData) {
    this.favoritesDataStore.push(item)
  }

  deleteItem(index: number) {
    this.favoritesDataStore.splice(index, 1)
  }
}

export const favoritesStore = new Favorites()
