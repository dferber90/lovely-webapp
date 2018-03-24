const { Prisma } = require('prisma-binding');
const bodyParser = require('body-parser');
const { createToken, comparePasswords, prismaOptions } = require('../utils');

const login = [
  bodyParser.json(),
  async (req, res, next) => {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(401);
      res.json({ error: 'no-credentials' });
      return next();
    }

    const db = new Prisma(prismaOptions);
    const user = await db.query.user(
      { where: { email: req.body.email } },
      '{ id password }'
    );
    if (!user) {
      res.status(401);
      res.json({ error: 'no-such-user' });
      return next();
    }

    const valid = await comparePasswords(req.body.password, user.password);
    if (!valid) {
      res.status(401);
      res.json({ error: 'invalid-password' });
      return next();
    }

    const token = createToken(user.id, process.env.APP_SECRET);

    res.cookie('authToken', token, {
      maxAge: 1000 * 60 * 15, // expire after 15 minutes
      httpOnly: true,
      signed: false,
    });
    res.json({ user: { id: user.id } });

    return next();
  },
];

module.exports = { login };
