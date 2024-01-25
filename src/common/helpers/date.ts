import type { Dayjs } from "dayjs";

export const getCombinedDatetime = (date: Dayjs, time: Dayjs) => {
  return date
    .set("hour", time.hour())
    .set("minute", time.minute())
    .set("second", time.second());
};
