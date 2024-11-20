import { config } from '../config';

export const jwtConstants = {
  secret: config.get('authentication.secret'),
};
