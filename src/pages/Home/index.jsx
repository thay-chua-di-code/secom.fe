import Banner from "../../components/layouts/Banner";
import CategorySidebar from "./CategoriesSideBar";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchHomepage } from "../../redux/slice/homeSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, featuredCategories, featuredProducts, latestProducts } =
    useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomepage());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-6">
      <Banner />

      <div className="flex gap-6">
        <aside className="hidden w-[260px] shrink-0 lg:block">
          <CategorySidebar />
        </aside>

        <main className="flex-1">
          {/* featured products */}
          {/* latest products */}
        </main>
      </div>
    </div>
  );
};

export default Home;
