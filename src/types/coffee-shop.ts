import { StaticImageData } from "next/image"

export type CoffeeShop = {
  image: StaticImageData
  title: string
  priceTag: string[]
  rating: number[]
}
