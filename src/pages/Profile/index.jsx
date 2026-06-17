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
    title: "Thông Báo",
    icon: <Bell size={18} />,
    key: "notification",
  },
  {
    title: "Voucher",
    icon: <Ticket size={18} />,
    key: "voucher",
  },
  {
    title: "Xu",
    icon: <Coins size={18} />,
    key: "coin",
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
      console.log(error);

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

      case "voucher":
        return (
          <div className="content-box">
            <h2>My Vouchers</h2>
          </div>
        );

      case "coin":
        return (
          <div className="content-box">
            <h2>My Coins</h2>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="profile-page min-h-screen py-8 mt-4">
      <div className="container-custom">
        <div className="profile-wrapper">
          <div className="sidebar">
            <div className="sidebar-user">
              <img
                src={userInfo?.avatarUrl || defaultAvatar}
                alt="avatar"
                className="user-avatar"
              />

              <div>
                <h3>{userInfo?.fullName}</h3>

                <span>
                  <Settings size={14} />
                  Edit Profile
                </span>
              </div>
            </div>

            <div className="sidebar-menu">
              {menus.map((item) => (
                <button
                  key={item.key}
                  className={`menu-item ${
                    activeMenu === item.key ? "active" : ""
                  }`}
                  onClick={() => setActiveMenu(item.key)}
                >
                  {item.icon}

                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="main-content">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
