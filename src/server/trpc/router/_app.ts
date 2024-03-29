import { router } from "../trpc";
import { authRouter } from "./auth";
import { favoriteRouter } from "./favShop";
import { reviewRouter } from "./reviews";
import { shopRouter } from "./shop";
import { userRouter } from "./user";

export const appRouter = router({
  users: userRouter,
  shops: shopRouter,
  reviews: reviewRouter,
  auth: authRouter,
  favorite: favoriteRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
