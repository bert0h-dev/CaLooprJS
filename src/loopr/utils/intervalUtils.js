import { unifyInterval } from '@loopr/helpers/dateBuilder.js';
import { convertToDate } from '@loopr/utils/dateUtils.js';

/**
 * Obtiene un array de dias a travez de un intervalo
 * @param {Object} interval - El intervalo de fechas
 * @param {number} [direction=1] - La dirección del intervalo (1 para adelante, -1 para atras)
 * @returns {Array<Date>} - Un array de fechas
 */
export const getIntervalDays = (interval, direction = 1) => {
  const { start, end } = unifyInterval(interval);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);

  let stepDirection = direction ?? 1;
  if (stepDirection < 0) {
    reversed = !reversed;
    stepDirection = -stepDirection;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push(convertToDate(date));
    date.setDate(date.getDate() + stepDirection);
    date.setHours(0, 0, 0, 0);
  }

  return reversed ? dates.reverse() : dates;
};
