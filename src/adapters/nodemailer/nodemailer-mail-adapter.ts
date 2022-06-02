import { MailAdapter, MailAdapterData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f7ef9f6f286587",
    pass: "3d7f6456700e2e",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: MailAdapterData) {
    await transport.sendMail({
      from: "Equipe FeedGet <feed@feedget.com>",
      to: "Lívia Siqueira <main.liviasiqueira@gmail.com>",
      subject: data.subject,
      html: data.body,
    });
  }
}
