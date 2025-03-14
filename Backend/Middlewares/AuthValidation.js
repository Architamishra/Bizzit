//For registration details validations
// Importing the Joi library for data validation
const Joi = require("joi");

// Validation schema for retailer registration
const retailerValidation = Joi.object({
  fullname: Joi.string().required(), // Full name must be a string and is required
  email: Joi.string().email().required(), // Email must be a valid email format and is required
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/) // Phone number must be a string of exactly 10 digits
    .required(), // Phone number is required
  workAddress: Joi.string().required(), // Work address must be a string and is required
  gender: Joi.string().valid("male", "female", "other").required(), // Gender must be one of the specified values and is required
  role: Joi.string().valid("retailer").required(), // Role must be "retailer" and is required
  password: Joi.string().min(6).required(), // Password must be a string with a minimum length of 6 characters and is required
  business: Joi.object({
    businessName: Joi.string().required(), // Business name must be a string and is required
    isAgreed: Joi.boolean().required(), // Agreement status must be a boolean and is required
  }).required(), // Business object is required
  businessDetails: Joi.object({
    storeName: Joi.string().required(), // Store name must be a string and is required
    productCategory: Joi.string().required(), // Product category must be a string and is required
    addressLine1: Joi.string().required(), // Address line 1 must be a string and is required
    addressLine2: Joi.string().required(), // Address line 2 must be a string and is required
    city: Joi.string().required(), // City must be a string and is required
    state: Joi.string().required(), // State must be a string and is required
    pincode: Joi.string().required(), // Pincode must be a string and is required
  }).required(), // Business details object is required
  taxDetails: Joi.object({
    state: Joi.string().required(), // State must be a string and is required
    legalName: Joi.string().required(), // Legal name must be a string and is required
    gstNumber: Joi.string().required(), // GST number must be a string and is required
    panNumber: Joi.string().required(), // PAN number must be a string and is required
  }).required(), // Tax details object is required
  bankDetails: Joi.object({
    name: Joi.string().required(), // Bank name must be a string and is required
    accountHolderName: Joi.string().required(), // Account holder name must be a string and is required
    accountType: Joi.string().required(), // Account type must be a string and is required
    accountNumber: Joi.string().required(), // Account number must be a string and is required
    reEnterAccountNumber: Joi.string().required(), // Re-entered account number must be a string and is required
    ifscCode: Joi.string().required(), // IFSC code must be a string and is required
    upiId: Joi.string().required(), // UPI ID must be a string and is required
  }).required(), // Bank details object is required
});

// Validation schema for distributor registration
const distributorValidation = Joi.object({
  fullname: Joi.string().required(), // Full name must be a string and is required
  email: Joi.string().email().required(), // Email must be a valid email format and is required
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/) // Phone number must be a string of exactly 10 digits
    .required(), // Phone number is required
  workAddress: Joi.string().required(), // Work address must be a string and is required
  gender: Joi.string().valid("male", "female", "other").required(), // Gender must be one of the specified values and is required
  role: Joi.string().valid("distributor").required(), // Role must be "distributor" and is required
  password: Joi.string().min(6).required(), // Password must be a string with a minimum length of 6 characters and is required
  business: Joi.object({
    businessName: Joi.string().required(), // Business name must be a string and is required
    isAgreed: Joi.boolean().required(), // Agreement status must be a boolean and is required
  }).required(), // Business object is required
  businessDetails: Joi.object({
    storeName: Joi.string().required(), // Store name must be a string and is required
    productCategory: Joi.string().required(), // Product category must be a string and is required
    addressLine1: Joi.string().required(), // Address line 1 must be a string and is required
    addressLine2: Joi.string().required(), // Address line 2 must be a string and is required
    city: Joi.string().required(), // City must be a string and is required
    state: Joi.string().required(), // State must be a string and is required
    pincode: Joi.string().required(), // Pincode must be a string and is required
  }).required(), // Business details object is required
  taxDetails: Joi.object({
    state: Joi.string().required(), // State must be a string and is required
    legalName: Joi.string().required(), // Legal name must be a string and is required
    gstNumber: Joi.string().required(), // GST number must be a string and is required
    panNumber: Joi.string().required(), // PAN number must be a string and is required
  }).required(), // Tax details object is required
  bankDetails: Joi.object({
    name: Joi.string().required(), // Bank name must be a string and is required
    accountHolderName: Joi.string().required(), // Account holder name must be a string and is required
    accountType: Joi.string().required(), // Account type must be a string and is required
    accountNumber: Joi.string().required(), // Account number must be a string and is required
    reEnterAccountNumber: Joi.string().required(), // Re-entered account number must be a string and is required
    ifscCode: Joi.string().required(), // IFSC code must be a string and is required
    upiId: Joi.string().required(), // UPI ID must be a string and is required
  }).required(), // Bank details object is required
});

// Exporting the validation schemas for use in other parts of the application
module.exports = { retailerValidation, distributorValidation };
