"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, SquarePen } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

/**
 * 新的回话按钮组件
 */
const NewChatButton = () => {
  const { mutate, pedding } = useApiMutation(api.chats.create);

  const handleAdd = () => {
    mutate({});
  };

  return (
    <Button
      className="w-full flex justify-center items-center hover:bg-neutral-800/80 "
      onClick={handleAdd}
      disabled={pedding}
    >
      <PlusCircle className="w-5 h-5" />
      <p className="font-semibold text-start ml-3">ChatGpt</p>
      <SquarePen className="w-4 h-4 text-white/75 ml-auto hover:text-white" />
    </Button>
  );
};

export default NewChatButton;
