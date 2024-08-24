// "use client";

import { io } from "socket.io-client";
import { ENV } from "./env";

export const socket = io(ENV.NEXT_PUBLIC_SERVER_URL);
