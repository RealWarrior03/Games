export default defineOAuthTwitchEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    const isAllowedUser = await useDrizzle().query.users.findFirst({
      where: eq(tables.users.twitchId, user.id),
    });

    if (!isAllowedUser) {
      console.log('User not found, adding to database:', user);
      
      // Automatisch den Benutzer zur Datenbank hinzufügen
      await useDrizzle().insert(tables.users).values({
        twitchId: user.id,
        displayName: user.display_name,
        avatar: user.profile_image_url,
        email: user.email,
        godMode: false, // Standardmäßig kein Admin
      });
      
      console.log('User added to database successfully');
    }

    await setUserSession(event, {
      user: {
        twitchId: user.id,
        email: user.email,
        name: user.name,
        displayName: user.display_name,
        avatar: user.profile_image_url,
        // As we only have a user:read:email scope, it is fine to "expose" the access token
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expirationDate: new Date(Date.now() + tokens.expires_in * 1000),
      },
    });
    return sendRedirect(event, '/');
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('Twitch Auth error:', error);
    return sendRedirect(event, '/');
  },
});
