export type VoteType = { id: string; userId: string };

export type OptionsDataType = {
  id: string;
  name: string;
  authorId: string;
  votes: VoteType[];
  count(): number;
};

export type JSONOptionsDataType = Omit<OptionsDataType, "count" | "votes"> & {
  votes?: VoteType[] | undefined;
};

export type SendVoteType = {
  id: string;
  voteId: string;
  userId: string;
};

export type SendCreateRoom = {
  roomId: string;
  authorId: string;
};
