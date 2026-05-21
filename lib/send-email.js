// import dotenv from 'dotenv';
// dotenv.config();

// import { Resend } from "resend";

// console.log("KEY:", process.env.RESEND_API_KEY);

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "Website <website@resend.dev>",
//       to: [to],
//       subject,
//       html,
//     });
//     if (error) {
//       return console.error({ error });
//     } else {
//       console.log(data);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };


import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

// console.log("KEY:", apiKey);

const resend = apiKey ? new Resend(apiKey) : null;

export const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!resend) {
      console.warn("Resend API key missing");
      return;
    }

    const { data, error } = await resend.emails.send({
      from: "Website <website@resend.dev>",
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
};