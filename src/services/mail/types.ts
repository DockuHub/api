export interface MailDriver {
  send(mailingList: Array<MailMessage>): Promise<Array<MailMessage | string>>;
}

export type MailMessage = {
  to: string;
  template: string;
  subject: string;
  context: Object;
};
