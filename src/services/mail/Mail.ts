import { MailDriver, MailMessage } from '@services/mail/types';
import { Mailgun, AWSSimpleEmailService } from '@services/mail/drivers';

const { NODE_ENV } = process.env;

export class Mail implements MailDriver {
  public mailer: MailDriver;

  constructor() {
    /**
     * Initialize instance of mailer based on enviornment
     */
    this.mailer =
      NODE_ENV === 'production' ? new AWSSimpleEmailService() : new Mailgun();
  }

  public async send(
    mailingList: Array<MailMessage>,
  ): Promise<Array<MailMessage | string>> {
    return this.mailer.send(mailingList);
  }
}
