import express from 'express';
import cors from 'cors';
const router = express.Router();
import { getPets } from '../controllers/petsController.js';
import {
  getAppointment,
  setAppointment,
  getAppointments,
} from '../controllers/appointmentController.js';

// root level route, this one is optional
router.get('/', cors(), (req, res, next) => {
  res.json('Welcome to your local veterinarian 🐶');
});

//these routes are not that logical, and are here for testing supabase and google sheets api
router.get('/pets', cors(), getPets);

/**
 * all appointments routes
 */
router.options('/appointments', (req, res, next) => {
  //set header before response
  res.header({
    allow: 'GET, POST, OPTIONS',
    'Content-type': 'application/json',
    Data: Date.now(),
    'Content-length': 0,
  });
  //response
  res.sendStatus(200);
});

// get a collection of all the appointments and ou can use a query
router.get('/appointments', cors(), getAppointments);

// get an individual appointment
router.get('/appointments/:id', cors(), getAppointment);

// post a route using the middleware for reading the body
router.post('/appointments', cors(), setAppointment);

// delete an individual appointment
// TODO: not implemented yet
router.delete('/appointments/:id', cors(), (req, res, next) => {
  const appointment = req.params.appointment;
  res.json({
    title: 'deleted',
    message: `oops ${appointment} was deleted accidentally 🥺`,
  });
});

export default router;
