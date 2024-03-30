import { google } from "googleapis";
const CLIENT_ID =
    "151574910315-j8rdjf8o50i35g4s2cjaqk4hcub7cqq9.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
    "1//04rIYIAYp_RvSCgYIARAAGAQSNwF-L9IrpSHbLN566V-QQGAMUy43MwkGtC1knq_bvkzWVylhe5_GHBamho-DcebaRBUbF1ARJcU";

export const auth = new google.auth.GoogleAuth({
    keyFilename: "secrets.json",
    keyFile: "./secrets.json",
    scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive.appdata",
        "https://www.googleapis.com/auth/drive.scripts",
        "https://www.googleapis.com/auth/drive.metadata",
    ],
});

export const SHEET_ID = "1h4s8gH1PffAyhCW6h6qS4r2AP2r60sCpU0DXHGi0RwY";

export const USER_SHEET_ID = "1LM7Sj2qJKHQoxj2xZPPFI2Q8-ekbx_CO-CMjNs_lNPE";

const client = await auth.getClient();

// const client = new google.auth.JWT(key.client_mail, null, key.private_key, [
//   "https://www.googleapis.com/auth/spreadsheets",
// ]);

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sheets = google.sheets({ version: "v4", auth: client });

export default sheets;
