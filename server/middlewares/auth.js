import passport from 'passport';

export default function (options) {
  return (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, jwtPayload) => {
      const { user } = jwtPayload;
      if (!user) {
        return next(new Error('ERR-0401'));
      }

      req.user = user;
      next();
    })(req, res);
  };
}
