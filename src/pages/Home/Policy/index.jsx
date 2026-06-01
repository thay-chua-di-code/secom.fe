import React from "react";
import "./style.scss";
// Image
import service1 from "../../../assets/images/policyIcon/Services1.png";
import service2 from "../../../assets/images/policyIcon/Services2.png";
import service3 from "../../../assets/images/policyIcon/Services3.png";
const Policy = () => {
  return (
    <div className="policy-container">
      <div className="policy-main-content flex-row-center-g">
        <div className="policy-card flex-col-g">
          <img src={service1} alt="Service 1" />
          <div className="policy-card-text">
            <h3>FREE AND FAST DELIVERY</h3>
            <p>Free delivery for all orders over $140</p>
          </div>
        </div>
        <div className="policy-card">
          <img src={service2} alt="Service 2" />
          <div className="policy-card-text">
            <h3>24/7 CUSTOMER SERVICE</h3>
            <p>Friendly 24/7 customer support</p>
          </div>
        </div>
        <div className="policy-card">
          <img src={service3} alt="Service 3" />
          <div className="policy-card-text">
            <h3>MONEY BACK GUARANTEE</h3>
            <p>We return money within 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
