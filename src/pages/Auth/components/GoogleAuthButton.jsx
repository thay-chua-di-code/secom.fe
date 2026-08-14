import { GoogleLogin } from "@react-oauth/google";

export default function GoogleAuthButton({
  onSuccess,
  onError,
  text = "continue_with",
  label = "Continue with Google",
}) {
  return (
    <div className="auth-google">
      <span className="auth-google__label">{label}</span>
      <div className="auth-google__button" role="presentation">
        <GoogleLogin
          width="100%"
          onSuccess={onSuccess}
          onError={onError}
          text={text}
          theme="filled_white"
          size="large"
          shape="rectangular"
          logo_alignment="left"
        />
      </div>
    </div>
  );
}
