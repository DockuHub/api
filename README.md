# Docku core

> Rethinking how you share your work with others

## Specifications

- Typescript enviornment
- Express(RESTful) server
- Postgres Database
- Mocha & Chai test

## Getting started

- Clone, install deps `yarn`
- Create `.env` & set based on `.env.example`
- run `yarn dev`

## Logging

Winston & Morgan are used to log throughout the api. Morgan used for HTTP request logs, Winston for api logs.

- **Levels**: info | debug | error

```typescript
import { logger as winston } from '@config/winston';

winston.info('Your message here');
```
