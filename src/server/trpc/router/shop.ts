import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const shopRouter = router({        
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.prisma.shop.findFirst({
      where:{
        id: input
      }
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.shop.findMany();
  }),
  createShop: publicProcedure.input(z.any()).mutation(async ({ctx, input})=>{
    console.log(input);
    await ctx.prisma.shop.create({
      data: input
     })
  })
});
