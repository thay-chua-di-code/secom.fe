import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerProducts } from "../../../redux/slice/seller/product/thunk";
import Button from "../../../components/common/Button/Button";
import AddProductModal from "./FormAdd";
const Products = () => {
  const dispatch = useDispatch();
  const [openAdd, setOpenAdd] = useState(false);
  const { products, loading, error } = useSelector(
    (state) => state.sellerProduct,
  );

  useEffect(() => {
    dispatch(
      fetchSellerProducts({
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, [dispatch]);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div>
      <div className="page-header">
        <h1>Product Management</h1>
        <Button onClick={() => setOpenAdd(true)}>Add Product</Button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((item) => (
              <tr key={item.productId}>
                <td>{item.name}</td>
                <td>{item.stock}</td>
                <td>${item.price}</td>

                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}

            {products?.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openAdd && (
        <AddProductModal open={openAdd} onClose={() => setOpenAdd(false)} />
      )}
    </div>
  );
};

export default Products;
