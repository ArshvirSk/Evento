import express from "express";
import { ZodError } from "zod";
import sheets, { SHEET_ID, USER_SHEET_ID, auth } from "./sheetClient.js";

const app = express();

const PORT = 5000;

let userSignIn = false;

app.use(express.json());

// Function to append values to a spreadsheet
async function appendToSpreadsheet(spreadsheetId, range, values) {
    try {
        const response = await sheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range,
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",
            resource: { values },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error appending data to ${range}: ${error.message}`);
    }
}

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
        let pair

        // Check if the provided phone number exists in the spreadsheet
        let userFound = false;
        for (let i = 1; i < userPairs.length; i++) {
            pair = userPairs[i];
            const phoneNumberMatch = pair[1] === req.body[0];
            const passwordMatch = pair[2] === req.body[1];

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

        res.json({ success: userFound, message: pair });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: error });
        }
    }
})

// Creating user in database
app.post("/userCreate", async (req, res) => {
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
                            req.body[0], //Username
                            req.body[1], //Phone Number
                            req.body[2], //Password
                            'FALSE',
                            'FALSE',
                            'FALSE',
                            'FALSE',
                            'FALSE',
                            'FALSE',
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

app.post("/userDetails", async (req, res) => {
    try {
        console.log('User Details');
        console.log(req.body);
        const phonenum = req.body.phone;
        const password = req.body.pass;

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

        console.log(userPairs);

        const rowIndex = userPairs.findIndex(row => row[1] === phonenum && row[2] === password);

        const myuser = userPairs[rowIndex]

        console.log(myuser);

        const userEvents = [];

        for (let i = 3; i < myuser.length; i++) {
            if (myuser[i] === 'TRUE') {
                // Assuming the event names are e1, e2, e3, ...
                userEvents.push(`e${i - 2}`);
            }
        }

        console.log("User events:", userEvents);
        res.json({ success: true, message: userEvents })
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
        const phoneNumber = req.body.mydata.phone;

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: USER_SHEET_ID,
            range: "Users",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "ROWS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        const rows = response.data.values;

        console.log(req.body.data);


        // Find the index of the row corresponding to the user's phone number
        const rowIndex = rows.findIndex(row => row[1] === phoneNumber);
        const userData = rows[rowIndex]


        if (rowIndex !== -1) {
            // Define the values to append to the "Code Mosaic" and "ALL RESPONSES" sheets

            const valuesToAppend = [
                [
                    req.body.data[0], // Timestamp
                    req.body.data[2], // Event
                    req.body.data[4], // College name
                    req.body.data[3], // Dept Name
                    req.body.data[5], // Name
                    req.body.data[6], // Phone Number
                ],
                [
                    req.body.data[0], // Timestamp
                    req.body.data[2], // Event
                    req.body.data[4], // College name
                    req.body.data[3], // Dept Name
                    req.body.data[7], // Name
                    req.body.data[8], // Phone Number
                ],
            ];

            // Perform asynchronous requests to append data to spreadsheets and update user data
            const [responseMain, responseSub, responseUpdate] = await Promise.all([
                appendToSpreadsheet(SHEET_ID, "Poster", valuesToAppend),
                appendToSpreadsheet(SHEET_ID, "ALL RESPONSES", valuesToAppend),
                sheets.spreadsheets.values.update({
                    auth,
                    spreadsheetId: USER_SHEET_ID,
                    range: `Users!A${rowIndex + 1}:I${rowIndex + 1}`, // Assuming columns A to F contain the user data
                    valueInputOption: "RAW",
                    resource: {
                        values: [
                            [
                                req.body.mydata.user,  // username
                                phoneNumber,            // phone number
                                req.body.mydata.pass,  // password
                                true,
                                userData[4],
                                userData[5],
                                userData[6],
                                userData[7],
                                userData[8],
                            ]
                        ],
                    },
                })
            ]);

            console.log(responseMain);
            console.log(responseSub);
            console.log(responseUpdate);

            res.json({ success: true, message: "Data updated successfully" });
        } else {
            console.log("User not found in the database");
            res.status(404).json({ success: false, message: "User not found" });
        }
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
        const phoneNumber = req.body.mydata.phone;

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: USER_SHEET_ID,
            range: "Users",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "ROWS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        const rows = response.data.values;

        console.log(req.body.data);

        // Find the index of the row corresponding to the user's phone number
        const rowIndex = rows.findIndex(row => row[1] === phoneNumber);

        const userData = rows[rowIndex]


        if (rowIndex !== -1) {
            // Define the values to append to the "Code Mosaic" and "ALL RESPONSES" sheets

            const valuesToAppend = [
                [
                    req.body.data[0], //Timestamp
                    req.body.data[2], //Event
                    req.body.data[4], //College name
                    req.body.data[3], //Dept Name
                    req.body.data[5], //Name
                    req.body.data[6], //Phone Number
                ],
                [
                    req.body.data[0], //Timestamp
                    req.body.data[2], //Event
                    req.body.data[4], //College name
                    req.body.data[3], //Dept Name
                    req.body.data[7], //Name
                    req.body.data[8], //Phone Number
                ],
                [
                    req.body.data[0], //Timestamp
                    req.body.data[2], //Event
                    req.body.data[4], //College name
                    req.body.data[3], //Dept Name
                    req.body.data[9], //Name
                    req.body.data[10], //Phone Number
                ],
                [
                    req.body.data[0], //Timestamp
                    req.body.data[2], //Event
                    req.body.data[4], //College name
                    req.body.data[3], //Dept Name
                    req.body.data[11], //Name
                    req.body.data[12], //Phone Number
                ],
            ];

            // Perform asynchronous requests to append data to spreadsheets and update user data
            const [responseMain, responseSub, responseUpdate] = await Promise.all([
                appendToSpreadsheet(SHEET_ID, "Model", valuesToAppend),
                appendToSpreadsheet(SHEET_ID, "ALL RESPONSES", valuesToAppend),
                sheets.spreadsheets.values.update({
                    auth,
                    spreadsheetId: USER_SHEET_ID,
                    range: `Users!A${rowIndex + 1}:I${rowIndex + 1}`, // Assuming columns A to F contain the user data
                    valueInputOption: "RAW",
                    resource: {
                        values: [
                            [
                                req.body.mydata.user,  // username
                                phoneNumber,            // phone number
                                req.body.mydata.pass,  // password
                                userData[3],
                                true,
                                userData[5],
                                userData[6],
                                userData[7],
                                userData[8],
                            ]
                        ],
                    },
                })
            ]);

            console.log(responseMain);
            console.log(responseSub);
            console.log(responseUpdate);

            res.json({ success: true, message: "Data updated successfully" });
        } else {
            console.log("User not found in the database");
            res.status(404).json({ success: false, message: "User not found" });
        }

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
        const phoneNumber = req.body.mydata.phone;

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: USER_SHEET_ID,
            range: "Users",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "ROWS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        const rows = response.data.values;

        console.log(req.body.data);

        // Find the index of the row corresponding to the user's phone number
        const rowIndex = rows.findIndex(row => row[1] === phoneNumber);
        const userData = rows[rowIndex]

        if (rowIndex !== -1) {
            // Define the values to append to the "Code Mosaic" and "ALL RESPONSES" sheets

            const valuesToAppend = [
                [
                    req.body.data[0], // Timestamp
                    req.body.data[2], // Event
                    req.body.data[4], // College name
                    req.body.data[3], // Dept Name
                    req.body.data[5], // Name
                    req.body.data[6], // Phone Number
                ],
                [
                    req.body.data[0], // Timestamp
                    req.body.data[2], // Event
                    req.body.data[4], // College name
                    req.body.data[3], // Dept Name
                    req.body.data[7], // Name
                    req.body.data[8], // Phone Number
                ],
            ];

            // Perform asynchronous requests to append data to spreadsheets and update user data
            const [responseMain, responseSub, responseUpdate] = await Promise.all([
                appendToSpreadsheet(SHEET_ID, "General Quiz", valuesToAppend),
                appendToSpreadsheet(SHEET_ID, "ALL RESPONSES", valuesToAppend),
                sheets.spreadsheets.values.update({
                    auth,
                    spreadsheetId: USER_SHEET_ID,
                    range: `Users!A${rowIndex + 1}:I${rowIndex + 1}`, // Assuming columns A to F contain the user data
                    valueInputOption: "RAW",
                    resource: {
                        values: [
                            [
                                req.body.mydata.user,  // username
                                phoneNumber,            // phone number
                                req.body.mydata.pass,  // password
                                userData[3],
                                userData[4],
                                true,
                                userData[6],
                                userData[7],
                                userData[8],
                            ]
                        ],
                    },
                })
            ]);

            console.log(responseMain);
            console.log(responseSub);
            console.log(responseUpdate);

            res.json({ success: true, message: "Data updated successfully" });
        } else {
            console.log("User not found in the database");
            res.status(404).json({ success: false, message: "User not found" });
        }


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
        const phoneNumber = req.body.mydata.phone;

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: USER_SHEET_ID,
            range: "Users",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "ROWS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        const rows = response.data.values;

        console.log(req.body.data);

        // Find the index of the row corresponding to the user's phone number
        const rowIndex = rows.findIndex(row => row[1] === phoneNumber);
        const userData = rows[rowIndex]

        if (rowIndex !== -1) {
            // Define the values to append to the "Code Mosaic" and "ALL RESPONSES" sheets

            const valuesToAppend = [
                [
                    req.body.data[0], // Timestamp
                    req.body.data[2], // Event
                    req.body.data[4], // College name
                    req.body.data[3], // Dept Name
                    req.body.data[5], // Name
                    req.body.data[6], // Phone Number
                ]
            ];

            // Perform asynchronous requests to append data to spreadsheets and update user data
            const [responseMain, responseSub, responseUpdate] = await Promise.all([
                appendToSpreadsheet(SHEET_ID, "Code Mosaic", valuesToAppend),
                appendToSpreadsheet(SHEET_ID, "ALL RESPONSES", valuesToAppend),
                sheets.spreadsheets.values.update({
                    auth,
                    spreadsheetId: USER_SHEET_ID,
                    range: `Users!A${rowIndex + 1}:I${rowIndex + 1}`, // Assuming columns A to F contain the user data
                    valueInputOption: "RAW",
                    resource: {
                        values: [
                            [
                                req.body.mydata.user,  // username
                                phoneNumber,            // phone number
                                req.body.mydata.pass,  // password
                                userData[3],
                                userData[4],
                                userData[5],
                                true,
                                userData[7],
                                userData[8],
                            ]
                        ],
                    },
                })
            ]);

            console.log(responseMain);
            console.log(responseSub);
            console.log(responseUpdate);

            res.json({ success: true, message: "Data updated successfully" });
        } else {
            console.log("User not found in the database");
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(400).json({ error: "Error updating data" });
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
        const phoneNumber = req.body.mydata.phone;

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: USER_SHEET_ID,
            range: "Users",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "ROWS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        const rows = response.data.values;

        console.log(req.body.data);

        // Find the index of the row corresponding to the user's phone number
        const rowIndex = rows.findIndex(row => row[1] === phoneNumber);
        const userData = rows[rowIndex]

        if (rowIndex !== -1) {
            // Define the values to append to the "Code Mosaic" and "ALL RESPONSES" sheets

            const valuesToAppend = [
                [
                    req.body.data[0], // Timestamp
                    req.body.data[2], // Event
                    req.body.data[4], // College name
                    req.body.data[3], // Dept Name
                    req.body.data[5], // Name
                    req.body.data[6], // Phone Number
                ],
                [
                    req.body.data[0], //Timestamp
                    req.body.data[2], //Event
                    req.body.data[4], //College name
                    req.body.data[3], //Dept Name
                    req.body.data[7], //Name
                    req.body.data[8], //Phone Number
                ],
            ];

            // Perform asynchronous requests to append data to spreadsheets and update user data
            const [responseMain, responseSub, responseUpdate] = await Promise.all([
                appendToSpreadsheet(SHEET_ID, "Technical Quiz", valuesToAppend),
                appendToSpreadsheet(SHEET_ID, "ALL RESPONSES", valuesToAppend),
                sheets.spreadsheets.values.update({
                    auth,
                    spreadsheetId: USER_SHEET_ID,
                    range: `Users!A${rowIndex + 1}:I${rowIndex + 1}`, // Assuming columns A to F contain the user data
                    valueInputOption: "RAW",
                    resource: {
                        values: [
                            [
                                req.body.mydata.user,  // username
                                phoneNumber,            // phone number
                                req.body.mydata.pass,  // password
                                userData[3],
                                userData[4],
                                userData[5],
                                userData[6],
                                true,
                                userData[8],
                            ]
                        ],
                    },
                })
            ]);

            console.log(responseMain);
            console.log(responseSub);
            console.log(responseUpdate);

            res.json({ success: true, message: "Data updated successfully" });
        } else {
            console.log("User not found in the database");
            res.status(404).json({ success: false, message: "User not found" });
        }
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
        const phoneNumber = req.body.mydata.phone;

        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: USER_SHEET_ID,
            range: "Users",
            dateTimeRenderOption: "FORMATTED_STRING",
            majorDimension: "ROWS",
            valueRenderOption: "FORMATTED_VALUE",
        });

        const rows = response.data.values;

        console.log(req.body.data);

        // Find the index of the row corresponding to the user's phone number
        const rowIndex = rows.findIndex(row => row[1] === phoneNumber);
        const userData = rows[rowIndex]

        if (rowIndex !== -1) {
            // Define the values to append to the "Code Mosaic" and "ALL RESPONSES" sheets

            const valuesToAppend = [
                [
                    req.body.data[0], // Timestamp
                    req.body.data[2], // Event
                    req.body.data[4], // College name
                    req.body.data[3], // Dept Name
                    req.body.data[5], // Name
                    req.body.data[6], // Phone Number
                ],
                [
                    req.body.data[0], //Timestamp
                    req.body.data[2], //Event
                    req.body.data[4], //College name
                    req.body.data[3], //Dept Name
                    req.body.data[7], //Name
                    req.body.data[8], //Phone Number
                ],
            ];

            // Perform asynchronous requests to append data to spreadsheets and update user data
            const [responseMain, responseSub, responseUpdate] = await Promise.all([
                appendToSpreadsheet(SHEET_ID, "TPP", valuesToAppend),
                appendToSpreadsheet(SHEET_ID, "ALL RESPONSES", valuesToAppend),
                sheets.spreadsheets.values.update({
                    auth,
                    spreadsheetId: USER_SHEET_ID,
                    range: `Users!A${rowIndex + 1}:I${rowIndex + 1}`, // Assuming columns A to F contain the user data
                    valueInputOption: "RAW",
                    resource: {
                        values: [
                            [
                                req.body.mydata.user,  // username
                                phoneNumber,            // phone number
                                userData[3],
                                userData[4],
                                userData[5],
                                userData[6],
                                userData[7],
                                true,
                            ]
                        ],
                    },
                })
            ]);

            console.log(responseMain);
            console.log(responseSub);
            console.log(responseUpdate);

            res.json({ success: true, message: "Data updated successfully" });
        } else {
            console.log("User not found in the database");
            res.status(404).json({ success: false, message: "User not found" });
        }
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
