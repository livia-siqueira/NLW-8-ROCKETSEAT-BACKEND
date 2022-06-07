import { MailAdapter } from "../adapters/mail-adapter";
import { FeedBackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedBackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedUseCase {
  constructor(
    private feedbacksRepository: FeedBackRepository,
    private mailAdapter: MailAdapter
  ) {
    this.feedbacksRepository = feedbacksRepository;
  }
  async execute(req: SubmitFeedBackUseCaseRequest) {
    const { type, comment, screenshot } = req;

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot");
    }

    if (!type || !comment) {
      throw new Error("Required field");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "New Feed Back",
      body: [
        `<div styles="font-family: sans-serif; font-size: 16px color: #111">`,
        `<p>Type feedback: ${type}</p>`,
        `<p>Comment: ${comment}</p>`,
        screenshot ? `<img src=${screenshot} />` : ``,
        `</div>`,
      ].join("\n"),
    });
  }
}
