import { prisma } from "../prisma";
import { FeedBackData, FeedBackRepository } from "./feedbacks-repository";

export class PrismaFeedBacksRepository implements FeedBackRepository {
  async create(data: FeedBackData) {
    await prisma.feedBack.create({
      data: {
        type: data.type,
        comment: data.comment,
        Screenshot: data.screenshot,
      },
    });
  }
}
