import { Dispatch, SetStateAction, useEffect } from "react";
import { JSONOptionsDataType, OptionsDataType } from "../../../types";
import { socket } from "@/lib/socket";
import { addOptionLabel } from "../../../consts";
import { OptionsData } from "@/models/OptionsData"; // Assuming Data class is in models/Data.ts

export function useAddOption(
  setData: Dispatch<SetStateAction<OptionsDataType[]>>
) {
  useEffect(() => {
    function onAddOption(e: JSONOptionsDataType) {
      setData((prev) => [
        ...prev,
        new OptionsData(e.id, e.name, e.authorId, e.votes || []),
      ]);
    }

    socket.on(addOptionLabel, onAddOption);

    return () => {
      socket.off(addOptionLabel, onAddOption);
    };
  }, []);
}
