import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const drizzle = useDrizzle();
  
  // Finde den ersten Benutzer
  const firstUser = await drizzle.query.users.findFirst({
    orderBy: (users, { asc }) => [asc(users.twitchId)],
  });

  if (!firstUser) {
    return createError({
      statusCode: 404,
      statusMessage: 'No users found in database',
    });
  }

  // Mache ihn zum Admin
  await drizzle
    .update(tables.users)
    .set({ godMode: true })
    .where(eq(tables.users.twitchId, firstUser.twitchId));

  return {
    message: `User ${firstUser.displayName} is now admin`,
    user: firstUser,
  };
}); 