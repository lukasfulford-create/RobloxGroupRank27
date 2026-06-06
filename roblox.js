const axios = require("axios");

async function setRank(userId, roleId) {

    const groupId = process.env.ROBLOX_GROUP_ID;

    await axios.patch(
        `https://apis.roblox.com/cloud/v2/groups/${groupId}/memberships/${userId}`,
        {
            roleId: roleId
        },
        {
            headers: {
                "x-api-key": process.env.ROBLOX_API_KEY,
                "Content-Type": "application/json"
            }
        }
    );
}

module.exports = { setRank };
