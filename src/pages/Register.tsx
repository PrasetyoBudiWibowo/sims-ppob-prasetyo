import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { registerUser } from "../features/auth/authservice";
import { isValidEmail } from "../utils/validators";

import loginImage from "../assets/Website_Assets/illustrasi-login.png";

const initialFormData = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.email ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Semua field wajib diisi");
      return false;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Format email tidak valid");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password minimal 8 karakter");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await registerUser({
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
      });

      if (result.status === 0) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      const err = error as AxiosError<{
        message: string;
      }>;

      toast.error(
        err.response?.data?.message || "Terjadi kesalahan saat registrasi",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              S
            </div>

            <h1 className="text-2xl font-bold">SIMS PPOB</h1>
          </div>

          <h2 className="text-3xl font-semibold mb-8 text-center">
            Lengkapi data untuk
            <br />
            membuat akun
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* EMAIL */}
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

            {/* FIRST NAME */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="nama depan"
                className="input w-full pl-11"
                autoComplete="off"
                required
              />
            </div>

            {/* LAST NAME */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="nama belakang"
                className="input w-full pl-11"
                autoComplete="off"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="buat password"
                className="input w-full pl-11 pr-11"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="konfirmasi password"
                className="input w-full pl-11 pr-11"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-red w-full py-4 text-lg font-semibold disabled:opacity-70">
              {loading ? "Sedang mendaftar..." : "Registrasi"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Sudah punya akun?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-red-500 font-semibold cursor-pointer hover:underline">
              login di sini
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

export default Register;
