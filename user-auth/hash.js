const bcrypt = require('bcryptjs');

async function HashPassword(password){
    const gensalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,gensalt);
    return hash;
}
module.exports = HashPassword;