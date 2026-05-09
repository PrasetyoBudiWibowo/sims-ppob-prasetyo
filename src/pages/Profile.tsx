import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import type { AppDispatch, RootState } from "../store";
import { fetchProfile } from "../features/profile/profileSlice";
import { updateProfile } from "../features/profile/profileService";
import { updateProfileImage } from "../features/profile/profileImageService";
import { logout } from "../features/auth/authSlice";

const initialData = {
  first_name: "",
  last_name: "",
};

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state.profile.data);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getProfileForm = () => ({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 100 * 1024) {
      toast.error("Ukuran gambar maksimal 100 KB");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await updateProfileImage(formData);

      if (response.status === 0) {
        toast.success("Foto profile berhasil diupdate");

        dispatch(fetchProfile());
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Gagal upload foto");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await updateProfile({
        first_name: form.first_name,
        last_name: form.last_name,
      });

      if (response.status === 0) {
        toast.success("Profile berhasil diupdate");

        setIsEdit(false);

        dispatch(fetchProfile());
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Gagal update profile");
    }
  };

  const handleEdit = () => {
    setForm(getProfileForm());

    setIsEdit(true);
  };

  const handleLogout = () => {
    localStorage.clear();

    dispatch(logout());

    toast.success("Logout berhasil");

    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeMenu="profile" />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div
              onClick={handleImageClick}
              className="w-40 h-40 rounded-full overflow-hidden border border-gray-300 cursor-pointer">
              <img
                src={
                  profile?.profile_image ||
                  "/src/assets/Website_Assets/Profile Photo.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <button
              type="button"
              onClick={handleImageClick}
              className="absolute bottom-2 right-2 bg-white border border-gray-300 rounded-full p-2 shadow-md">
              <Camera size={18} />
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleUploadImage}
              className="hidden"
            />
          </div>

          <h1 className="text-4xl font-bold mt-6">
            {profile?.first_name} {profile?.last_name}
          </h1>
        </div>

        <div className="mt-14 max-w-2xl mx-auto space-y-6">
          <div>
            <label className="text-sm text-gray-500">Email</label>

            <div className="mt-2 flex items-center border border-gray-300 rounded-md px-4 py-4">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="ml-3 w-full bg-transparent outline-none text-gray-500"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500">Nama Depan</label>
            <div className="mt-2 flex items-center border border-gray-300 rounded-md px-4 py-4">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                value={form.first_name}
                disabled={!isEdit}
                onChange={(e) =>
                  setForm({
                    ...form,
                    first_name: e.target.value,
                  })
                }
                className="ml-3 w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Nama Belakang</label>

            <div className="mt-2 flex items-center border border-gray-300 rounded-md px-4 py-4">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                value={form.last_name}
                disabled={!isEdit}
                onChange={(e) =>
                  setForm({
                    ...form,
                    last_name: e.target.value,
                  })
                }
                className="ml-3 w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            {isEdit ? (
              <>
                <button
                  type="button"
                  onClick={handleUpdateProfile}
                  className="w-full py-4 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition">
                  Simpan
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForm(getProfileForm());

                    setIsEdit(false);
                  }}
                  className="w-full py-4 rounded-md border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition">
                  Batalkan
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="w-full py-4 rounded-md border border-red-500 text-red-500 font-semibold hover:bg-red-50 transition">
                Edit Profile
              </button>
            )}

            {!isEdit && (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-4 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
