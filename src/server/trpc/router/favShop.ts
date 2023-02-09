import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

export const favoriteRouter = router({
  getById: publicProcedure.input(z.any()).query(async ({ ctx, input }) => {
    return await ctx.prisma.favorite.findMany({
      where: {
        userId: input.userId,
        shopId: input.shopId,
      },
    })
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.favorite.findMany()
  }),

  getAllShopPerUser: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.prisma.shop.findMany({
      where: {
        UserFavorite: {
          some: {
            userId: input,
          },
        },
      },
    })
  }),

  createFavorite: publicProcedure.input(z.any()).mutation(async ({ ctx, input }) => {
    await ctx.prisma.favorite.create({
      data: input,
    })
  }),

  deleteFavorite: publicProcedure.input(z.any()).mutation(async ({ ctx, input }) => {
    await ctx.prisma.favorite.deleteMany({
      where: {
        userId: input.userId,
        shopId: input.shopId,
      },
    })
  }),
})
