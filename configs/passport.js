import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { jwtSecretKey } from './auth';

const jwtOptions = {
  secretOrKey: jwtSecretKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify = (payload, done) => {
  try {
    done(null, payload);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);