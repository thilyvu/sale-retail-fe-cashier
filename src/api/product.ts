import { ESProductDocument } from "~/types/product";
import axiosClient from "./AxiosClient";

export const searchProduct: (
  keywords: string,
  limit: number
) => Promise<Array<ESProductDocument>> = async (
  keywords: string,
  limit: number
) =>
  await axiosClient.get("/product/search", {
    params: {
      keywords,
      limit,
    },
  });
