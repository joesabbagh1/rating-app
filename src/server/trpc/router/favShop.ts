import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const favoriteRouter = router({        
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.favorite.findFirst({
      where:{
        id: input
      }
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.favorite.findMany();
  }),
  createFavorite: publicProcedure.input(z.any()).mutation(async ({ctx, input})=>{
    await ctx.prisma.favorite.create({
      data: input
     })
  })
});
