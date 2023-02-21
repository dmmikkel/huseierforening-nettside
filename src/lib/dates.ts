import { format, parseISO } from "date-fns";
import nb from "date-fns/locale/nb/index.js";

export const toLongDate = (date: string) =>
  format(parseISO(date), "d. MMMM yyyy", {
    locale: nb,
  });

export const toShortDateWithWeekday = (date: string) =>
  format(parseISO(date), "EEEE, d. MMM", {
    locale: nb,
  });
