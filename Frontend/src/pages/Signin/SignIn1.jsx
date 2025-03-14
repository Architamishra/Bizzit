import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (
      !fullname ||
      !email ||
      !phoneNumber ||
      !workAddress ||
      !role ||
      !gender ||
      !password
    ) {
      alert("Please fill all fields.");
      return;
    }

    const signupData = {
      fullname,
      email,
      phoneNumber,
      workAddress,
      role,
      gender,
      password,
    };

    let users = JSON.parse(localStorage.getItem("register")) || [];

    if (!Array.isArray(users)) {
      users = [];
    }

    users[0] = signupData;

    localStorage.setItem("register", JSON.stringify(users));

    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[800px] max-w-full">
  <h1 className="text-5xl font-bold mb-8 text-center font-serif">Sign Up</h1>
  
  <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-6">
    {/* Full Name */}
    <div className="flex flex-col">
      <label htmlFor="fullname" className="font-medium">Full Name</label>
      <input type="text" id="fullname" className="border rounded-md p-2 w-full" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
    </div>

    {/* Email */}
    <div className="flex flex-col">
      <label htmlFor="email" className="font-medium">Email</label>
      <input type="email" id="email" className="border rounded-md p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </div>

    {/* Phone Number */}
    <div className="flex flex-col">
      <label htmlFor="phoneNumber" className="font-medium">Phone Number</label>
      <input type="tel" id="phoneNumber" className="border rounded-md p-2 w-full" value={phoneNumber} onChange={(e) => setPhone(e.target.value)} required />
    </div>

    {/* Work Address */}
    <div className="flex flex-col">
      <label htmlFor="workAddress" className="font-medium">Work Address</label>
      <input type="text" id="workAddress" className="border rounded-md p-2 w-full" value={workAddress} onChange={(e) => setWorkAddress(e.target.value)} required />
    </div>

    {/* Role (Full Width) */}
    <div className="col-span-2">
      <label className="font-medium">Role</label>
      <div className="flex gap-6">
        <label><input type="radio" name="role" value="distributor" checked={role === "distributor"} onChange={(e) => setRole(e.target.value)} required /> Distributor</label>
        <label><input type="radio" name="role" value="retailer" checked={role === "retailer"} onChange={(e) => setRole(e.target.value)} required /> Retailer</label>
      </div>
    </div>

    {/* Gender (Full Width) */}
    <div className="col-span-2">
      <label className="font-medium">Gender</label>
      <div className="flex gap-6">
        <label><input type="radio" name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} required /> Male</label>
        <label><input type="radio" name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} required /> Female</label>
        <label><input type="radio" name="gender" value="other" checked={gender === "other"} onChange={(e) => setGender(e.target.value)} required /> Other</label>
      </div>
    </div>

    {/* Password */}
    <div className="flex flex-col">
      <label htmlFor="password" className="font-medium">Password</label>
      <input type="password" id="password" className="border rounded-md p-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />
    </div>

    {/* Confirm Password */}
    <div className="flex flex-col">
      <label htmlFor="confirmPassword" className="font-medium">Confirm Password</label>
      <input type="password" id="confirmPassword" className="border rounded-md p-2 w-full" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
    </div>

    {/* Submit Button */}
    <div className="col-span-2">
      <button type="submit" className="bg-blue-500 text-white font-bold p-2 rounded-md w-full">Create Account</button>
    </div>
  </form>
</div>

    </div>
  );
}

export default SignInForm;
