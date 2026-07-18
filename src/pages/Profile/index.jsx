import {
  Bell,
  ClipboardList,
  Coins,
  CreditCard,
  Lock,
  MapPin,
  Settings,
  Ticket,
  User,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../service/userService";
import { getMyInfoThunk } from "../../redux/slice/userSlice";
import { uploadImageToCloudinary } from "../../utils/uploadImgCloud";
import toast from "react-hot-toast";
import ChangePassword from "./ChangePwd";
import OrderHistory from "./Order";
import Button from "../../components/common/Button/Button";
import "./style.scss";
import AddressList from "./Address/List";
import VoucherList from "./Voucher";
import NotificationList from "./Notification";
import Follow from "./Follows";

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
  {
    title: "Notification",
    icon: <Bell size={18} />,
    key: "notification",
  },
  {
    title: "Voucher",
    icon: <Ticket size={18} />,
    key: "voucher",
  },
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
    if (userInfo) {
      setEditProfile({
        fullName: userInfo.fullName || "",
        phoneNumber: userInfo.phoneNumber || "",
        avatarUrl: userInfo.avatarUrl || "",
        avatarFile: null,
      });

      setPreviewAvatar(userInfo.avatarUrl || defaultAvatar);
    }
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
      toast.warn("Please select image file");

      return;
    }

    if (file.size > 1024 * 1024) {
      toast.warn("Avatar size must be less than 1MB");

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
        toast.warn("Full name is required");

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

      setPreviewAvatar(avatarUrl);

      setEditProfile((prev) => ({
        ...prev,
        avatarFile: null,
        avatarUrl,
      }));

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Update profile failed");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return (
          <div className="profile-content">
            <div className="content-header">
              <h2>My Profile</h2>

              <p>Manage your profile information to secure your account.</p>
            </div>

            <div className="profile-form">
              <div className="form-left">
                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={editProfile.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>

                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={editProfile.phoneNumber}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  className="save-btn"
                  onClick={handleSaveProfile}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>

              <div className="form-right">
                <img src={previewAvatar} alt="avatar" className="user-avatar" />

                <label className="upload-btn">
                  Choose Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleUploadAvatar}
                  />
                </label>

                <span>Maximum file size: 1 MB</span>

                <span>Format: .JPEG, .PNG</span>
              </div>
            </div>
          </div>
        );

      case "order":
        return <OrderHistory />;

      case "address":
        return (
          <div className="content-box">
            <h2>Addresses</h2>
            <AddressList />
          </div>
        );

      case "password":
        return <ChangePassword />;

      case "notification":
        return <NotificationList />;

      case "voucher":
        return <VoucherList />;

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
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-sidebar__card">
              <div className="profile-sidebar__cover" />

              <div className="profile-sidebar__user">
                <div className="avatar-wrapper">
                  <img
                    src={userInfo?.avatarUrl || defaultAvatar}
                    alt="avatar"
                    className="user-avatar"
                  />
                </div>

                <h3>{userInfo?.fullName || "User"}</h3>

                <p>{userInfo?.email}</p>

                <button
                  className="edit-profile-btn"
                  onClick={() => setActiveMenu("profile")}
                >
                  <Settings size={16} />
                  Edit Profile
                </button>
              </div>

              <div className="profile-sidebar__divider" />

              <div className="profile-sidebar__menu">
                {menus.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveMenu(item.key)}
                    className={`menu-item ${
                      activeMenu === item.key ? "active" : ""
                    }`}
                  >
                    <span className="menu-icon">{item.icon}</span>

                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="profile-main">
            {activeMenu === "profile" ? (
              <div className="profile-card">
                <div className="profile-card__header">
                  <div>
                    <span className="profile-tag">Personal Information</span>

                    <h2>My Profile</h2>

                    <p>
                      Update your personal information and manage your account
                      settings.
                    </p>
                  </div>
                </div>

                <div className="profile-card__body">
                  <div className="profile-form">
                    <div className="profile-form__left">
                      <div className="form-group">
                        <label>Full Name</label>

                        <input
                          type="text"
                          name="fullName"
                          placeholder="Enter your full name"
                          value={editProfile.fullName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Email</label>

                        <input
                          type="text"
                          disabled
                          value={userInfo?.email || ""}
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone Number</label>

                        <input
                          type="text"
                          name="phoneNumber"
                          placeholder="Enter your phone number"
                          value={editProfile.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>

                      <Button
                        className="save-btn"
                        disabled={loading}
                        onClick={handleSaveProfile}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>

                    <div className="profile-form__right">
                      <div className="avatar-preview">
                        <img src={previewAvatar} alt="avatar" />
                      </div>

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
                        JPG, PNG, JPEG
                        <br />
                        Maximum size 1MB
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="profile-content-card">
                <div className="profile-content-card__header">
                  <h2>{menus.find((x) => x.key === activeMenu)?.title}</h2>
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
