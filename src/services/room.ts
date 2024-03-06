import { AxiosError, AxiosResponse } from "axios";
import axiosClient from "./config";

export const getRooms = async (): Promise<Room[]> => {
  try {
    const { data } = await axiosClient.get<null, AxiosResponse<Room[]>>(
      "/room"
    );

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const errData = err.response?.data;
    throw errData;
  }
};

export const getRoomById = async (id: string): Promise<Room> => {
  try {
    const { data } = await axiosClient.get<{ id: string }, AxiosResponse<Room>>(
      `/room/${id}`
    );

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const errData = err.response?.data;
    throw errData;
  }
};

export const createRoom = async (roomData: CreateRoomType) => {
  try {
    const { status } = await axiosClient.post<
      CreateRoomType,
      AxiosResponse<Room>
    >("/room", roomData);

    return {
      status,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errData = err.response?.data;
    throw errData;
  }
};

export const getRoomMessage = async (id: string) => {
  try {
    const { data } = await axiosClient.get<
      { id: string },
      AxiosResponse<MessageReceiver[]>
    >(`/message/${id}`);

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const errData = err.response?.data;
    throw errData;
  }
};

export const saveRoomMessage = async (messageData: Message) => {
  try {
    const { data } = await axiosClient.post<Message, AxiosResponse<Message>>(
      `/message`,
      messageData
    );

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const errData = err.response?.data;
    throw errData;
  }
};

export const readRoomMessage = async (readMessageData: ReadMessageData) => {
  try {
    const { data } = await axiosClient.post<
      ReadMessageData,
      AxiosResponse<Message>
    >(`/message/read`, readMessageData);

    return data;
  } catch (error) {
    const err = error as AxiosError;
    const errData = err.response?.data;
    throw errData;
  }
};
