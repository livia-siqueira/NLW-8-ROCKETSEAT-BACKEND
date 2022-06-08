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

    const bodyEmail = [
      `<div style="font-family: sans-serif; font-size: 20px; background-color: #F5F6F6; border-radius: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center">`,
      `<header style="margin-top: 40px;border-radius: 20px; background-color:#d3d3d3; ">`,
      `<span style="color: #FF0000; padding: 20px">FeedBacks NLW - 8</span>`,
      `</header>`,
      `<p style="margin-top: 20px">Type feedback: ${type}</p>`,
      screenshot && `<p style=" margin-top: 20px">Image:</p>`,
      screenshot &&
        `<img src="${screenshot}" style="width: 180px; height: 180px"/>`,
      `<p>Comment: ${comment}</p>`,
      `</div>`,
    ];

    await this.mailAdapter.sendMail({
      subject: "New Feed Back",
      body: bodyEmail.join("\n"),
    });
  }
}
