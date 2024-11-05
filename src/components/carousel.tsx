"use client"

import * as React from "react"
import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Product } from "@/app/page"
import Image from "next/image"
type Props = {
  products: Product[]
}

export default function Component(props: Props) {
  const { products } = props
  const [api, setApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 5)
    }, 3000) // Switch every 3 seconds

    return () => clearInterval(intervalId)
  }, [api])

  useEffect(() => {
    api?.scrollTo(currentIndex)
  }, [api, currentIndex])

  return (
    <div className="max-w-[1040px] max-h-[446px] border border-gray-300 overflow-hidden rounded-2xl">
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent>
          {products.map((p) => (
            <CarouselItem key={p._id}>
              <Card className="w-full h-full border-none shadow-none bg-transparent flex justify-center">
                {/* <CardContent className="flex items-center justify-center h-full"> */}
                  {p.images &&
                    <Image priority={true} src={p?.images?.[0]} height={500} width={500} className="h-[446px] w-500 object-contain" alt="" />
                  }
                {/* </CardContent> */}
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}