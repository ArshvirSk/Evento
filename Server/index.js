import express from "express";
import { ZodError } from "zod";

import sheets, { SHEET_ID, auth } from "./sheetClient.js";

const app = express();

// const contactFormSchema = z.object({
//   name: z.string().min(1, { message: "Name is required" }),
//   email: z.string().email(),
//   phone: z.number().min(8, { message: "Message is required" }),
// });

app.use(express.json());

// POSTER MAKING
app.post("/e1", async (req, res) => {
    try {
        console.log(req);
        // const body = contactFormSchema.parse(req.body);
        const response = sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Poster",
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            resource: {
                values: [
                    // Timestamp, EventID, Event, College Name, Dept Name, Participant Name, Phone Number
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[5], //Name
                        req.body[6], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[7], //Name
                        req.body[8], //Phone Number
                    ],
                    // req.body, //debugging purposes
                ],
            },
        });

        console.log(response);

        // const response = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(response);
        res.json({ success: true, message: response });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: error });
        }
    }
});

// MODEL MAKING
app.post("/e2", async (req, res) => {
    try {
        console.log(req);
        // const body = contactFormSchema.parse(req.body);
        const response = sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Model",
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            resource: {
                // values: [
                //   // Timestamp, Event, College Name, Dept Name, Participant Name, Email Address, Phone Number, Image
                //   [
                //     req.body[0], //Timestamp
                //     req.body[1], //Event
                //     req.body[3], //College name
                //     req.body[2], //Dept Name
                //     req.body[4], //Name
                //     req.body[5], //Phone Number
                //   ],
                //   [
                //     req.body[0], //Timestamp
                //     req.body[1], //Event
                //     req.body[3], //College name
                //     req.body[2], //Dept Name
                //     req.body[7], //Name
                //     req.body[8], //Phone Number
                //   ],
                //   [
                //     req.body[0], //Timestamp
                //     req.body[1], //Event
                //     req.body[3], //College name
                //     req.body[2], //Dept Name
                //     req.body[10], //Name
                //     req.body[11], //Phone Number
                //   ],
                //   [
                //     req.body[0], //Timestamp
                //     req.body[1], //Event
                //     req.body[3], //College name
                //     req.body[2], //Dept Name
                //     req.body[13], //Name
                //     req.body[14], //Phone Number
                //   ],
                //   // req.body, //debugging purposes
                // ],
                values: [
                    // Timestamp, EventID, Event, College Name, Dept Name, Participant Name, Phone Number
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[5], //Name
                        req.body[6], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[7], //Name
                        req.body[8], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[9], //Name
                        req.body[10], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[11], //Name
                        req.body[12], //Phone Number
                    ],
                    // req.body, //debugging purposes
                ],
            },
        });

        console.log(response);

        // const response = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(response);
        res.json({ success: true, message: response });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: error });
        }
    }
});

// GENERAL QUIZ
app.post("/e3", async (req, res) => {
    try {
        console.log(req);
        // const body = contactFormSchema.parse(req.body);
        const response = sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: SHEET_ID,
            range: "General Quiz",
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            resource: {
                values: [
                    // Timestamp, EventID, Event, College Name, Dept Name, Participant Name, Phone Number
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[5], //Name
                        req.body[6], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[7], //Name
                        req.body[8], //Phone Number
                    ],
                    // req.body, //debugging purposes
                ],
            },
        });

        console.log(response);

        // const response = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(response);
        res.json({ success: true, message: response });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: error });
        }
    }
});

// CODE MOSAIC
app.post("/e4", async (req, res) => {
    try {
        console.log(req);
        // const body = contactFormSchema.parse(req.body);
        const response = sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Code Mosaic",
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            resource: {
                values: [
                    // Timestamp, EventID, Event, College Name, Dept Name, Participant Name, Phone Number
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[5], //Name
                        req.body[6], //Phone Number
                    ],
                    // req.body, //debugging purposes
                ],
            },
        });

        console.log(response);

        // const response = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(response);
        res.json({ success: true, message: response });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: error });
        }
    }
});

// TECHNICAL QUIZ
app.post("/e5", async (req, res) => {
    try {
        console.log(req);
        // const body = contactFormSchema.parse(req.body);
        const response = sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Technical Quiz",
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            resource: {
                values: [
                    // Timestamp, EventID, Event, College Name, Dept Name, Participant Name, Phone Number
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[5], //Name
                        req.body[6], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[7], //Name
                        req.body[8], //Phone Number
                    ],
                    // req.body, //debugging purposes
                ],
            },
        });

        console.log(response);

        // const response = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(response);
        res.json({ success: true, message: response });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: error });
        }
    }
});

// TPP
app.post("/e6", async (req, res) => {
    try {
        console.log(req);
        // const body = contactFormSchema.parse(req.body);
        const response = sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: SHEET_ID,
            range: "TPP",
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            resource: {
                values: [
                    // Timestamp, EventID, Event, College Name, Dept Name, Participant Name, Phone Number
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[5], //Name
                        req.body[6], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[3], //College name
                        req.body[4], //Dept Name
                        req.body[7], //Name
                        req.body[8], //Phone Number
                    ],
                    // req.body, //debugging purposes
                ],
            },
        });

        console.log(response);

        // const response = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(response);
        res.json({ success: true, message: response });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: error });
        }
    }
});

// app.get("/send-message", (req, res) => {
//   res.json({ message: "Hello world" });
// });

app.listen(5000, "192.168.1.248", () =>
    console.log("App running on http://192.168.1.248:5000")
);