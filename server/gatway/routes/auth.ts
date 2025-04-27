import { Hono } from "hono";
import { signInUser } from "controller/auth/signin";
import { loginUser } from "controller/auth/login";
import { deleteUser } from "controller/auth/delete";

export const Auth = new Hono();

Auth.post('/signup', signInUser);
Auth.post('/login', loginUser);
Auth.post('/delete', deleteUser);


