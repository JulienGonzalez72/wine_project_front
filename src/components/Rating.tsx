import { useState } from 'react'

interface Props {
  value?: number
  notable?: boolean
  onRate?: (value: number) => any
}

export default function Rating({ value, notable, onRate }: Props) {
  const [hoverValue, setHoverValue] = useState(0)

  const starClass = (index: number) => {
    let classes = 'fa fa-star'
    if (notable) {
      if (hoverValue <= index) {
        classes += '-o'
      }
    } else if ((value || 0) <= index) {
      classes += '-o'
    }
    return classes
  }

  const baseClass = notable ? 'cursor-pointer' : ''

  const clickRating = (index: number) => {
    if (!notable) {
      return
    }
    onRate?.(index + 1)
  }

  return (
    <div className={baseClass} onMouseLeave={() => setHoverValue(0)}>
      {new Array(5).fill(null).map((_, index) => (
        <span
          key={index}
          className={starClass(index)}
          onMouseEnter={() => setHoverValue(index + 1)}
          onClick={() => clickRating(index)}
        ></span>
      ))}
    </div>
  )
}
