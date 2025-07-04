export type VoteStatistics = {
  data: {
    candidate: string;
    votes: number;
    percentage: number;
  }[];
  totalVotes: number;
};
