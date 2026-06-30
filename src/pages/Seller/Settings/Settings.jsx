import BankingSeller from "./Banking";
import "./style.scss";

const Settings = () => {
  return (
    <div className="setting-container">
      <h1>Store Settings</h1>

      <form className="settings-form">
        <input type="text" placeholder="Store Name" />

        <textarea placeholder="Store Description" rows={5} />

        <button>Save Changes</button>
      </form>

      <BankingSeller />
    </div>
  );
};

export default Settings;
