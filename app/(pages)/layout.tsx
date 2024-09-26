import React from "react";
import SideBar from "@/components/side-bar";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="flex h-full text-white">
      <SideBar />
      <div className="w-full h-full ">{children}</div>
    </div>
  );
};

export default ChatLayout;
