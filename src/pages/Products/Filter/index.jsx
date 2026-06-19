import "./style.scss";

export default function Filter() {
  return (
    <div className="filter">
      <h3>Categories</h3>

      <ul>
        <li>
          <input type="checkbox" />
          Laptop
        </li>

        <li>
          <input type="checkbox" />
          Keyboard
        </li>

        <li>
          <input type="checkbox" />
          Mouse
        </li>

        <li>
          <input type="checkbox" />
          Headphone
        </li>
      </ul>

      <h3>Price Range</h3>

      <div className="price-range">
        <input type="number" placeholder="Min" />
        <input type="number" placeholder="Max" />
      </div>
    </div>
  );
}
