import { Wine } from '../types/wine'

const WINE_COLOR_MAPPING = {
  red: 'Rouge',
  white: 'Blanc',
  pink: 'Rosé'
}

export function formatWineColor(wine: Wine): string {
  return WINE_COLOR_MAPPING[wine.color]
}

export function formatWinePrice(wine: Wine): string {
  return `${wine.price_cents / 1000} €`
}
