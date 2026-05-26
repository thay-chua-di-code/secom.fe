import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/slice/categorySlice";
import CategorySidebarSkeleton from "./Skeleton";

export default function CategorySidebar() {
  const dispatch = useDispatch();

  const { categories = [], loading } = useSelector((state) => state.categories);

  useEffect(() => {
    if (!categories?.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  if (loading) return <CategorySidebarSkeleton />;

  return (
    <div className="category-sidebar hidden lg:block">
      <div className="category-sidebar__wrapper">
        <h2 className="category-sidebar__title">Categories</h2>

        <div className="category-sidebar__list">
          {(categories || []).map((category) => (
            <button key={category.id} className="category-sidebar__item">
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
