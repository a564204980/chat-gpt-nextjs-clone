/**
 * 中间件文件：https://nextjs.org/docs/app/building-your-application/routing/middleware
 * 用于身份验证
 * convex 和 clerk 当没有用户信息的时候无法重定向到登录页
 * 解决方法https://stackoverflow.com/questions/78464249/convex-with-clerk-dont-redirect-me-to-the-login-page
 *
 * clerkMiddleware 处理用户身份验证的服务端中间件，用于处理身份验证请求
 * createRouteMatcher 创建路由匹配器，帮助决定哪些路由应该被身份验证中间件保护
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 定义路由匹配器，表示所有的路由都要经过验证
const isProtectedRoute = createRouteMatcher(["/(.*)", "/"]);

// 每当有请求进入时，Clerk 中间件会检查用户的认证状态，并为下游请求提供相应的用户数据
export default clerkMiddleware((auth, req) => {
  // isProtectedRoute(req) 请求的路径是否是受保护的路由，是的话就用 auth().protect() 来验证身份
  if (isProtectedRoute(req)) auth().protect();
});

// 用于配置哪些请求路径会被中间件处理
export const config = {
  matcher: [
    // 匹配所有不包含 _next（Next.js 内部资源）或静态文件的路径，确保这些文件不会被中间件处理
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // 确保所有 /api 和 /trpc 路径下的请求都会经过中间件处理
    "/(api|trpc)(.*)",
  ],
};
