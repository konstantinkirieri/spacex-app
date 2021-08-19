import {makeObservable, observable, action, flow} from 'mobx'
import {Api} from '../api'

const api = new Api;

export class LaunchesStore {
  isLoading: boolean = true
  // isLoadingMore: boolean = true
  launchesDataStore: any[] = []
  nextPage = 0

  favoritesStore;

  constructor(favoritesStore: any) {
    makeObservable(this, {
      launchesDataStore: observable,
      isLoading: observable,
      // isLoadingMore: observable,
      loadLaunches: flow.bound,
      updateLaunches: action.bound,
      setIsLoading: action.bound,
      addToFavorites: action.bound
    })
    this.favoritesStore = favoritesStore;
  }

  updateLaunches(item: any[]) {
    this.launchesDataStore = this.launchesDataStore.concat(item)
  }

  setIsLoading(status: boolean) {
    this.isLoading = status;
  }

  *loadLaunches() {
    this.setIsLoading(true);
    console.log(this.nextPage)
    this.nextPage++
    yield api.fetchLaunches(this.nextPage).then((item: any[]) => {
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
