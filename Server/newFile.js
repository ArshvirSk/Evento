import { app } from "./index.js";
import sheets, { SHEET_ID } from "./sheetClient.js";

app.post("/e1check", async (req, res) => {
    try {
        console.log(req);
        // const body = contactFormSchema.parse(req.body);
        const response = sheets.spreadsheets.values.get({
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
