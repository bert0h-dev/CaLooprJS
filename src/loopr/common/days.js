import { convertToDate } from '@loopr/utils/dateUtils.js';
import {
  initFromDate,
  initFromNow,
  unifyDates,
} from '@loopr/helpers/dateBuilder.js';

/**
 * Obtiene el inicio del día para una fecha dada.
 * @param {Date} date - La fecha de la que se quiere obtener el inicio del día.
 * @returns {Date} - La fecha con la hora establecida en 00:00:00.000.
 */
export const startDay = date => {
  const currentDate = convertToDate(date);
  currentDate.setHours(0, 0, 0, 0);
  return currentDate;
};

/**
 * Obtiene el final del día para una fecha dada.
 * @param {Date} date - La fecha de la que se quiere obtener el final del día.
 * @returns {Date} - La fecha con la hora establecida en 23:59:59.999.
 */
export const endDay = date => {
  const currentDate = convertToDate(date);
  currentDate.setHours(23, 59, 59, 999);
  return currentDate;
};

/**
 * Verifica si dos fechas corresponden al mismo día.
 * @param {Date} laterDate - La fecha más reciente.
 * @param {Date} earlierDate - La fecha más antigua.
 * @returns {boolean} - Verdadero si ambas fechas son el mismo día, falso en caso contrario.
 */
export const isCurrentDay = (laterDate, earlierDate) => {
  const [newDateLeft, newDateRight] = unifyDates(laterDate, earlierDate);
  return +startDay(newDateLeft) === +startDay(newDateRight);
};

/**
 * Verifica si una fecha corresponde al día actual.
 * @param {Date} date - La fecha a verificar.
 * @returns {boolean} - Verdadero si la fecha es hoy, falso en caso contrario.
 */
export const isCurrentToday = date => {
  return isCurrentDay(initFromDate(date), initFromNow(date));
};

/**
 * Verifica si una fecha corresponde a un día de fin de semana.
 * @param {Date} date - La fecha a verificar.
 * @returns {boolean} - Verdadero si la fecha es un día de fin de semana, falso en caso contrario.
 */
export const isWeekendDay = date => {
  const currentDate = convertToDate(date);
  return currentDate.getDay() === 0 || currentDate.getDay() === 6;
};
