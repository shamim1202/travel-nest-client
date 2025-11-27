"use client";

import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import Image from "next/image";
import { auth } from "@/lib/firebase";

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

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Optional photo
      let photoURL = "/default-user.png";
      if (photoFile) photoURL = await convertToBase64(photoFile);

      // Firebase Auth create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
      window.dispatchEvent(
        new CustomEvent("userUpdated", { detail: userData })
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push(redirectUrl); // Navigate home
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

  // ------------------ Google Login ---------------------
    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
  
        saveUserToLocal(user);
  
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${user.displayName || "User"}!`,
          timer: 2000,
          showConfirmButton: false,
        });
  
        router.push(redirectUrl);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message || "Something went wrong",
        });
      }
    };

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-center">
        <div className="relative w-full md:w-1/2 h-5 md:h-auto">
          <Image
            src="https://i.ibb.co/xKBSq8Yw/register.png"
            alt="Register"
            width={550}
            height={400}
            className="object-cover opacity-20 md:opacity-100 bg-black/20 md:bg-black/0"
          />
        </div>

        <div className="card w-full max-w-md shadow-xl hover:shadow-2xl transition-all duration-300 pb-5 md:pb-10">
          <h2 className="text-secondary text-2xl md:text-4xl font-bold mt-4 md:mt-6 text-center">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="card-body">
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

          <div className="divider mt-0">OR</div>
            <div className="mx-6 hover:shadow">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn w-full bg-white border border-gray-300"
              >
                Login with Google
              </button>
            </div>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
