import mg from 'mailgun-js';

import { MailDriver, MailMessage } from '@services/mail/types';

/**
 * ENV variables
 */
const {
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  DOCKU_NO_REPLY_EMAIL_DOMAIN,
} = process.env;

/**
 * Create single Mailgun instance
 */
const gun: mg.Mailgun = new mg({
  apiKey: MAILGUN_API_KEY!,
  domain: MAILGUN_DOMAIN!,
});

export class Mailgun implements MailDriver {
  public async send(mail: MailMessage): Promise<string | Error> {
    // If no html template, return
    // TODO Check if this if is fine here
    if (!mail.html) {
      const error: string = `AWS SES Error - Could not send email to ${mail.to} - No HTML template found`;
      throw new Error(error);
    }

    /**
     * Configure data
     */
    const payload: mg.messages.SendData = {
      from: `Docku <${DOCKU_NO_REPLY_EMAIL_DOMAIN}>`,
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
    };

    /**
     * Send email
     */
    const response: Promise<mg.messages.SendResponse> = gun
      .messages()
      .send(payload);

    /**
     * Return either the confirmation id or the recepient whomst
     * was unable to receive the email for logging and/or retries.
     */
    return response
      .then((data: mg.messages.SendResponse) => data.id)
      .catch((err: mg.Error) => {
        const error: string = `Mailgun Error - Could not send email to ${mail.to} - ${err.message}`;
        throw new Error(error);
      });
  }
}
