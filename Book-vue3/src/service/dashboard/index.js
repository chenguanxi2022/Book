import { get } from "../../utils/request";

export const baseInfo = () => {
  return get("/dashboard/baseInfo");
};
