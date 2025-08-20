import { initFromDate } from '@loopr/helpers/dateBuilder.js';

// Utils relacionados con fechas

/**
 * Convierte un valor a una fecha.
 * @param {Date|string|number} date - Valor a convertir.
 * @returns {Date} - Fecha resultante de la conversión.
 */
export const convertToDate = date => {
  return initFromDate(date);
};

/**
 * Verifica si el valor proporcionado es una instancia de Date.
 * @param {*} value - El valor a verificar. Puede ser cualquier tipo, incluyendo nulo o indefinido.
 * @returns {boolean} Retorna true si el valor es una instancia de Date, false en caso contrario.
 */
export const isDateInstance = value => {
  return (
    value instanceof Date ||
    (typeof value === 'object' &&
      Object.prototype.toString.call(value) === '[object Date]')
  );
};

/**
 * Verifica si la fecha proporcionada es válida.
 * @param {*} date - Fecha a verificar. Puede ser una instancia de Date, una función que retorne una fecha, un string o un número (timestamp).
 * @returns {boolean} Retorna true si la fecha es válida, false en caso contrario.
 */
export const isDateValid = date => {
  if (
    !isDateInstance(date) &&
    typeof date !== 'number' &&
    typeof date !== 'string' &&
    typeof date !== 'function'
  ) {
    return false;
  }

  const parsedDate = convertToDate(date);
  return isDateInstance(parsedDate) && !isNaN(+parsedDate);
};

/**
 * Verifica si una fecha es anterior al momento actual.
 * @param {Date|string|number} date - Fecha a verificar.
 * @returns {boolean} Retorna true si la fecha es anterior al momento actual, false en caso contrario.
 */
export const isBeforeNow = date => {
  return convertToDate(date) < Date.now();
};

/**
 * Verifica si una fecha es posterior al momento actual.
 * @param {Date|string|number} date - Fecha a verificar.
 * @returns {boolean} Retorna true si la fecha es posterior al momento actual, false en caso contrario.
 */
export const isAfterNow = date => {
  return convertToDate(date) > Date.now();
};
