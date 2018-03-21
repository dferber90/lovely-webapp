const { getUserId } = require('../utils');

function feed(parent, args, context, info) {
  const { filter, first, skip } = args; // destructure input arguments
  const where = filter
    ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
    : {};

  return context.db.query.links({ first, skip, where }, info);
}

function me(parent, args, context, info) {
  try {
    const userId = getUserId(context);
    return context.db.query.user({ where: { id: userId } }, info);
  } catch (error) {
    return null;
  }
}

module.exports = {
  feed,
  me,
};
