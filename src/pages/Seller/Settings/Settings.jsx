import BankingSeller from "./Banking";
import SellerProfileSettings from "./Profile";
import "./style.scss";

const Settings = () => {
  return (
    <div className="setting-container">
      <SellerProfileSettings />
      <BankingSeller />
    </div>
  );
};

export default Settings;
