import { FETCH_USER } from "./types";
import axios from "axios";

// ** Original function **
// ======================
// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get("/api/current_user")
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };
//

// *** Refactor One ***
// // ======================
// export const fetchUser = () => async dispatch => {
//   // making the request. asigning the result (res) of the get request to ta const
//   const res = await axios.get("/api/current_user");
//
//   // dispatching the action after the function is called
//   dispatch({ type: FETCH_USER, payload: res });
// };

// **** Refactor Two ****
// ======================
export const fetchUser = () => async dispatch =>
  dispatch({ type: FETCH_USER, payload: await axios.get("/api/current_user") });
