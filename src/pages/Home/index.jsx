import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../../components/layouts/Banner";
import CategorySidebar from "./CategoriesSideBar";
import Policy from "./Policy";
import SectionDivider from "../../components/layouts/SectionDivider/index";
import { fetchHomepage } from "../../redux/slice/homeSlice";
import FeatureProducts from "./Products/FeatureProducts";
import LastestProduct from "./Products/LatestProducts";
import RecentlyViewed from "./Product-viewed/index";
import CompareModal from "../../components/common/CompareModal";
import useCompare from "../../hooks/useCompare";
import "./style.scss";
const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { featuredProducts, latestProducts } = useSelector((state) => state.home);
  const [openCompare, setOpenCompare] = useState(false);
  const { compareIds, remove, clear } = useCompare();

  useEffect(() => {
    dispatch(fetchHomepage());
  }, [dispatch]);

  const homeProducts = useMemo(() => {
    const products = [...(featuredProducts || []), ...(latestProducts || [])];

    return products.filter(
      (product, index, allProducts) =>
        allProducts.findIndex(
          (item) => String(item.id || item.productId) === String(product.id || product.productId),
        ) === index,
    );
  }, [featuredProducts, latestProducts]);

  const compareProducts = useMemo(
    () =>
      homeProducts.filter((product) =>
        compareIds.includes(String(product.id || product.productId)),
      ),
    [compareIds, homeProducts],
  );

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 lg:px-8 lg:py-10">
      <section className="grid grid-cols-1 gap-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        <Banner />
        <aside className="hidden lg:block">
          <CategorySidebar />
        </aside>
      </section>

      {isAuthenticated && (
        <section className="mt-16 lg:mt-24">
          <SectionDivider />
          <RecentlyViewed />
        </section>
      )}

      <SectionDivider />

      {/* Featured Products */}
      <section className="mt-16 lg:mt-24">
        <FeatureProducts />
      </section>

      <SectionDivider />

      {/* Latest Products */}
      <section className="mt-16 lg:mt-24">
        <LastestProduct />
      </section>

      <SectionDivider />
      {/* Policy */}
      <section className="mt-20 lg:mt-32">
        <Policy />
      </section>

      {compareIds.length > 0 && (
        <button
          type="button"
          className="home-compare-floating-btn"
          onClick={() => setOpenCompare(true)}
        >
          Compare ({compareIds.length})
        </button>
      )}

      <CompareModal
        open={openCompare}
        products={compareProducts}
        onClose={() => setOpenCompare(false)}
        onRemove={remove}
        onClear={clear}
      />
    </div>
  );
};

export default Home;
