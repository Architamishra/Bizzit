

const generateRandomId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const generateSupplierId = () => {
    const randomPart = generateRandomId(4); 
    const timestamp = Date.now().toString().slice(-4); 
    return `SUP-${randomPart}${timestamp}`; 
};

const generateConnectCode = () => {
    const randomPart = generateRandomId(4); 
    return `C-${randomPart}`; 
};

module.exports = { generateSupplierId, generateConnectCode };