export const formatMoney = (val: string | number, decimalPlaces: number = 2, prefix: string = 'R$ '): string => {
  if (typeof val === 'number') {
    val = val.toFixed(decimalPlaces).replace('.', ',');
  }
  const numeric: number = parseInt(val.replace(/[^\d]/g, '') || '0');
  const valN: number = numeric / (1 * 10 ** decimalPlaces);
  val = valN.toFixed(decimalPlaces).replace('.', ',');
  const spl = val.split(',');
  const thousands = spl[0].split("").reverse().join("").match(/\d{1,3}/g)?.join('.').split("").reverse().join("");
  return `${prefix}${thousands},${spl[1]}`;
}

export const parseMoney = (val: string): number => {
  return parseFloat(val.replace(/[^\d,]/g, '').replace(/,/g, '.'));
}
