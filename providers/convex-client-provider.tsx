"use client";

import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import Loading from "@/components/auth/loading";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider
      // 用户没有登录并尝试访问需要认证的内容，会被重定向到sign-up页面
      signInUrl="/sign-up"
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {/* 认证中 */}
        <AuthLoading>
          <Loading />
        </AuthLoading>
        {/* 认证成功 */}
        <Authenticated>{children}</Authenticated>
        {/* 认证失败 */}
        <Unauthenticated>{children}</Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
