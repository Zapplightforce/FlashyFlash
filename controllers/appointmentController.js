import {
  getAppointmentData,
  setAppointmentData,
  getAppointmentsData,
} from '../adapters/supabaseAdapter.js';

export async function getAppointment(req, res) {
  const rows = await getAppointmentData(req.params.id);
  res.json(rows);
}

export async function getAppointments(req, res) {
  const appointments = [];
  const rows = await getAppointmentsData();
  if (rows.length > 0) {
    rows.map((appointment) => {
      appointments.push({
        url_to_self: req.originalUrl,
        date: appointment.date,
        state: appointment.state,
        timeslot: appointment.timeslot,
      });
    });
    res.json(appointments);
  } else {
    res.status(500);
    res.json({
      title: 'no appointments found',
      message: `🥴 We did something wrong`,
    });
  }
}

export async function setAppointment(req, res) {
  const appointment = {};
  if (req.body.pet && req.body.timeslot && req.body.date) {
    appointment.pet = req.body.pet;
    appointment.date = req.body.date;
    appointment.timeslot = req.body.timeslot;
    const rows = await setAppointmentData(appointment);
    if (rows.length >= 0) {
      res.json({
        title: 'appointment added',
        message: `📅 Appointment for ${appointment.pet} is made on ${appointment.date} at ${appointment.timeslot}`,
      });
    } else {
      res.status(422);
      res.json({
        title: 'cannot add appointment',
        message: `Unknown causes`,
      });
    }
  } else {
    res.status(422);
    res.json({
      title: 'cannot add appointment',
      message: `You need to set client, date and time`,
    });
  }
}
