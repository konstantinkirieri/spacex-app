import {makeObservable, observable, action, flow} from 'mobx'
import {Api} from '../api'

const api = new Api;

export class LaunchesStore {
  isLoading: boolean = true
  launchesDataStore: any[] = []

  favoritesStore;

  constructor(favoritesStore: any) {
    makeObservable(this, {
      launchesDataStore: observable,
      isLoading: observable,
      loadLaunches: flow.bound,
      updateLaunches: action.bound,
      setIsLoading: action.bound,
      addToFavorites: action.bound
    })
    this.favoritesStore = favoritesStore;
  }

  updateLaunches(item: any[]) {
    this.launchesDataStore = item
  }

  setIsLoading(status: boolean) {
    this.isLoading = status;
  }

  *loadLaunches() {
    this.setIsLoading(true);
    yield api.fetchLaunches(1).then((item: any[]) => {
      this.updateLaunches(item);
      this.setIsLoading(false);
    })
  }

  addToFavorites(id: string | null) {
    const index = this.launchesDataStore.findIndex(
      (item: {id: string}) => item.id === id
    )
    this.favoritesStore.addToStore(this.launchesDataStore[index])
  }
}
