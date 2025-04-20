import { Hono } from "hono";
import { SignInUser } from "controller/auth/signin";
import { LoginUser } from "controller/auth/login";
import { DeleteUser } from "controller/auth/delete";

export const Auth = new Hono();

Auth.post('/signup', SignInUser);
Auth.post('/login', LoginUser);
Auth.post('/delete', DeleteUser);


