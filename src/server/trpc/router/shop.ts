import { z } from 'zod'

import { router, publicProcedure } from '../trpc'

export const shopRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.shop.findMany()
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.shop.findUnique({
      where: {
        id: input,
      },
    })
  }),

  getByName: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.shop.findMany({
      where: {
        title: {
          contains: input,
        },
      },
    })
  }),

  createShop: publicProcedure.input(z.any()).mutation(async ({ ctx, input }) => {
    await ctx.prisma.shop.create({
      data: input,
    })
  }),
})
