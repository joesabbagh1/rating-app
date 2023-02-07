import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

export const reviewRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.review.findMany()
  }),

  getByShop: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.review.findMany({
      where: {
        shopId: input,
      },
    })
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.review.findUnique({
      where: {
        id: input,
      },
    })
  }),

  getReviewsCountPerShop: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.review.count({
      where: { shopId: input },
    })
  }),

  createReview: publicProcedure.input(z.any()).mutation(async ({ ctx, input }) => {
    const shop = await ctx.prisma.shop.findUnique({ where: { id: input.shopId } })
    const reviewCount = await ctx.prisma.review.count({ where: { shopId: input.shopId } })
    await ctx.prisma.shop.update({
      data: {
        rating: shop?.rating
          ? (shop?.rating * reviewCount + input.rating) / (reviewCount + 1)
          : input.rating,
        price: shop?.price
          ? (shop.price * reviewCount + input.price) / (reviewCount + 1)
          : input.price,
      },
      where: { id: input.shopId },
    })
    await ctx.prisma.review.create({
      data: input,
    })
  }),
})
