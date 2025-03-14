const generateRandomNumber = (length) => {
    const digits = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return result;
  };
  
  const generateCustomId = (role) => {
    if (!role) {
      throw new Error("Role is required to generate an ID.");
    }
  
    const randomPart = generateRandomNumber(6); // Generate a 6-digit random number
  
    if (role === "retailer") {
      return `BZRT${randomPart}`;
    } else if (role === "distributor") {
      return `BZDT${randomPart}`;
    } else {
      throw new Error(
        "Invalid role provided. Allowed roles: retailer, distributor."
      );
    }
  };
  
  module.exports = { generateCustomId };
  