import "./style.scss";

const tabs = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Delivered",
    value: "DELIVERED",
  },
];

export default function OrderTabs({ activeTab, setActiveTab }) {
  return (
    <div className="order-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={activeTab === tab.value ? "active" : ""}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
