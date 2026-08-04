import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Store, Save } from "lucide-react";
import { sellerService } from "../../../../service/sellerService";

const initialForm = {
  shopName: "",
  description: "",
  phoneNumber: "",
  address: "",
  verificationImageUrl: "",
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Unable to update seller profile.";

export default function SellerProfileSettings() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const profile = await sellerService.getShopProfile();
        if (!active) return;
        setForm({
          shopName: profile?.shopName ?? "",
          description: profile?.description ?? "",
          phoneNumber: profile?.phoneNumber ?? "",
          address: profile?.address ?? "",
          verificationImageUrl: profile?.verificationImageUrl ?? "",
        });
      } catch (loadError) {
        if (!active) return;
        setError(getErrorMessage(loadError));
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.shopName.trim()) {
      toast.error("Shop name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      const updatedProfile = await sellerService.updateShopProfile({
        shopName: form.shopName.trim(),
        description: form.description.trim() || null,
        phoneNumber: form.phoneNumber.trim() || null,
        address: form.address.trim() || null,
        verificationImageUrl: form.verificationImageUrl.trim() || null,
      });

      setForm({
        shopName: updatedProfile?.shopName ?? form.shopName.trim(),
        description: updatedProfile?.description ?? "",
        phoneNumber: updatedProfile?.phoneNumber ?? "",
        address: updatedProfile?.address ?? "",
        verificationImageUrl: updatedProfile?.verificationImageUrl ?? "",
      });
      toast.success("Seller profile updated.");
    } catch (submitError) {
      const message = getErrorMessage(submitError);
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="settings-card seller-profile-settings">
      <div className="settings-card__header">
        <div>
          <h2>
            <Store size={22} />
            Shop Profile
          </h2>
          <p>Update the public information shown for your seller shop.</p>
        </div>
      </div>

      {loading ? (
        <div className="settings-state">Loading seller profile...</div>
      ) : error && !form.shopName ? (
        <div className="settings-state settings-state--error">{error}</div>
      ) : (
        <form className="settings-form" onSubmit={handleSubmit}>
          {error && <div className="settings-state settings-state--error">{error}</div>}

          <label>
            <span>Shop name</span>
            <input name="shopName" value={form.shopName} onChange={handleChange} maxLength={255} required />
          </label>

          <label>
            <span>Description</span>
            <textarea name="description" value={form.description} onChange={handleChange} maxLength={1000} rows={4} />
          </label>

          <label>
            <span>Phone number</span>
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} maxLength={20} />
          </label>

          <label>
            <span>Address</span>
            <input name="address" value={form.address} onChange={handleChange} maxLength={500} />
          </label>

          <label>
            <span>Verification image URL</span>
            <input name="verificationImageUrl" value={form.verificationImageUrl} onChange={handleChange} placeholder="https://..." />
          </label>

          <button type="submit" disabled={saving}>
            <Save size={18} />
            {saving ? "Saving..." : "Save profile"}
          </button>
        </form>
      )}
    </section>
  );
}
