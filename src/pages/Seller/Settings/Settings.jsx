const Settings = () => {
  return (
    <div>
      <h1>Store Settings</h1>

      <form className="settings-form">
        <input type="text" placeholder="Store Name" />

        <textarea placeholder="Store Description" rows={5} />

        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
