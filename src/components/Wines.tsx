import React, { useState } from 'react'
import { Wine } from '../types/wine'
import { index, post } from '../services/api'
import { formatWineColor, formatWinePrice } from '../services/formatters'
import Rating from './Rating'

const TABLE_ROW_CLASSES = 'border-1'
const TABLE_CELL_CLASSES = 'border-2 text-lg p-4'

export default function Wines() {
  const [wines, setWines] = useState<Wine[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  const onSearch = () => {
    if (searchValue.length) {
      index<Wine>('wines', { search: searchValue }).then(setWines).catch(console.error)
    } else {
      setWines([])
    }
  }

  const onSearchChanged = (e: React.BaseSyntheticEvent) => {
    setSearchValue(e.target.value)
  }

  const onSearchKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  const renderRating = (wine: Wine) => {
    if (wine.nb_ratings > 0) {
      return (
        <div>
          <Rating value={wine.average_rating}></Rating>
          <div>{wine.nb_ratings} avis</div>
        </div>
      )
    }
    return <>Aucun avis</>
  }

  const rate = (wine: Wine, value: number) => {
    post<Wine>(`wines/${wine.id}/rate`, { value })
      .then(res => {
        const newWines = wines.map(w => {
          if (w.id === wine.id) {
            return res
          }
          return w
        })
        setWines(newWines)
      })
      .catch(console.error)
  }

  const renderTable = () => {
    if (wines.length) {
      return (
        <table>
          <thead>
            <tr className={TABLE_ROW_CLASSES}>
              <th className={TABLE_CELL_CLASSES}>Nom</th>
              <th className={TABLE_CELL_CLASSES}>Type</th>
              <th className={TABLE_CELL_CLASSES}>Prix</th>
              <th className={TABLE_CELL_CLASSES}>Site internet</th>
              <th className={TABLE_CELL_CLASSES}>Note moyenne</th>
              <th className={TABLE_CELL_CLASSES}>Noter</th>
            </tr>
          </thead>
          <tbody>
            {wines.map(wine => (
              <tr key={wine.id} className={TABLE_ROW_CLASSES}>
                <td className={TABLE_CELL_CLASSES}>{wine.name}</td>
                <td className={TABLE_CELL_CLASSES}>{formatWineColor(wine)}</td>
                <td className={TABLE_CELL_CLASSES}>{formatWinePrice(wine)}</td>
                <td className={TABLE_CELL_CLASSES}>{wine.website}</td>
                <td className={TABLE_CELL_CLASSES}>{renderRating(wine)}</td>
                <td className={TABLE_CELL_CLASSES}>
                  <Rating notable={true} onRate={value => rate(wine, value)}></Rating>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
    return <>Aucun résultat trouvé</>
  }

  const onSeed = () => {
    post('wines/seed')
      .then(res => {
        console.log('res', res)
      })
      .catch(console.error)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-3">
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Nom du vin"
          className="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          value={searchValue}
          onChange={onSearchChanged}
          onKeyDown={onSearchKeyDown}
        />
        <button
          className="text-base px-2 border-4 rounded-md border-slate-600 bg-slate-600"
          onClick={onSearch}
        >
          Rechercher
        </button>
      </div>
      <div className="block">Vins: {wines.length}</div>
      <div className="block">{renderTable()}</div>
      <div className="block">
        <button
          className="text-base px-2 border-4 rounded-md border-slate-600 bg-slate-600"
          onClick={onSeed}
        >
          Remplir la base de données
        </button>
      </div>
    </div>
  )
}
