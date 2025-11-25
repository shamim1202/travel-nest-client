"use client";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { auth, provider, storage } from "../../../lib/firebase";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //-------------------- Handle Register ----------------
  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;

  //     // Handle photo upload
  //     let photoURL = "";
  //     if (photoFile) {
  //       const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
  //       await uploadBytes(storageRef, photoFile);
  //       photoURL = await getDownloadURL(storageRef);
  //     }

  //     await updateProfile(user, {
  //       displayName: name,
  //       photoURL: photoURL || "",
  //     });

  //     // Save to localStorage and dispatch custom event for Navbar
  //     const userData = {
  //       displayName: name,
  //       email,
  //       photo: photoURL || "/default-user.png",
  //     };
  //     localStorage.setItem("user", JSON.stringify(userData));
  //     window.dispatchEvent(
  //       new CustomEvent("userUpdated", { detail: userData })
  //     );

  //     Swal.fire({
  //       icon: "success",
  //       title: "Registration Successful",
  //       text: `Welcome ${name}!`,
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });

  //     router.push("/");
  //   } catch (err) {
  //     console.error(err);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Registration Failed",
  //       text: err.message || "Something went wrong",
  //     });
  //   } finally {
  //     setLoading(false); // Ensure loading is reset in all cases
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Registering user...", email, password);

      let photoURL = "";
      if (photoFile) {
        try {
          const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
          await uploadBytes(storageRef, photoFile);
          photoURL = await getDownloadURL(storageRef);
        } catch (photoErr) {
          console.error("Photo upload error:", photoErr);
          photoURL = "/default-user.png";
        }
      }

      try {
        await updateProfile(user, {
          displayName: name,
          photoURL: photoURL || "/default-user.png",
        });
      } catch (updateErr) {
        console.error("Update profile error:", updateErr);
      }

      // Save user locally & dispatch event for Navbar
      const userData = {
        displayName: name,
        email,
        photo: photoURL || "/default-user.png",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(
        new CustomEvent("userUpdated", { detail: userData })
      );

      // Show alert
      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `Welcome ${name}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/"); // Navigate after alert
    } catch (err) {
      console.error("Registration error:", err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false); // Always reset loading
    }
  };

  //-------------------- Handle Google Login ----------------
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

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
        text: `Welcome ${userData.displayName}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <div className="py-4 md:py-12 flex md:flex-1 flex-col items-center justify-center px-4 md:rounded">
        {" "}
        <div className="card w-full max-w-md shadow-xl hover:shadow-2xl transition-all duration-300 pb-5 md:pb-0">
          {" "}
          <h1 className="text-secondary text-2xl md:text-4xl font-bold mt-4 md:mt-6 text-center">
            Register Your Account{" "}
          </h1>
          <form onSubmit={handleRegister} className="card-body">
            <label className="label text-sm md:text-base">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full text-xs md:text-sm"
              placeholder="Your Name"
              required
            />

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

            <label className="label text-sm md:text-base">Photo</label>
            <input
              type="file"
              accept="image/*"
              className="file-input w-full text-xs md:text-sm"
              onChange={(e) => setPhotoFile(e.target.files[0])}
            />

            <button
              type="submit"
              className="btn btn-primary btn-outline btn-sm md:btn-md mt-2.5 md:mt-5 w-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-red-500 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
