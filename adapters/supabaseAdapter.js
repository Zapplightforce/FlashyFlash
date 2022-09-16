import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: 'variables.env' });

console.log('url', process.env.SUPABASE_URL);

// credentiials in a
const supabase = createClient(
  'https://bswwausvcnqjvailohde.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzd3dhdXN2Y25xanZhaWxvaGRlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2Mjk4MTc0MiwiZXhwIjoxOTc4NTU3NzQyfQ.mxpfiS3t_-EaWKW1AQpJpJ_eRM4N7GHQyn6YeJ_9DMs'
);

/**
 * Function to get the data from one appointment
 * 
 * @param {*} id the id form a appointment
 * @returns appointment data
 */
export async function getAppointmentData(id) {
  console.log('👀 for id:', id);
  const { data, error } = await supabase.from('appointments').select('*').eq('id', id);
  if (error) console.log('query error', error);
  else return data;
}

export async function getAppointmentsData() {
  const { data, error } = await supabase.from('appointments').select('*');
  if (error) console.log('query error', error);
  else return data;
}

/**
 * Function to get the timeslot number
 * 
 * @param {*} timeSlotNumber the id of a timeSlot
 * @returns 
 */
async function getTimeslot(timeSlotNumber){
  console.log('👀 for id:', timeSlotNumber);
  const { data, error } = await supabase.from('timeslot').select('id').eq('nr', timeSlotNumber);
  if (error) console.log('query error', error);
  else return data;
}

/**
 * 
 * @param {*} appointment 
 * @returns 
 */
export async function setAppointmentData(appointment) {
  // find the id
  const timeSlotId = await getTimeslot(appointment.timeslot)
  console.log('timeSlotId', timeSlotId[0].id);
  const { data, error } = await supabase.from('appointments').insert([
    {
      date: appointment.date,
      timeslot: timeSlotId[0].id,
      state: 'unchecked',
      pet: appointment.pet,
    },
  ]);
  if (error) console.log('Error', error);
  else return data;
}
