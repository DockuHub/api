import AWS, { SES } from 'aws-sdk';
import { Mail } from '@managers/mail/types';

/**
 *
 * ENV variables
 *
 */
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  DOCKU_EMAIL_DOMAIN,
  DOCKU_NO_REPLY_EMAIL_DOMAIN,
} = process.env;

/**
 *
 * Set AWS Credentials
 *
 */
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

/**
 * Create single SES Instances
 */
const ses = new SES();

export class MailManager {
  /**
   *
   * Send Email via AWS SimpleEmailService(SES)
   *
   */
  public static async send(mailingList: Array<Mail>): Promise<Array<any>> {
    return Promise.all(
      mailingList.map(async (mail: Mail) => {
        // TODO Create HTML template and inject
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

        ses.sendEmail(
          payload,
          (err: AWS.AWSError, data: SES.SendEmailResponse) => {
            if (err) {
              console.log({ err });
              return;
            }
            console.log({ data });
            return data;
          },
        );
      }),
    );
  }
}
