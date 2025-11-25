"use client";

import { auth, provider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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
  const [error, setError] = useState("");
  const router = useRouter();

  // ------------------ Email Login --------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ----------------- Save to localStorage -----------------
      const userData = {
        displayName: user.displayName || "User",
        email: user.email,
        photo: user.photoURL || "/default-user.png",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(
        new CustomEvent("userUpdated", { detail: userData })
      );

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${userData.displayName}!`,
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

      const userData = {
        displayName: user.displayName || "User",
        email: user.email,
        photo: user.photoURL || "/default-user.png",
      };

      // ----------------- Save to localStorage -----------------
      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(
        new CustomEvent("userUpdated", { detail: userData })
      );

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${userData.displayName}!`,
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

            {error && (
              <p className="text-red-600 text-center mt-2 text-sm">{error}</p>
            )}

            <form onSubmit={handleLogin} className="card-body">
              <label className="label text-sm md:text-base">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full text-xs md:text-sm"
                placeholder="Your Email"
                required
              />

              <label className="label text-sm md:text-base">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full text-xs md:text-sm pr-10"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                >
                  <span className="md:text-xl">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-outline btn-sm md:btn-md mt-2.5 md:mt-5 w-full"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
              </button>
            </form>

            <div>
              <div className="divider mt-0 text-xs md:text-sm">Or</div>
              <div className="mx-6">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="btn btn-sm md:btn-md w-full bg-white text-[0c0c0c] border border-[#dfdfdf] hover:shadow transition-all duration-300"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
              </div>
            </div>

            <p className="text-center text-sm md:text-base text-gray-600 my-3 md:my-5">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:text-red-500 font-medium hover:underline"
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
