import { Currency } from '@shared/enums';

export function toCurrency(str: string | null) {
  const curr = Object.values(Currency).find((curr) => curr === str);

  return curr ? curr : Currency.BGN;
}
