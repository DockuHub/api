import { AWSSimpleEmailService as SES } from '@services/aws/ses';
import { MailDriver, MailMessage } from '@services/mail/types';
import { Mailgun } from '@services/mailgun/mailgun';

const { NODE_ENV } = process.env;

export class Mail implements MailDriver {
  public mailer: MailDriver;

  constructor() {
    /**
     * Initialize instance of mailer based on enviornment
     */
    this.mailer = NODE_ENV === 'production' ? new SES() : new Mailgun();
  }

  public async send(
    mailingList: Array<MailMessage>,
  ): Promise<Array<MailMessage | string>> {
    return this.mailer.send(mailingList);
  }
}
