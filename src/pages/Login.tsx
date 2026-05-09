import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import loginImage from "../assets/Website_Assets/illustrasi login.png";

import { loginUser } from "../features/auth/authservice";
import { loginSuccess } from "../features/auth/authSlice";

const initialFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email dan password wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(formData);

      if (result.status === 0) {
        const token = result.data.token;

        dispatch(loginSuccess(token));

        toast.success("Login berhasil!");

        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      const err = error as AxiosError<{
        message: string;
      }>;

      toast.error(
        err.response?.data?.message || "Terjadi kesalahan saat login",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              S
            </div>

            <h1 className="text-2xl font-bold">SIMS PPOB</h1>
          </div>

          <h2 className="text-3xl font-semibold text-center mb-2">
            Masuk atau buat akun
            <br />
            untuk memulai
          </h2>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="masukkan email anda"
                className="input w-full pl-11"
                autoComplete="off"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="masukkan password anda"
                className="input w-full pl-11 pr-11"
                autoComplete="off"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-red w-full py-4 text-lg font-semibold disabled:opacity-70">
              {loading ? "Sedang memproses..." : "Masuk"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Belum punya akun?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-red-500 font-semibold cursor-pointer hover:underline">
              registrasi di sini
            </span>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-[#FFF0F0] items-center justify-center">
        <img src={loginImage} alt="Illustration" className="w-[85%] max-w-lg" />
      </div>
    </div>
  );
};

export default Login;
