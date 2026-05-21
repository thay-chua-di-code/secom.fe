import { Eye, EyeOff, Lock, Mail, User2, X } from "lucide-react";

import { useState } from "react";

export default function AuthModal({ open, type, onClose, onSwitchType }) {
  const [showPassword, setShowPassword] = useState(false);

  return <h1>Hello, World!</h1>;
}
