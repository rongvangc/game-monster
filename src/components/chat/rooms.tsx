import { SocketEvent } from "@/helpers/socketEvent";
import useSocketEvent from "@/hooks/useSocketEvent";
import { fallbackDisplayname } from "@/lib/utils";
import { getRooms } from "@/services/room";
import useChatStore from "@/stores/chat";
import useUserStore from "@/stores/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Rooms = () => {
  const { rooms, setRoomSelect, setCountRoom, setRoom, setRooms } =
    useChatStore();
  const { user } = useUserStore();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const handleUpdateRoom = (data: UpdatedRoom & { error?: any }) => {
    if (data?.error) {
      console.log("Error:", data.error);
    } else {
      setCountRoom(data);
    }
  };

  const handleNewRoom = (data: Room & { error?: any }) => {
    if (data?.error) {
      console.log("Error:", data.error);
    } else {
      setRoom(data);
    }
  };

  useSocketEvent({
    roomId: user?._id,
    eventName: SocketEvent.UPDATE_ROOM,
    callback: handleUpdateRoom,
  });
  useSocketEvent({
    roomId: user?._id,
    eventName: SocketEvent.NEW_ROOM,
    callback: handleNewRoom,
  });

  useEffect(() => {
    if (isSuccess) {
      setRooms(data);
    }
  }, [data, isSuccess, setRooms]);

  return rooms.length ? (
    <Card>
      <CardHeader>
        <CardTitle>Rooms</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {rooms?.map((item) => {
          const members = item?.userIds;
          const isGroup = members?.length > 2;

          const participantIds = members?.filter(
            (member) => member._id !== user?._id
          );

          // USER CHAT
          if (!isGroup) {
            return (
              <div
                key={item?._id}
                onClick={() => setRoomSelect(item?._id, participantIds)}
                className="flex items-center justify-between space-x-4 cursor-pointer rounded-s-full rounded-e-md hover:bg-slate-50"
              >
                <div className="flex items-center space-x-4 relative">
                  <Avatar>
                    <AvatarImage src={participantIds?.[0]?.photoURL} />
                    <AvatarFallback>
                      {fallbackDisplayname(participantIds?.[0]?.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none capitalize">
                      {participantIds?.[0]?.displayName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {participantIds?.[0]?.email}
                    </p>
                  </div>
                  {item?.count ? (
                    <Badge
                      className="-top-2 text-xs font-medium absolute"
                      variant="destructive"
                    >
                      {item?.count}
                    </Badge>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          }

          // GROUP CHAT
          return (
            <div
              key={item?._id}
              onClick={() => setRoomSelect(item?._id, participantIds)}
              className="flex items-center justify-between space-x-4 cursor-pointer rounded-s-full rounded-e-md hover:bg-slate-50"
            >
              <div className="flex items-center space-x-4 relative">
                <Avatar>
                  <AvatarFallback>GR</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex gap-1">
                    {participantIds?.map((item, i: number) => (
                      <p
                        key={`${item?._id}-${i}`}
                        className="text-sm font-medium leading-none capitalize"
                      >
                        {item?.displayName +
                          (participantIds.length === i + 1 ? "" : ",")}
                      </p>
                    ))}
                  </div>
                </div>
                {item?.count ? (
                  <Badge
                    className="-top-2 text-xs font-medium absolute"
                    variant="destructive"
                  >
                    {item?.count}
                  </Badge>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  ) : (
    <></>
  );
};

export default Rooms;
