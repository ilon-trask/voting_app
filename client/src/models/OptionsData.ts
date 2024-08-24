import { OptionsDataType, VoteType } from "../../../types";

export class OptionsData implements OptionsDataType {
  id: string;
  name: string;
  authorId: string;
  votes: VoteType[];

  constructor(id: string, name: string, authorId: string, votes: VoteType[]) {
    this.id = id;
    this.name = name;
    this.authorId = authorId;
    this.votes = votes;
  }

  count() {
    return this.votes.length;
  }
}
