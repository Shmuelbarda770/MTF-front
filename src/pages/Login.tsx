
// Login.tsx
import React, { useEffect, useState } from "react";
import { checkEmail } from "../server/app";
import { emailValidation } from "../validation/userValidation";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { gapi } from 'gapi-script';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'email',
      }).then(() => {
        console.log("GAPI client initialized.");
      }).catch((error: any) => {
        console.error("Error initializing GAPI client:", error);
      });
    };
    gapi.load('client:auth2', start);
  }, []);
  
  const handleGoogleLoginSuccess = async (googleEmail: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await checkEmail({ email: googleEmail });

      if (result.exists) {
        console.log("Google Email exists, navigating to OTP page.");
        navigate("/login/otp");
      } else {
        setError("Google Email not found.");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setError("Failed to check Google email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!emailValidation.pattern.value.test(email)) {
      setError(emailValidation.pattern.message);
      setLoading(false);
      return;
    }

    try {
      const result = await checkEmail({ email });

      if (result.exists) {
        console.log("Email exists, navigating to OTP page.");
        navigate("/login/otp");
      } else {
        setError("Email not found.");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      setError("Failed to check email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-700 to-blue-900 p-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg">
        <div className="flex justify-center mb-8">
          <img
            src="../../logo-MTF.png"
            alt="logo mtf"
            className="h-28 md:h-36 lg:h-48 transition-transform duration-300 hover:scale-105 drop-shadow-lg"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-200 text-lg font-semibold mb-3"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="bg-purple-600 text-white w-full px-4 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {loading ? "Loading..." : "Send Verification Code"}
            </button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center">
          <span className="w-1/4 border-b border-gray-500"></span>
          <span className="text-gray-400 mx-3">or</span>
          <span className="w-1/4 border-b border-gray-500"></span>
        </div>

        <GoogleLoginButton/>
      </div>
    </div>
  );
};

export default Login;
