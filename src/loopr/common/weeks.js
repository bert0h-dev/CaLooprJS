import { convertToDate } from '@loopr/utils/dateUtils.js';
import { unifyDates } from '@loopr/helpers/dateBuilder.js';

/**
 * Obtiene el primer día de la semana de una fecha dada.
 * @param {Date} date - La fecha de la que se desea obtener el primer día de la semana.
 * @param {Object} [options] - Opciones para la obtención del primer día de la semana.
 * @param {number} [options.firstDayOfWeek=0] - El primer día de la semana (0 para domingo, 1 para lunes, etc.).
 * @returns {Date} - Un objeto Date representando el primer día de la semana de la fecha dada.
 */
export const startWeek = (date, options) => {
  const weekStart = options?.firstDayOfWeek || 0;

  const currentDate = convertToDate(date);
  const day = currentDate.getDay();
  const diff = (day < weekStart ? -7 : 0) + day - weekStart;

  currentDate.setDate(currentDate.getDate() - diff);
  currentDate.setHours(0, 0, 0, 0);
  return currentDate;
};

/**
 * Obtiene el último día de la semana de una fecha dada.
 * @param {Date} date - La fecha de la que se desea obtener el último día de la semana.
 * @param {Object} [options] - Opciones para la obtención del último día de la semana.
 * @param {number} [options.firstDayOfWeek=0] - El primer día de la semana (0 para domingo, 1 para lunes, etc.).
 * @returns {Date} - Un objeto Date representando el último día de la semana de la fecha dada.
 */
export const endWeek = (date, options) => {
  const weekStart = options?.firstDayOfWeek || 0;

  const currentDate = convertToDate(date);
  const day = currentDate.getDay();
  const diff = (day < weekStart ? -7 : 0) + 6 - (day - weekStart);

  currentDate.setDate(currentDate.getDate() + diff);
  currentDate.setHours(23, 59, 59, 999);
  return currentDate;
};

/**
 * Verifica si dos fechas corresponden a la misma semana.
 * @param {Date} laterDate - La fecha más reciente.
 * @param {Date} earlierDate - La fecha más antigua.
 * @param {Object} [options] - Opciones para la obtención del primer día de la semana.
 * @returns {boolean} - Verdadero si ambas fechas son de la misma semana, falso en caso contrario.
 */
export const isCurrentWeek = (laterDate, earlierDate, options) => {
  const [newDateLeft, newDateRight] = unifyDates(laterDate, earlierDate);
  return +startWeek(newDateLeft, options) === +startWeek(newDateRight, options);
};
