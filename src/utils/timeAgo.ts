import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend Day.js with the relativeTime plugin
dayjs.extend(relativeTime);

export const timeAgo = (createdAt: string): string => {
  return dayjs(createdAt).fromNow();
};
