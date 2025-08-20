import { convertToDate } from '@loopr/utils/dateUtils.js';
import { unifyDates } from '@loopr/helpers/dateBuilder.js';

/**
 * Obtiene el primer día del mes de una fecha dada.
 * @param {Date} date - La fecha de la que se desea obtener el primer día del mes.
 * @returns {Date} - Un objeto Date representando el primer día del mes de la fecha dada.
 */
export const startMonth = date => {
  const currentDate = convertToDate(date);
  currentDate.setDate(1);
  currentDate.setHours(0, 0, 0, 0);
  return currentDate;
};

/**
 * Obtiene el último día del mes de una fecha dada.
 * @param {Date} date - La fecha de la que se desea obtener el último día del mes.
 * @returns {Date} - Un objeto Date representando el último día del mes de la fecha dada.
 */
export const endMonth = date => {
  const currentDate = convertToDate(date);
  const month = currentDate.getMonth();
  currentDate.setFullYear(currentDate.getFullYear(), month + 1, 0);
  currentDate.setHours(23, 59, 59, 999);
  return currentDate;
};

/**
 * Verifica si dos fechas corresponden al mismo mes.
 * @param {Date} laterDate - La fecha más reciente.
 * @param {Date} earlierDate - La fecha más antigua.
 * @returns {boolean} - Verdadero si ambas fechas son del mismo mes, falso en caso contrario.
 */
export const isCurrentMonth = (laterDate, earlierDate) => {
  const [newDateLeft, newDateRight] = unifyDates(laterDate, earlierDate);
  return (
    newDateLeft.getMonth() === newDateRight.getMonth() &&
    newDateLeft.getFullYear() === newDateRight.getFullYear()
  );
};
