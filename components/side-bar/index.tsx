import React from "react";
import NewChatButton from "./new-chat-button";
import ChatList from "./chat-list";

const SideBar = () => {
  return (
    <div className="h-full hidden lg:flex lg:w-[300px] lg:flex-col p-4 bg-neutral-900 ">
      <NewChatButton />
      <ChatList />
      更新计划
    </div>
  );
};

export default SideBar;
