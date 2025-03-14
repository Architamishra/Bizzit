// idGenerator.js

const generateRandomId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const generateCustomId = () => {
    const randomPart = generateRandomId(6); 
    const timestamp = Date.now(); 
    return `PROD-${randomPart}-${timestamp}`; 
};

module.exports = { generateCustomId };