import { mutation } from "./_generated/server";

export const store = mutation({
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

    if (user) {
      return user._id;
    }

    const userId = await ctx.db.insert("users", {
      tokenIdentifies: identity.tokenIdentifier,
      model: "gpt-3.5-turbo-1106",
    });

    await ctx.db.insert("chats", {
      userId,
      title: "New Chat",
    });

    return user;
  },
});
