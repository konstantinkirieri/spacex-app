import React from "react";
import {observer} from 'mobx-react'
import {FavoritesStore, LaunchesStore, RocketsStore} from '../../stores'
import {Header} from "../Header/Header";
import {Table} from "../Table/Table";

import S from './styles.module.css'

const favoritesStore = new FavoritesStore();
const launchesStore = new LaunchesStore(favoritesStore);
const rocketsStore = new RocketsStore(favoritesStore);

export const App: React.FC = observer(() => {
  return (
    <div className={S.app}>
        <Header />
        <Table launchesStore={launchesStore} favoritesStore={favoritesStore} rocketsStore={rocketsStore}/>
    </div>
  )
})
