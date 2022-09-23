import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: 'variables.env' });

//TODO: to improve this code, you might consider working with models as well. A model is then a representation of a resource.
//TODO: write some generic select, update, delete code to improve the code. However, do not write your own framework ☺️

console.log('url', process.env.SUPABASE_URL);

// my supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
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

/**
 * function to read all the appointments
 * @returns an array of appointments
 */
export async function getAppointmentsData() {
  const { data, error } = await supabase.from('appointments').select('*');
  if (error) console.log('query error', error);
  else return data;
}

/**
 * Function to get the timeslot number
 * 
 * @param {*} timeSlotNumber the id of a timeSlot
 * @returns an specific timeslot
 */
async function getTimeslot(timeSlotNumber){
  console.log('👀 for id:', timeSlotNumber);
  const { data, error } = await supabase.from('timeslot').select('id').eq('nr', timeSlotNumber);
  if (error) console.log('query error', error);
  else return data;
}

/**
 * Function to write a specific appointment
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
