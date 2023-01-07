import { StaticImageData } from "next/image"

export type Shop = {
  image?: StaticImageData
  title: string
  priceTag: string[]
  rating: number[]
}
