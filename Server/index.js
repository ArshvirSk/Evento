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

// Timestamp, EventID, Event, College Name, Dept Name, Participant Name, Phone Number

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
                        req.body[4], //College name
                        req.body[3], //Dept Name
                        req.body[5], //Name
                        req.body[6], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[4], //College name
                        req.body[3], //Dept Name
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

app.post("/e1check", async (req, res) => {
    let valueMatched;

    try {
        // console.log(req);
        console.log('Poster Making request');

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Poster",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of response.data.values[5]) {
            if (e === req.body[6] || e === req.body[8]) {
                valueMatched = true;
                console.log(e, valueMatched);
                break;
            } else {
                valueMatched = false;
                console.log(e, valueMatched);
            }
        }

        if (valueMatched) {
            // Do something if valueMatched is true
            console.log("Value matched, executing subsequent code...");
        } else {
            // Do something if valueMatched is false
            console.log("Value not matched, executing alternative code...");
        }

        res.json({ valueMatched });
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
                values: [
                    // Timestamp, EventID, Event, College Name, Dept Name, Participant Name, Phone Number
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[4], //College name
                        req.body[3], //Dept Name
                        req.body[5], //Name
                        req.body[6], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[4], //College name
                        req.body[3], //Dept Name
                        req.body[7], //Name
                        req.body[8], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[4], //College name
                        req.body[3], //Dept Name
                        req.body[9], //Name
                        req.body[10], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[4], //College name
                        req.body[3], //Dept Name
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

app.post("/e2check", async (req, res) => {
    let valueMatched;

    try {
        // console.log(req);
        console.log('Model Making request');

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Model",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of response.data.values[5]) {
            if (e === req.body[6] || e === req.body[8] || e === req.body[10] || e === req.body[12]) {
                valueMatched = true;
                console.log(e, valueMatched);
                break;
            } else {
                valueMatched = false;
                console.log(e, valueMatched);
            }
        }

        if (valueMatched) {
            // Do something if valueMatched is true
            console.log("Value matched, executing subsequent code...");
        } else {
            // Do something if valueMatched is false
            console.log("Value not matched, executing alternative code...");
        }

        res.json({ valueMatched });
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
                        req.body[4], //College name
                        req.body[3], //Dept Name
                        req.body[5], //Name
                        req.body[6], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[4], //College name
                        req.body[3], //Dept Name
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

app.post("/e3check", async (req, res) => {
    let valueMatched;

    try {
        // console.log(req);
        console.log('General Quiz request');

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "General Quiz",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of response.data.values[5]) {
            if (e === req.body[6] || e === req.body[8]) {
                valueMatched = true;
                console.log(e, valueMatched);
                break;
            } else {
                valueMatched = false;
                console.log(e, valueMatched);
            }
        }

        if (valueMatched) {
            // Do something if valueMatched is true
            console.log("Value matched, executing subsequent code...");
        } else {
            // Do something if valueMatched is false
            console.log("Value not matched, executing alternative code...");
        }

        res.json({ valueMatched });
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
                        req.body[4], //College name
                        req.body[3], //Dept Name
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

app.post("/e4check", async (req, res) => {
    let valueMatched;

    try {
        // console.log(req);
        console.log('Code Mosaic request');

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Code Mosaic",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of response.data.values[5]) {
            if (e === req.body[6]) {
                valueMatched = true;
                console.log(e, valueMatched);
                break;
            } else {
                valueMatched = false;
                console.log(e, valueMatched);
            }
        }

        if (valueMatched) {
            // Do something if valueMatched is true
            console.log("Value matched, executing subsequent code...");
        } else {
            // Do something if valueMatched is false
            console.log("Value not matched, executing alternative code...");
        }

        res.json({ valueMatched });
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
                        req.body[4], //College name
                        req.body[3], //Dept Name
                        req.body[5], //Name
                        req.body[6], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[4], //College name
                        req.body[3], //Dept Name
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

app.post("/e5check", async (req, res) => {
    let valueMatched;

    try {
        // console.log(req);
        console.log('Technical Quiz request');

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Technical Quiz",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of response.data.values[5]) {
            if (e === req.body[6] || e === req.body[8]) {
                valueMatched = true;
                console.log(e, valueMatched);
                break;
            } else {
                valueMatched = false;
                console.log(e, valueMatched);
            }
        }

        if (valueMatched) {
            // Do something if valueMatched is true
            console.log("Value matched, executing subsequent code...");
        } else {
            // Do something if valueMatched is false
            console.log("Value not matched, executing alternative code...");
        }

        res.json({ valueMatched });
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
                        req.body[4], //College name
                        req.body[3], //Dept Name
                        req.body[5], //Name
                        req.body[6], //Phone Number
                    ],
                    [
                        req.body[0], //Timestamp
                        req.body[2], //Event
                        req.body[4], //College name
                        req.body[3], //Dept Name
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

app.post("/e6check", async (req, res) => {
    let valueMatched;

    try {
        // console.log(req);
        console.log('TPP request');

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "TPP",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of response.data.values[5]) {
            if (e === req.body[6] || e === req.body[8]) {
                valueMatched = true;
                console.log(e, valueMatched);
                break;
            } else {
                valueMatched = false;
                console.log(e, valueMatched);
            }
        }

        if (valueMatched) {
            // Do something if valueMatched is true
            console.log("Value matched, executing subsequent code...");
        } else {
            // Do something if valueMatched is false
            console.log("Value not matched, executing alternative code...");
        }

        res.json({ valueMatched });
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