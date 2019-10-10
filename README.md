> Rethinking how you share your work with others

## 🎒 Specifications

- Typescript enviornment
- Express(RESTful) server
- Postgres Database
- Mocha & Chai test

## 🚀 Getting started

- Clone, install deps `yarn`
- Create `.env` & set based on `.env.example`
- run `yarn dev`

## 📝 Logging

Winston & Morgan are used to log throughout the api. Morgan used for HTTP request logs, Winston for api logs.

- **Levels**: info | debug | error

```typescript
import { logger as winston } from '@config/winston';

winston.info('Your message here');
```

## 📨 Mailing

The idea is to have a mailing service which is agnostic of any driver we desire to use which can change per enviornment. Ideally, production emails should be sent throught AWS SES & development/test environments should use Mailgun or Nodemailer. The following drivers are put in place.

- **Production** AWS SES
- **Development/Test** Mailgun

```Typescript
// Create the request
const mailingList: Array<MailMessage> = [{
                to: "email@docku.com",
                template: 'welcome.html',
                subject: 'Welcome to Docku',
                context: {}
              }]

const response: Promise<Array<MailMessage | MessageId>> = await mailer.send(mailingList);
```

Mailing templates are created using **mjml** which is a library to create responsive emails. MJML compiles mjml templates into response html code which makes it much easier to create consistent email templates without the need for tables, mailchimp compiler or any html non-sense. MJML also injects data into the email body.

#### TODO

- Travis badge
- Typedoc badge?
- Repo size badge
- Licence badge (MIT)
