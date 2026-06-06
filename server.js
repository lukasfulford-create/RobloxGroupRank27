app.post("/rank", async (req, res) => {
    try {
        console.log("REQUEST BODY:", req.body);

        const { userId, rankId } = req.body;

        if (!userId || !rankId) {
            return res.status(400).json({
                error: "Missing userId or rankId"
            });
        }

        await setRank(userId, rankId);

        res.json({ success: true });

    } catch (err) {
        console.error("FULL ERROR:", err.response?.data || err.message);

        res.status(500).json({
            error: err.response?.data || err.message
        });
    }
});
