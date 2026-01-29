import styled from "styled-components";
import GoogleLoginBtn from "../asset/GoogleLoginBtn.svg";


const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=email profile`; 
  };

  return (
    <Wrapper>
      <LoginBtn src={GoogleLoginBtn} alt="" onClick={handleGoogleLogin} />
    </Wrapper>
  );
};

export default GoogleLogin;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBtn = styled.img`
  cursor: pointer;
`;
