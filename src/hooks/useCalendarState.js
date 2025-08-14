// Hook del reducer para el manejo del estado del calendario
export const useCalendarState = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_VIEW':
      return {
        ...state,
        calendar: {
          ...state.calendar,
          activeView: action.payload,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: action.payload,
        },
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          errors: [],
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.payload,
        },
      };
    default:
      return state;
  }
};
