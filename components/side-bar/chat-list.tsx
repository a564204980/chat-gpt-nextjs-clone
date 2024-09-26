"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import React from "react";

const ChatList = () => {
  const chats = useQuery(api.chats.list);

  const { chatId } = useParams<{ chatId: Id<"chats"> }>();

  return <div>ChatList</div>;
};

export default ChatList;
