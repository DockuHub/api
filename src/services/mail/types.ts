export interface MailDriver {
  send(mailingList: MailMessage): Promise<string | Error>;
}

export type MailMessage = {
  to: string;
  subject: string;
  context: object;
  template: string;
  html?: string;
};
