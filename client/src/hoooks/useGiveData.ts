import { Dispatch, SetStateAction, useEffect } from "react";
import { socket } from "@/lib/socket";
import { JSONOptionsDataType, OptionsDataType } from "../../../types";
import { giveDataLabel } from "@/../../../consts";
import { OptionsData } from "@/models/OptionsData"; // Assuming Data class is in models/Data.ts

export function useGiveData(
  setData: Dispatch<SetStateAction<OptionsDataType[]>>
) {
  useEffect(() => {
    function onGiveData(data: JSONOptionsDataType[]) {
      setData(() =>
        data.map(
          (el) => new OptionsData(el.id, el.name, el.authorId, el.votes || [])
        )
      );
    }

    socket.on(giveDataLabel, onGiveData);

    return () => {
      socket.off(giveDataLabel, onGiveData);
    };
  }, []);
}
