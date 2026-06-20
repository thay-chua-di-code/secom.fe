const products = [
  {
    id: 1,
    name: "Nike Air Force",
    stock: 20,
    price: "$120",
  },
  {
    id: 2,
    name: "Jordan 1",
    stock: 15,
    price: "$180",
  },
];

const Products = () => {
  return (
    <div>
      <div className="page-header">
        <h1>Product Management</h1>

        <button>Add Product</button>
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
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.stock}</td>
                <td>{item.price}</td>

                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
