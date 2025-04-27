import { Hono } from "hono";
import { getProfile } from "controller/profile/getProfile";
import { setProfile } from "controller/profile/setProfile";
import { patchProfile } from "controller/profile/patchProfile";

export const Profile = new Hono();

Profile.post('/set', setProfile);
Profile.patch('/patch', patchProfile);
Profile.get('/get', getProfile);


