import {makeObservable, observable, action, computed} from 'mobx'
import {favoritesStore, mainStore} from './index'

class SearchStore {
  keyword: string = ''
  filterCategory: string = ''
  constructor() {
    makeObservable(this, {
      keyword: observable,
      addKeyword: action.bound,
      findItem: action,
      filterCategory: observable,
      changeFilterCategory: action.bound,
      filteredData: computed
    })
  }

  addKeyword(value: string) {
    this.keyword = value
  }

  findItem(item: {name: string}) {
    const regexp = new RegExp(this.keyword, 'i')
    return item.name.match(regexp)
  }

  changeFilterCategory(category: string) {
    this.filterCategory = category
  }

  get filteredData() {
    if (mainStore.currentCategory === 'Favorites') {
      return favoritesStore.favoritesDataStore
        .filter((item: {dataType: string}) =>
          this.filterCategory !== ''
            ? item.dataType === this.filterCategory
            : true
        )
        .filter((item: {name: string}) =>
          this.keyword ? this.findItem(item) : true
        )
    }

    return mainStore.currentData
  }
}

export const searchStore = new SearchStore()
