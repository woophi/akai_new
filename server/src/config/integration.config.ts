import { registerAs } from '@nestjs/config';

export const integrationConfig = registerAs('integration', () => ({
  sentryDNS: process.env.SENTRY_DNS,
  groupAccessKey: process.env.GROUP_ACCESS_KEY,
  groupId: process.env.VK_GROUP_ID,
  botConversationId: process.env.BOT_CONVERSATION_ID,
  allowedReviewerIds: process.env.ALLOWED_REVIEWER_IDS,
  movieApiKey: process.env.MOVIE_API_KEY,
}));
