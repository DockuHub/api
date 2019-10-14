import { MailDriver, MailMessage } from '@services/mail/types';
import { Mailgun, AWSSimpleEmailService } from '@services/mail/drivers';

import mjml from 'mjml';
import { inject_template } from '@services/mail/utils/inject';

const { NODE_ENV } = process.env;

export class Mail {
  public mailer: MailDriver;

  constructor() {
    // Initialize instance of mailer based on enviornment
    this.mailer = NODE_ENV === 'production' ? new Mailgun() : new Mailgun();
  }

  public async send(
    mailingList: Array<MailMessage>,
  ): Promise<Array<string | Error>> {
    return Promise.all(
      mailingList.map(async (mail: MailMessage) => {
        try {
          // If context contains any keys
          // Inject them into the template
          const context_keys: Array<string> = Object.keys(mail.context);
          if (context_keys.length > 0) {
            await this.inject(mail);
          }

          return this.mailer.send(mail);
        } catch (e) {
          throw e;
        }
      }),
    );
  }

  private async inject(mail: MailMessage): Promise<MailMessage | Error> {
    try {
      // Inject the template with the required context variables
      const injected_template: string = await inject_template(
        mail.template,
        mail.context,
      );

      // Compile MJML into HTML
      const compiled_template = mjml(injected_template, {
        minify: true,
        beautify: true,
      });

      if (compiled_template.errors.length > 0) {
        const error: string = `Email Inject Error - Could not build email template for ${mail.to}`;
        throw new Error(error);
      }

      mail.html = compiled_template.html;
      return mail;
    } catch (e) {
      throw e;
    }
  }
}
