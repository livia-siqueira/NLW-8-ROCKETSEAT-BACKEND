export interface FeedBackData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedBackRepository {
  create: (data: FeedBackData) => Promise<void>;
}
