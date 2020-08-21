import jwt from "jwt-decode";
import axios from "axios";

const ENDPOINT = "http://localhost:3000";

//FUNCION PARA GUARDAR EN EL LOCALSTORAGE EL JSONWEBTOKEN
export function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = ` ${token} `;
  localStorage.setItem("AUTH_TOKEN_KEY", token);
}

//FUNCION PARA RECUPERAR EL TOKEN DESDE EL LOCALSTORAGE
export function getAuthToken() {
  return localStorage.getItem("AUTH_TOKEN_KEY");
}

//FUNCION PARA CONSEWGUIR LA FECHA DE CADUCIDAD DEL TOKEN
export function tokenExpiration(encodedToken) {
  let token = jwt(encodedToken);
  if (!token.exp) {
    return null;
  }
  let date = new Date(0);
  date.setUTCSeconds(token.exp);
  return date;
}

//FUNCION QUE COMPRUEBA SI EL TOKEN ESTA POCHO O NO

export function isExpired(token) {
  let expirationDate = tokenExpiration(token);
  return expirationDate < new Date();
}

//FUNCION QUE COMPRUEBA SI LA PERSONA ESTA LOGUEADA Y SU TOKEN ES VALIDO
export function isLoggedIn() {
  let authToken = getAuthToken();
  console.log(!!authToken, !isExpired(authToken));
  return !!authToken && !isExpired(authToken);
}

//FUNCION GUARDAR ADMN EN LOCALSTORAGE
export function setIsAdmin(admin) {
  localStorage.setItem("ROLE", admin);
}

//FUNCION PARA RECUPERAR EL ADMIN DE LOCALSTORAGE
export function getIsAdmin() {
  return localStorage.getItem("ROLE");
}

//FUNCION PARA SABER SI ES ADMIN O NO
export function checkIsAdmin() {
  let role = null;
  let admin = getIsAdmin();

  if (admin === "true") {
    role = true;
  } else {
    role = false;
  }
  return role;
}

//FUNCION DE GUARDAR EL USER EN LOCALSTORAGE

export function setName(user) {
  localStorage.setItem("NAME", user);
}

//FUNCION RECUPERAR EL NOMBRE DE USER EL LOCALSTORAGE

export function getName() {
  return localStorage.getItem("NAME");
}

//FUNCION PARA SACAR ELL ID TOKEN

export function getIdToken(encodedToken) {
  let token = jwt(encodedToken);
  if (token.id) {
    return token.id;
  } else {
    return null;
  }
}

//FUNCION DE LOGOUT

export function logout() {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("AUTH_TOKEN_KEY");
  localStorage.removeItem("ROLE");
  localStorage.removeItem("NAME");
}
