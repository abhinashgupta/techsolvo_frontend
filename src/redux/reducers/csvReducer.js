const initialState = {
  data: [],
};

const csvReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PARSE_CSV_SUCCESS":
      return {
        ...state,
        data: action.payload,
      };
    case "UPDATE_ROW":
      const updatedData = [...state.data];
      updatedData[action.payload.rowIndex] = action.payload.updatedRow;
      return {
        ...state,
        data: updatedData,
      };
    case "ADD_ROW":
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
};

export default csvReducer;
