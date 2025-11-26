"use client";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { auth } from "../../../lib/firebase";

// Convert file to Base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Optional photo
      let photoURL = "/default-user.png";
      if (photoFile) photoURL = await convertToBase64(photoFile);

      // Firebase Auth create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firebase Auth profile with name & photo
      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      // Save to localStorage for Navbar
      const userData = {
        uid: user.uid,
        displayName: name,
        email,
        photo: photoURL,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Trigger Navbar update
      window.dispatchEvent(new CustomEvent("userUpdated", { detail: userData }));

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/"); // Navigate home
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 flex flex-col items-center">
      <div className="card w-full max-w-md shadow-xl border p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <label>Name</label>
          <input
            type="text"
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            className="input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />

          <label>Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label>Upload Photo (Optional)</label>
          <input
            type="file"
            className="file-input w-full"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
          />

          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
