"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/auth/loading";
import { useConvexAuth, useMutation } from "convex/react"; // 处理身份验证
import { api } from "@/convex/_generated/api";

const SignUp = () => {
  const { isAuthenticated } = useConvexAuth();
  const storeUser = useMutation(api.users.store);
  const router = useRouter();

  useEffect(() => {
    const storeUserData = async () => {
      // 是否登录
      if (isAuthenticated) {
        try {
          await storeUser();
          router.push("/");
        } catch (error) {
          console.log("error", error);
        }
      }
    };

    storeUserData();
  }, [isAuthenticated, router, storeUser]);

  return (
    <div>
      <Loading />
    </div>
  );
};

export default SignUp;
