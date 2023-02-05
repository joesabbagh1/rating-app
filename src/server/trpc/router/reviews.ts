import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const reviewRouter = router({        
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.review.findMany();
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.review.findUnique({
      where: {
        id: input
      }
    });
  }),

  createReview: publicProcedure.input(z.any()).mutation(async ({ctx, input})=>{
    await ctx.prisma.review.create({
      data: input
     })
  })
});
