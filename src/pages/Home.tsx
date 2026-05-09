import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/layout/MainLayout";
import type { AppDispatch } from "../store";
import { fetchProfile } from "../features/profile/profileSlice";
import { fetchBalance } from "../features/balance/balanceSlice";
import { fetchBanners } from "../features/banner/bannerSlice";
import { fetchServices } from "../features/service/serviceSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const { data: banners, loading: bannerLoading } = useSelector(
    (state: any) => state.banner,
  );
  const { data: services, loading: serviceLoading } = useSelector(
    (state: any) => state.service,
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
      dispatch(fetchBalance());
      dispatch(fetchBanners());
      dispatch(fetchServices());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <MainLayout>
      <section className="mt-14">
        {serviceLoading ? (
          <p className="text-center text-gray-500">Loading layanan...</p>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-y-8">
            {services.map((service: any) => (
              <div
                key={service.service_code}
                onClick={() =>
                  navigate("/payment", {
                    state: service,
                  })
                }
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img
                    src={service.service_icon}
                    alt={service.service_name}
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <p className="text-xs text-center text-gray-700 mt-2 leading-tight px-1">
                  {service.service_name}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-16">
        <h3 className="font-semibold text-lg mb-5">Temukan promo menarik</h3>
        {bannerLoading ? (
          <p className="text-gray-500">Loading banner...</p>
        ) : (
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
            {banners.map((banner: any) => (
              <div
                key={banner.banner_name}
                className="min-w-[270px] rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={banner.banner_image}
                  alt={banner.banner_name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default Home;
