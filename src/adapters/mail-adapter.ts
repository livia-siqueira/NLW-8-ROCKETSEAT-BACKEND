export interface MailAdapterData {
  body: string;
  subject: string;
}

export interface MailAdapter {
  sendMail: (data: MailAdapterData) => Promise<void>;
}
