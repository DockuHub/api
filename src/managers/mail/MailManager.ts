import AWS, { SES } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

import { Mail } from '@managers/mail/types';

/**
 * ENV variables
 */
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  DOCKU_EMAIL_DOMAIN,
  DOCKU_NO_REPLY_EMAIL_DOMAIN,
} = process.env;

/**
 * Set AWS Credentials
 */
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

/**
 * Create single SES Instance
 */
const ses = new SES();

export class MailManager {
  /**
   * Send Email via AWS SimpleEmailService(SES)
   */
  public static async send(mailingList: Array<Mail>) {
    const response: Promise<Array<Mail | SES.MessageId>> = Promise.all(
      mailingList.map(async (mail: Mail) => {
        // TODO Create HTML template and inject

        /**
         * Configure data
         */
        const payload: SES.SendEmailRequest = {
          Source: DOCKU_EMAIL_DOMAIN || 'no-reply@docku.com',
          ReplyToAddresses: [
            DOCKU_NO_REPLY_EMAIL_DOMAIN || 'no-reply@docku.com',
          ],
          Destination: { ToAddresses: [mail.to] },
          Message: {
            Subject: { Data: mail.subject, Charset: 'UTF-8' },
            Body: { Html: { Data: 'Test', Charset: 'UTF-8' } },
          },
          ConfigurationSetName: 'ConfigSet',
        };

        /**
         * Send email and promisify the request
         */
        const response: Promise<
          PromiseResult<SES.SendEmailResponse, AWS.AWSError>
        > = ses.sendEmail(payload).promise();

        /**
         * Return either the confirmation id or the recepient whomst
         * was unable to receive the email for logging and/or retries.
         */
        // TODO Implement retry feature
        // Maybe simple counter with a set of users who have issues receiving the email and then retry until counter is over?
        return response
          .then((data: SES.SendEmailResponse): SES.MessageId => data.MessageId)
          .catch((err: AWS.AWSError): Mail => mail);
      }),
    );

    return response;
  }
}
