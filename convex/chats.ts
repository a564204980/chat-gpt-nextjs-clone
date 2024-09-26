import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("未经授权");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifies", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new Error("用户不存在");

    const chatId = await ctx.db.insert("chats", {
      userId: user._id,
      title: "New chat",
    });

    return chatId;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("未经授权");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifies", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new Error("用户不存在");

    return ctx.db
      .query("chats")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});
