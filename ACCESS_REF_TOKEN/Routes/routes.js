
import express from 'express';

import Registration from '../DataBase/registration.js';

import Login from '../DataBase/login.js';

import ifLoggedGiveAccess from '../MiddleWare/ifLoggedGiveAccess.js';


const router=express.Router();




router.get('/protected',ifLoggedGiveAccess,Login.protectedRoute)

router.post('/register',Registration.postRgister);

router.post('/login',Login.postLogin)


export default router;