export const LoginStart = (userCredentials) => {
    return {
      type: "LOGIN_START",
    };
  };
  
  export const LoginSuccessfull = (data) => {
    return {
      type: "LOGIN_SUCCESS",
      payload: data,
    };
  };
  
  export const LoginFailure = () => {
    return {
      type: "LOGIN_FAILURE",
    };
  };
  
  export const LogOut = () => {
    return {
      type: "LOGOUT",
    };
  };
  
  export const UpdateStart = (userCredentials) => {
    return {
      type: "LOGIN_START",
    };
  };
  
  export const UpdateSuccessfull = (data) => {
    return {
      type: "LOGIN_SUCCESS",
      payload: data,
    };
  };
  
  export const UpdateFailure = () => {
    return {
      type: "LOGIN_FAILURE",
    };
  };