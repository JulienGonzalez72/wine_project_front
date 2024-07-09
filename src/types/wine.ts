import { Model } from './model'

export type WineColor = 'white' | 'red' | 'pink'

export interface Wine extends Model {
  name: string
  color: WineColor
  price_cents: number
  website: string
  average_rating: number
  nb_ratings: number
}
