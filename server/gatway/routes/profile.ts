import { Hono } from "hono";
import { GetProfile } from "controller/profile/getProfile";
import { SetProfile } from "controller/profile/setProfile";
import { UpdateProfile } from "controller/profile/updateProfile";

export const Profile = new Hono();

Profile.post('/set', SetProfile);
Profile.patch('/update', UpdateProfile);
Profile.get('/get', GetProfile);


