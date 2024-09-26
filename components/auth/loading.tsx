import Image from "next/image";
import React from "react";

/**
 * 权限认证loading加载界面
 */

const Loading = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center ">
      <Image
        priority
        alt="loging"
        src="/loading.png"
        width={270}
        height={303}
        className="animate-pulse duration-700"
      />
    </div>
  );
};

export default Loading;
