import { CREATE_USER } from "../constants";

export const createUser = (username) => ({ type: CREATE_USER, payload: username });