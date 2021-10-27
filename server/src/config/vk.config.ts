import { registerAs } from '@nestjs/config';

export const vkConfig = registerAs('vk', () => ({
  showtime: {
    serviceKey: process.env.ST_SERVICE_KEY,
    secretKey: process.env.ST_SECRET_KEY,
  },
}));
