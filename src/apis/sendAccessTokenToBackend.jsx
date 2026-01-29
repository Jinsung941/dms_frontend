import axios from "axios";

const sendAccessTokenToBackend = async (code) => {
  try {

    console.log(code);

    const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/auth/google`,
      { code }
    );

    console.log({code});
    console.log("Login successful with server response:", response);

    // 토큰 저장 (백엔드가 token을 반환하는 경우)
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      console.log("토큰 저장 완료!");
    }
    console.log(response.data.token);

    // memberId 저장 (백엔드가 memberId를 반환하는 경우)
    if (response.data.memberId) {
      localStorage.setItem("memberId", response.data.memberId);
      console.log("memberId 저장 완료!");
    }

    // 사용자 정보 저장 (선택사항)
    if (response.data.user) {
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      console.log("사용자 정보 저장 완료!");
    }
    

    return response.data;


  } catch (error) {
    console.error("Login failed with error:", error);
    throw error;
  }
};

export default sendAccessTokenToBackend;
