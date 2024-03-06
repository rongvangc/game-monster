import { format } from "date-fns";

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const dateFormat = (dateString: string) =>
  format(new Date(dateString), "MM/dd/yyyy");
