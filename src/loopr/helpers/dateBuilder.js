// Helper para construir fechas.

/**
 * Inicializa una fecha a partir de un constructor, función o instancia de Date.
 * @param {Date} date - Constructor, función o instancia de referencia.
 * @param {Date} value - Valor a inicializar.
 * @returns {Date} - Date inicializado con el valor proporcionado.
 */
export const initFromDate = (date, value) => {
  if (typeof date === 'function') return date(value);

  if (date instanceof Date) {
    if (value === undefined) return new Date(date.getTime());

    return new Date(value);
  }
};

/**
 * Inicializa una fecha a partir de la fecha actual.
 * @param {Date} date - Constructor, función o instancia de referencia.
 * @returns {Date} - Date inicializado con la fecha actual.
 */
export const initFromNow = date => {
  if (date === undefined || date === null) {
    return initFromDate(Date, Date.now());
  }
  return initFromDate(date, Date.now());
};

/**
 * Unifica las fechas proporcionadas en un contexto dado.
 * @param  {...any} dates - Las fechas a unificar.
 * @returns {Array<Date>} - Un array de fechas unificadas.
 */
export const unifyDates = (...dates) => {
  const dateUnify = initFromDate.bind(
    null,
    dates.find(date => date instanceof Date)
  );

  return dates.map(dateUnify);
};

/**
 * Unifica un intervalo de fechas.
 * @param {*} interval - Intervalo a unificar
 * @returns {Object} - Objeto con las fechas de inicio y fin unificadas
 */
export const unifyInterval = interval => {
  const [start, end] = unifyDates(interval.start, interval.end);
  return { start, end };
};
