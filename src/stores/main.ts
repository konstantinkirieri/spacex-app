import {
  makeObservable,
  observable,
  computed,
  action,
  flow
} from 'mobx'
import {api} from '../api'

import {favoritesStore} from './favorites'
import {
  arrLaunchesSchema,
  arrRocketsSchema,
  ILaunchesData,
  IRocketsData
} from '../interfaces'
import {searchStore} from './search'

class Main {
  _isLoading = true
  _page = 1
  _selectedCategory = 'Launches'
  _selectedItemId: string | null = null
  _rocket: IRocketsData | undefined
  sidebarIsOpen = false
  launchesItems: Array<ILaunchesData> = []
  rocketsItems: Array<IRocketsData> = []

  constructor() {
    makeObservable(this, {
      _isLoading: observable,
      _page: observable,
      _selectedItemId: observable,
      _selectedCategory: observable,
      _rocket: observable,
      sidebarIsOpen: observable,
      currentCategory: computed,
      launchesItems: observable,
      rocketsItems: observable,
      rocketItem: computed,
      currentData: computed,
      currentItem: computed,
      fetchData: flow.bound,
      loadMoreLaunches: action.bound,
      setIsLoading: action.bound,
      setCategory: action.bound,
      setLaunchesItems: action.bound,
      setRocketsItems: action.bound,
      setRocketItem: action.bound,
      setItemId: action.bound,
      toggleSidebar: action.bound,
      handleScroll: action
    })
  }

  get currentCategory() {
    return this._selectedCategory
  }

  get currentData(): Array<ILaunchesData | IRocketsData> {
    if (this._selectedCategory === 'Rockets')
      return this.rocketsItems

    if (this._selectedCategory === 'Favorites')
      if (!favoritesStore.favoritesDataStore) {
        return []
      } else {
        return favoritesStore.favoritesDataStore
      }

    return this.launchesItems
  }

  get currentItem(): ILaunchesData | IRocketsData {
    return (
      this.currentData.find(
        (item: {id: string}) =>
          item.id === this._selectedItemId
      ) || this.currentData[0]
    )
  }

  get rocketItem() {
    return this._rocket
  }

  set changeCategory(category: string) {
    this.setCategory(category)
    this.setItemId(null)
    searchStore.changeFilterCategory('')
  }

  set changeItemId(id: string | null) {
    this.setItemId(id)
  }

  setCategory(category: string) {
    this._selectedCategory = category
  }

  setItemId(id: string | null) {
    this._selectedItemId = id
  }

  setRocketItem(id: string) {
    this._rocket = this.rocketsItems.find(
      (item: {id: string}) => item.id === id
    )
  }

  setLaunchesItems(
    item: ILaunchesData[] | undefined
  ): void {
    this.launchesItems = this.launchesItems.concat(
      arrLaunchesSchema.parse(item)
    )
  }

  setRocketsItems(item: IRocketsData[] | undefined): void {
    this.rocketsItems = arrRocketsSchema.parse(item)
  }

  setIsLoading(type: boolean) {
    this._isLoading = type
  }

  *fetchData(type: string, page: number = this._page) {
    this.setIsLoading(true)

    if (type === 'Launches') {
      yield api
        .fetchLaunches(page)
        .then((item?: ILaunchesData[]) => {
          this.setLaunchesItems(item)
          this.setIsLoading(false)
        })
        .catch((e) => console.log(e, 'Error'))
    }

    if (type === 'Rockets') {
      yield api
        .fetchRockets()
        .then((item) => {
          this.setRocketsItems(item)
          this.setIsLoading(false)
        })
        .catch((e) => console.log(e, 'Error'))
    }
  }

  toggleSidebar(status: boolean) {
    this.sidebarIsOpen = status
  }

  handleScroll(e: any) {
    return (
      e.target.offsetHeight + e.target.scrollTop ===
        e.target.scrollHeight &&
      mainStore.loadMoreLaunches()
    )
  }

  loadMoreLaunches() {
    this._page++
    this.fetchData('Launches')
  }
}

export const mainStore = new Main()
