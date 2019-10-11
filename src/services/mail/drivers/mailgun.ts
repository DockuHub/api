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
  public async send(
    mailingList: Array<MailMessage>,
  ): Promise<Array<MailMessage | string>> {
    const response: Promise<Array<MailMessage | string>> = Promise.all(
      mailingList.map((mail: MailMessage) => {
        /**
         * Configure data
         */
        const payload: mg.messages.SendData = {
          from: `Docku <${DOCKU_NO_REPLY_EMAIL_DOMAIN}>`,
          to: mail.to,
          subject: mail.subject,
          html: '<b>Test yuh</b>',
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
          .catch((err: mg.Error) => mail);
      }),
    );

    return response;
  }
}
