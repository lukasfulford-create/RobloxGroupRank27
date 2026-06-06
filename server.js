const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const { setRank } = require("./roblox");

const app = express();
app.use(bodyParser.json());

// simple security check
function auth(req, res, next) {
    if (req.headers.authorization !== process.env.API_SECRET) {
        return res.status(403).send("No access");
    }
    next();
}

// Rank endpoint
app.post("/rank", auth, async (req, res) => {
    const { userId, rankId } = req.body;

    if (!userId || !rankId) {
        return res.status(400).send("Missing data");
    }

    try {
        await setRank(userId, rankId);
        res.json({ success: true, message: "Rank updated" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error ranking user");
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Rank API running");
});
