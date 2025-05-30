function transformFilters(filters) {
  const operatorsMap = ['lte', 'gte', 'lt', 'gt', 'ne', 'eq', 'in', 'nin', 'all'];
  const result = {};

  for (const key in filters) {
    const value = filters[key];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const subFilter = {};

      for (const op in value) {
        if (operatorsMap.includes(op)) {
          const mongoOp = `$${op}`;
          let opValue = value[op];

          if (['in', 'nin', 'all'].includes(op)) {
            opValue = typeof opValue === 'string' ? opValue.split(',') : opValue;
          }

          if (!Array.isArray(opValue) && !isNaN(opValue)) {
            opValue = Number(opValue);
          }

          subFilter[mongoOp] = opValue;
        }
      }

      result[key] = subFilter;
    } else {
      result[key] = isNaN(value) ? value : Number(value);
    }
  }

  return result;
}

module.exports = transformFilters;
