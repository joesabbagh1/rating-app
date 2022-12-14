import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const shopRouter = router({        
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.shop.findFirst({
      where:{
        id: input
      }
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.shop.findMany();
  }),
  createShop: publicProcedure.input(z.any()).mutation(async ({ctx, input})=>{
    const id = Date.now().toString(36)
    console.log(input);
    
    let shop = {id: id, ...input}
    let shopb = await ctx.prisma.shop.create({
      data: shop
     })
    console.log("shop: ", shopb);
    
    
    return shop
  })
});
