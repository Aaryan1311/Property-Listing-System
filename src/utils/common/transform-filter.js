function transformFilters(filters) {
  const operatorsMap = ['lte', 'gte', 'lt', 'gt', 'ne', 'in', 'nin', 'eq'];

  const result = {};

  for (const key in filters) {
    if (typeof filters[key] === 'object' && filters[key] !== null) {
      const subFilter = {};
      for (const op in filters[key]) {
        if (operatorsMap.includes(op)) {
          const mongoOp = `$${op}`;
          const value = isNaN(filters[key][op])
            ? filters[key][op]
            : Number(filters[key][op]);

          subFilter[mongoOp] = value;
        }
      }
      result[key] = subFilter;
    } else {
      result[key] = filters[key];
    }
  }

  return result;
}

module.exports = transformFilters