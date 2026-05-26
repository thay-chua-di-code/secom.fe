import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.scss";
import Button from "../../../components/common/Button/Button";
import { authService } from "../../../service/authService";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const handleResend = () => {};

  const handleBackLogin = async () => {
    const result = await authService.verify_account({
      email: email,
      token: token,
    });
    console.log(result.data.success);
    if (result.data.success) {
      navigate("/login");
    }
  };
  return (
    <div className="verify-page">
      <div className="verify-container flex-row-g">
        {/* LEFT DECOR (hidden on mobile via Tailwind) */}
        <div className="verify-left hidden md:flex">
          <div className="blob" />
          <h2>Verify Your Account</h2>
          <p>
            We’ve sent a verification link to your email. Please check your
            inbox to activate your SECOM account.
          </p>
        </div>

        {/* RIGHT CONTENT */}
        <div className="verify-right w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10">
          <div className="icon">📩</div>

          <h1 className="title">Email Verification</h1>

          <p className="subtitle">
            We sent a link to
            <span>{email}</span>
          </p>

          <Button className="btn-primary w-full max-w-[280px]">
            Resend Email
          </Button>

          <Button
            className="btn-outline w-full max-w-[280px]"
            onClick={handleBackLogin}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
