import { router } from "../trpc";
import { authRouter } from "./auth";
import { shopRouter } from "./shop";
import { userRouter } from "./user";

export const appRouter = router({
  users: userRouter,
  shops: shopRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
