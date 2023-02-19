import { z } from 'zod'

import { router, publicProcedure } from '../trpc'
import S3 from 'aws-sdk/clients/s3'
import { randomUUID } from 'crypto'
import { Shop } from '@prisma/client'

const s3 = new S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: 'v4',
})

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

  getShopImgae: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: input,
    }

    const getUrl = s3.getSignedUrl('getObject', s3Params)

    console.log(123234234422432, getUrl)

    return getUrl
  }),
})
