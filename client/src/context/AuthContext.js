import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  // user: {
  //   _id: "652bc38a45cd3e54f440dba2",
  //   username: "hey",
  //   email: "hey@gmail.com",
  //   password: "$2b$10$yvX7xlRpMCIItBpRMISO1.IElWbY.wq83SDyNnZeqBoJqBnvMzXQS",
  //   profilePicture: "person/2.jpeg",
  //   coverPicture: "",
  //   followers: ["652bc3a245cd3e54f440dba4"],
  //   followings: ["652bc3a245cd3e54f440dba4"],
  //   isAdmin: false,
  //   createdAt: { $date: { $numberLong: "1697366922435" } },
  //   updatedAt: { $date: { $numberLong: "1697484142326" } },
  //   __v: { $numberInt: "0" },
  // },
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
