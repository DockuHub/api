# api

## Logging

Winston & Morgan are used to log throughout the api. Morgan used for HTTP request logs, Winston for api logs.

- Levels: info | debug | error

```typescript
import { logger as winston } from '@config/winston';

winston.info('Your message here');
```
