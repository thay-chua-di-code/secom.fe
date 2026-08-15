import {
  CreditCard,
  Lock,
  MapPin,
  Settings,
  User,
  UserRoundCheck,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { userService } from "../../service/userService";
import { getMyInfoThunk } from "../../redux/slice/userSlice";
import { uploadImageToCloudinary } from "../../utils/uploadImgCloud";

import ChangePassword from "./ChangePwd";
import OrderHistory from "./Order";
import AddressList from "./Address/List";
import Follow from "./Follows";

import Button from "../../components/common/Button/Button";

import "./style.scss";

const menus = [
  {
    title: "Profile",
    icon: <User size={18} />,
    key: "profile",
  },
  {
    title: "Order",
    icon: <CreditCard size={18} />,
    key: "order",
  },
  {
    title: "Address",
    icon: <MapPin size={18} />,
    key: "address",
  },
  {
    title: "Change Password",
    icon: <Lock size={18} />,
    key: "password",
  },
  // {
  //   title: "Notification",
  //   icon: <Bell size={18} />,
  //   key: "notification",
  // },
  {
    title: "Follows",
    icon: <UserRoundCheck size={18} />,
    key: "follows",
  },
];

const defaultAvatar =
  "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);

  const [activeMenu, setActiveMenu] = useState("profile");

  const [loading, setLoading] = useState(false);

  const [previewAvatar, setPreviewAvatar] = useState(defaultAvatar);

  const [editProfile, setEditProfile] = useState({
    fullName: "",
    phoneNumber: "",
    avatarFile: null,
    avatarUrl: "",
  });

  useEffect(() => {
    if (!userInfo) return;

    setEditProfile({
      fullName: userInfo.fullName || "",
      phoneNumber: userInfo.phoneNumber || "",
      avatarUrl: userInfo.avatarUrl || "",
      avatarFile: null,
    });

    setPreviewAvatar(userInfo.avatarUrl || defaultAvatar);
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadAvatar = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select image file");
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("Avatar size must be less than 1MB");
      return;
    }

    setEditProfile((prev) => ({
      ...prev,
      avatarFile: file,
    }));

    setPreviewAvatar(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    try {
      if (!editProfile.fullName.trim()) {
        toast.error("Full name is required");
        return;
      }

      setLoading(true);

      let avatarUrl = editProfile.avatarUrl;

      if (editProfile.avatarFile) {
        avatarUrl = await uploadImageToCloudinary(editProfile.avatarFile);
      }

      const payload = {
        fullName: editProfile.fullName,
        phoneNumber: editProfile.phoneNumber,
        avatarUrl,
      };

      await userService.updateProfile(payload, dispatch);

      await dispatch(getMyInfoThunk());

      setPreviewAvatar(avatarUrl || defaultAvatar);

      setEditProfile((prev) => ({
        ...prev,
        avatarFile: null,
        avatarUrl,
      }));

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);

      toast.error("Update profile failed");
    } finally {
      setLoading(false);
    }
  };

  const getActiveMenuTitle = () =>
    menus.find((item) => item.key === activeMenu)?.title || "";

  const renderProfile = () => (
    <div className="profile-card">
      <div className="profile-card__header">
        <div className="profile-card__heading">
          <span className="profile-tag">PERSONAL INFORMATION</span>

          <h2>My Profile</h2>

          <p>
            Update your personal information and manage your account settings.
          </p>
        </div>
      </div>

      <div className="profile-card__body">
        <div className="profile-form">
          {/* LEFT */}
          <div className="profile-form__left">
            <div className="profile-form__section-heading">
              <span>ACCOUNT DETAILS</span>
              <h3>Personal information</h3>
            </div>

            <div className="form-group">
              <label htmlFor="profile-full-name">Full Name</label>

              <input
                id="profile-full-name"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={editProfile.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="profile-email">Email</label>

              <input
                id="profile-email"
                type="text"
                disabled
                value={userInfo?.email || ""}
              />

              <small className="form-group__hint">
                Your email address cannot be changed here.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="profile-phone">Phone Number</label>

              <input
                id="profile-phone"
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={editProfile.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="profile-form__actions">
              <Button
                className="save-btn"
                disabled={loading}
                onClick={handleSaveProfile}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="profile-form__right">
            <span className="profile-form__avatar-label">PROFILE PHOTO</span>

            <div className="avatar-preview">
              <img src={previewAvatar} alt="avatar" />
            </div>

            <h4>{userInfo?.fullName || "Your profile"}</h4>

            <p className="profile-form__avatar-description">
              Upload a clear photo so your account is easier to recognize.
            </p>

            <label className="upload-btn">
              Change Avatar
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleUploadAvatar}
              />
            </label>

            <small>
              JPG, JPEG or PNG
              <br />
              Maximum file size: 1MB
            </small>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return renderProfile();

      case "order":
        return <OrderHistory />;

      case "address":
        return (
          <div className="content-box">
            <AddressList />
          </div>
        );

      case "password":
        return <ChangePassword />;

      case "follows":
        return <Follow />;

      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      <div className="container-custom">
        <div className="profile-layout">
          {/* ========================================
              SIDEBAR
          ======================================== */}

          <aside className="profile-sidebar">
            <div className="profile-sidebar__card">
              <div className="profile-sidebar__cover">
                <span className="profile-sidebar__eyebrow">AIDR ACCOUNT</span>
              </div>

              <div className="profile-sidebar__user">
                <div className="avatar-wrapper">
                  <img
                    src={userInfo?.avatarUrl || defaultAvatar}
                    alt={userInfo?.fullName || "avatar"}
                    className="user-avatar"
                  />
                </div>

                <h3>{userInfo?.fullName || "User"}</h3>

                <p>{userInfo?.email || "AIDR member"}</p>

                <button
                  type="button"
                  className="edit-profile-btn"
                  onClick={() => setActiveMenu("profile")}
                >
                  <Settings size={15} />

                  <span>Edit Profile</span>
                </button>
              </div>

              <div className="profile-sidebar__divider" />

              <div className="profile-sidebar__menu">
                <span className="profile-sidebar__menu-label">ACCOUNT</span>

                {menus.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveMenu(item.key)}
                    className={`menu-item ${
                      activeMenu === item.key ? "active" : ""
                    }`}
                  >
                    <span className="menu-icon">{item.icon}</span>

                    <span className="menu-text">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ========================================
              MAIN
          ======================================== */}

          <main className="profile-main">
            {activeMenu === "profile" ? (
              renderProfile()
            ) : (
              <div className="profile-content-card" key={activeMenu}>
                <div className="profile-content-card__header">
                  <div>
                    <span className="profile-tag">ACCOUNT SETTINGS</span>

                    <h2>{getActiveMenuTitle()}</h2>

                    <p>Manage your account preferences and information.</p>
                  </div>
                </div>

                <div className="profile-content-card__body">
                  {renderContent()}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
