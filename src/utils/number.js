import find from 'lodash/find';

export function decimalize(number, digit) {
  const _digit = digit || 2;

  if (number === '' || number === null) {
    return '';
  }

  const parsed = Number(number);

  if (isNaN(parsed)) {
    return '';
  }

  return parsed.toFixed(_digit).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

export function currency(number, digit) {
  return `¥ ${decimalize(number, digit)}`;
}

export function currencyUnit(number, digit) {
  if (number === '' || number === null) return '';
  const parsed = Number(number);
  if (isNaN(parsed)) return '';
  const _digit = digit || 2;

  const mapping = [
    { num: 1e8, unit: '亿' },
    { num: 1e4, unit: '万' },
  ];

  const mapped = find(mapping, item => parsed >= item.num);

  if (mapped) {
    return `¥ ${(parsed / mapped.num).toFixed(_digit)}${mapped.unit}`;
  }

  return `¥ ${parsed.toFixed(_digit)}`;
}