import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * 定义users数据库结构
 */
export default defineSchema({
  /**
   * 用户表
   */
  users: defineTable({
    tokenIdentifies: v.string(),
    // v.union() 用来定义多个值类型  v.literal() 用来定义特殊的值，这里的值只能是括号里面的
    model: v.union(
      v.literal("gpt-3.5-turbo-1106"),
      v.literal("gpt-4-0125-preview")
    ),
    // v.optional 可选
    endsOn: v.optional(v.number()),
    subscriptionId: v.optional(v.string()),
  })
    .index("by_token", ["tokenIdentifies"])
    .index("by_subscriptionId", ["subscriptionId"]),

  /**
   * 会话表
   */
  chats: defineTable({
    userId: v.id("users"),
    title: v.string(),
  }).index("by_userId", ["userId"]),
});
