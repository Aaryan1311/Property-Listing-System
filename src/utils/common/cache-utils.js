const { RedisConfig: redis } = require('../../config');

const getCache = async (key) => {
  const cached = await redis.get(key);
  return cached ? JSON.parse(cached) : null;
};

const setCache = async (key, data, ttl = 60) => {
  await redis.set(key, JSON.stringify(data), 'EX', ttl);
};

const invalidatePropertyCache = async (id) => {
  await redis.del('properties:all');
  const keys = await redis.keys('properties:filters:*');
  if (keys.length > 0) await redis.del(...keys);
  if (id) await redis.del(`property:${id}`);
};

module.exports = {
  getCache,
  setCache,
  invalidatePropertyCache,
};
