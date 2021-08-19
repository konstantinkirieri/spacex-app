import {
  makeObservable,
  observable,
  action,
} from 'mobx'

export class FavoritesStore {
  favoritesDataStore: any = this.loadFromLocalStorage()

  constructor() {
    makeObservable(this, {
        favoritesDataStore: observable,
        addToStore: action.bound,
        deleteFromStore: action.bound,
        loadFromLocalStorage: action.bound,
        updateLocalStorage: action.bound,
      }
    )
  }

  addToStore(item: any) {
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
    return !getItem ? [] : JSON.parse(getItem);
  }

  updateLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.favoritesDataStore));
  }

}