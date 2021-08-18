import React from 'react'

export const BASE_URL ="https://api.spacexdata.com/v5/";

export class Api extends React.Component<any, any> {

  constructor(props?: any) {
    super(props)
  }


  async _getData(source: {path: string, data?: any,config?: any}) {
    const {path, data, config} = source;
    try {
      const request = await fetch(`${BASE_URL}${path}`, {
        ...config,
        body: JSON.stringify(data),
        headers: {
          'Content-type':'application/json'
        }
      });
      return await request.json();
    } catch(e) {
      console.error('getData Error: ', e)
    }
  }

  async getRockets(): Promise<any[]> {
    const result = await this._getData({path: 'rockets/query', data:{
      options: {
        limit: 4,
      }
    }, config: {method: 'POST'}})
    return this._transformRocketsData(result.docs);
  }

  async getLaunches(page: number): Promise<any[]> {
    const result = await this._getData({path: 'launches/query', data:{
        options: {
          limit: 10,
          page,
          pagination: true,
        }
      }, config: {method: 'POST'}})
    return this._transformLaunchesData(result.docs);
  }

  _transformLaunchesData(data: any): any[] {
    return [...data].map((item: any) => {
      return {
        ...item,
        isFavorite: false,
        dataType: 'Launches',
      }
    });
  }
  _transformRocketsData(data: any): any[] {
    const originalData = [...data];
    return originalData.map(item => {
      return {
        ...item,
        isFavorite: false,
        dataType: 'Rockets',
      }
    })
  }
}