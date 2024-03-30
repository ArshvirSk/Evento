import express from "express";
import { ZodError } from "zod";
import sheets, { SHEET_ID, USER_SHEET_ID, auth } from "./sheetClient.js";

const app = express();

const PORT = 5000;

let userSignIn = false;

app.use(express.json());

// Checking for user in database
app.post("/userCheck", async (req, res) => {
    try {
        console.log('User check');

        const responseMain = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: USER_SHEET_ID,
            range: "Users",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "ROWS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        // Extract phone numbers and passwords from the response
        const userPairs = responseMain.data.values;

        // Check if the provided phone number exists in the spreadsheet
        let userFound = false;
        for (let i = 1; i < userPairs.length; i++) {
            const pair = userPairs[i];
            const phoneNumberMatch = pair[0] === req.body[0];
            const passwordMatch = pair[1] === req.body[1];

            console.log(`Comparing user pair: ${pair}`);
            console.log(`With request body: ${req.body}`);
            console.log(`Phone number match: ${phoneNumberMatch}`);
            console.log(`Password match: ${passwordMatch}`);
            console.log("-------------------");

            if (phoneNumberMatch && passwordMatch) {
                userFound = true;
                console.log("User found. Stopping search.");
                break; // Stop searching if user is found
            }
        }

        console.log(`User found: ${userFound}`);

        userSignIn = userFound;

        res.json({ success: userFound });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: error });
        }
    }
})

// Creating user in database
app.post("/usercreate", async (req, res) => {
    try {
        let success;
        let responseMain;
        console.log(req);
        // const body = contactFormSchema.parse(req.body);

        const responseSub = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: USER_SHEET_ID,
            range: "Users",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        })

        console.log(responseSub.data.values[0]);

        let userFound = false;

        for (const e of responseSub.data.values[0]) {
            if (e === req.body[0]) {
                // USER FOUND
                userFound = true;
                console.log(e, userFound);
                break;
            }
        }

        if (!userFound) {
            console.log(req.body[0], "User not found, creating...");
            const appendResponse = await sheets.spreadsheets.values.append({
                auth,
                spreadsheetId: USER_SHEET_ID,
                range: "Users",
                valueInputOption: "RAW",
                insertDataOption: "INSERT_ROWS",
                resource: {
                    values: [
                        [
                            req.body[0], //Phone Number
                            req.body[1], //Password
                        ],
                    ]
                },
            });
            console.log("User created successfully.");
            responseMain = appendResponse;
            success = true;
        } else {
            console.log(req.body[0], "User already exists.");
            success = false;
        }

        userSignIn = success;

        res.json({ success: success, message: { responseMain, responseSub } });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: error });
        }
    }
})



// Timestamp, EventID, Event, College Name, Dept Name, Participant Name, Phone Number

// POSTER MAKING
app.post("/e1", async (req, res) => {
    try {
        // console.log(req);
        // const body = contactFormSchema.parse(req.body);
        let [responseMain, responseSub] = await Promise.all([
            sheets.spreadsheets.values.append({
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
            }),
            sheets.spreadsheets.values.append({
                auth,
                spreadsheetId: SHEET_ID,
                range: "ALL RESPONSES",
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
            })
        ]);

        console.log(responseMain);
        console.log(responseSub);

        // const responseMain = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(responseMain);
        res.json({ success: true, message: responseMain });
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
        console.log(req);
        console.log('Poster Making request');

        const responseMain = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Poster",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of responseMain.data.values[5]) {
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
        // console.log(req);
        // const body = contactFormSchema.parse(req.body);
        let [responseMain, responseSub] = await Promise.all([
            sheets.spreadsheets.values.append({
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
            }),
            sheets.spreadsheets.values.append({
                auth,
                spreadsheetId: SHEET_ID,
                range: "ALL RESPONSES",
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
            })
        ])

        console.log(responseMain);
        console.log(responseSub);

        // const responseMain = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(responseMain);
        res.json({ success: true, message: responseMain });
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
        console.log(req);
        console.log('Model Making request');

        const responseMain = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Model",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of responseMain.data.values[5]) {
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
        // console.log(req);
        // const body = contactFormSchema.parse(req.body);
        let [responseMain, responseSub] = await Promise.all([
            sheets.spreadsheets.values.append({
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
            }),
            sheets.spreadsheets.values.append({
                auth,
                spreadsheetId: SHEET_ID,
                range: "ALL RESPONSES",
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
            })
        ])

        console.log(responseMain);
        console.log(responseSub);

        // const responseMain = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(responseMain);
        res.json({ success: true, message: responseMain });
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
        console.log(req);
        console.log('General Quiz request');

        const responseMain = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "General Quiz",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of responseMain.data.values[5]) {
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
        // console.log(req);
        // const body = contactFormSchema.parse(req.body);
        let [responseMain, responseSub] = await Promise.all([
            sheets.spreadsheets.values.append({
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
            }),
            sheets.spreadsheets.values.append({
                auth,
                spreadsheetId: SHEET_ID,
                range: "ALL RESPONSES",
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
            })
        ])

        console.log(responseMain);
        console.log(responseSub);

        // const responseMain = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(responseMain);
        res.json({ success: true, message: responseMain });
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
        console.log(req);
        console.log('Code Mosaic request');

        const responseMain = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Code Mosaic",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of responseMain.data.values[5]) {
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
        // console.log(req);
        // const body = contactFormSchema.parse(req.body);
        let [responseMain, responseSub] = await Promise.all([
            sheets.spreadsheets.values.append({
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
            }),
            sheets.spreadsheets.values.append({
                auth,
                spreadsheetId: SHEET_ID,
                range: "ALL RESPONSES",
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
            })
        ])

        console.log(responseMain);
        console.log(responseSub);

        // const responseMain = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(responseMain);
        res.json({ success: true, message: responseMain });
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
        console.log(req);
        console.log('Technical Quiz request');

        const responseMain = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "Technical Quiz",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of responseMain.data.values[5]) {
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
        // console.log(req);
        // const body = contactFormSchema.parse(req.body);
        let [responseMain, responseSub] = await Promise.all([
            sheets.spreadsheets.values.append({
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
            }),
            sheets.spreadsheets.values.append({
                auth,
                spreadsheetId: SHEET_ID,
                range: "ALL RESPONSES",
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
            })
        ])

        console.log(responseMain);
        console.log(responseSub);

        // const responseMain = await sheets.spreadsheets.values.get({
        //   spreadsheetId: SHEET_ID,
        //   range: "Page1",
        // });
        // console.log(responseMain);
        res.json({ success: true, message: responseMain });
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
        console.log(req);
        console.log('TPP request');

        const responseMain = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SHEET_ID,
            range: "TPP",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "COLUMNS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        for (const e of responseMain.data.values[5]) {
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

// app.listen(PORT, () =>
app.listen(PORT, '192.168.1.248', () =>
    console.log("App running on http://evento-w3o7.onrender.com/")
);
