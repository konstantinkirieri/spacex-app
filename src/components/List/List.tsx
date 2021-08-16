import React from 'react'

import S from './List.module.css'
import {ILaunchesData, IRocketsData} from '../../interfaces'

export const List: React.FC<{
  data: [ILaunchesData | IRocketsData],
  onClickItem: (id: string | null) => void
}> = ({data, onClickItem}) => {
  return (
    <>
      {data ? (
        data.map((item) => {
          return (
            <div
              key={item.id}
              className={S.item}
              onClick={() => onClickItem(item.id)}>
              <img
                className={S.img}
                src={
                  item.dataType === 'Launches'
                    ? item.links.patch.small
                    : item.flickr_images
                }
                alt={item.name}
              />
              <div className={S.body}>
                <h3 className={S.title}>{item.name}</h3>
                <div className={S.description}>
                  {item.dataType === 'Launches' ? (
                    item.success ? (
                      <span className={S.success}>
                        Success.{' '}
                      </span>
                    ) : (
                      <span className={S.failure}>
                        Failure.{' '}
                      </span>
                    )
                  ) : undefined}
                  {item.dataType === 'Launches'
                    ? item.details
                    : item.description}
                </div>
              </div>
              {item.isFavorite && (
                <i className={`${S.like} fas fa-heart`} />
              )}
            </div>
          )
        })
      ) : (
        <p>Not found items</p>
      )}
    </>
  )
}
