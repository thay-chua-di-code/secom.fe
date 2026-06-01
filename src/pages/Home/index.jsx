import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "../../components/layouts/Banner";
import CategorySidebar from "./CategoriesSideBar";
import Policy from "./Policy";
import SectionDivider from "../../components/layouts/SectionDivider/index";
import { fetchHomepage } from "../../redux/slice/homeSlice";
import FeatureProducts from "./FeatureProducts";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomepage());
  }, [dispatch]);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 lg:px-8 lg:py-10">
      <section className="grid grid-cols-1 gap-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        <Banner />
        <aside className="hidden lg:block">
          <CategorySidebar />
        </aside>
      </section>

      <SectionDivider />

      {/* Featured Products */}
      <section className="mt-16 lg:mt-24">
        <FeatureProducts />
      </section>

      <SectionDivider />

      {/* Latest Products */}
      <section className="mt-16 lg:mt-24">{/* <LatestProducts /> */}</section>

      {/* Policy */}
      <section className="mt-20 lg:mt-32">
        <Policy />
      </section>
    </div>
  );
};

export default Home;
