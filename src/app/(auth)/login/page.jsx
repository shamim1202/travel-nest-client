"use client";

import { auth, provider } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ------------------ Save & Sync User Locally --------------------
  const saveUserToLocal = (user) => {
    const userData = {
      displayName: user.displayName || "User",
      email: user.email,
      photo: user.photoURL || "/default-user.png",
    };

    localStorage.setItem("user", JSON.stringify(userData));
    window.dispatchEvent(
      new CustomEvent("userUpdated", { detail: userData })
    );
  };

  // ------------------ Email Login --------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      saveUserToLocal(user);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${user.displayName || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Something went wrong",
      });
    }

    setLoading(false);
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

      router.push("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Something went wrong",
      });
    }
  };

  return (
    <div>
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

        <div className="py-4 md:py-12 flex md:flex-1 flex-col items-center justify-center px-4 md:rounded">
          <div className="card w-full max-w-md shadow-xl hover:shadow-2xl transition-all duration-300 pb-5 md:pb-0">

            <h1 className="text-secondary text-2xl md:text-4xl font-bold mt-4 md:mt-6 text-center">
              Login To Your Account
            </h1>

            <form onSubmit={handleLogin} className="card-body">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Your Email"
                required
              />

              <label>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pr-10"
                  placeholder="Password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
              </button>
            </form>

            <div>
              <div className="divider mt-0">OR</div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn w-full bg-white border border-gray-300"
              >
                Login with Google
              </button>
            </div>

            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
              >
                Register
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
