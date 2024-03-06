import { AxiosError, AxiosResponse } from "axios";
import axiosClient from "./config";

export const getCurrentUser = async (): Promise<User> => {
  try {
    const { data } = await axiosClient.get<null, AxiosResponse<User>>(`/user`);

    const user = data;

    return user;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    return errData;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const { data } = await axiosClient.get<null, AxiosResponse<User[]>>(
      "/user/all"
    );

    const users = data;

    return users;
  } catch (error) {
    const err = error as AxiosError<any>;
    const errData = err.response?.data;
    throw errData;
  }
};
