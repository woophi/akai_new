export enum VkAppName {
  Showtime = 'showtime',
}

export const vkAppAdapterFromBasePath: Record<string, VkAppName> = {
  'show-time': VkAppName.Showtime,
};
