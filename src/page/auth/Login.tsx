import { useState } from "react";
import { useMutateLogin } from "../../http/query";
import { getLocalStorage } from "../../utils/storage/localStorage";
import { useNavigate } from "react-router-dom";

const storage = getLocalStorage();

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginQuery = useMutateLogin((data) => {
    storage.set(ACCESS_TOKEN_KEY, data.data.accessToken);
    storage.set(REFRESH_TOKEN_KEY, data.data.refreshToken);
    navigate('/jwt');
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginQuery.mutate({ userId, password });
  }

  return (
    <div style={{ width: 200 }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <label>아이디</label>
          <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)} />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        </div>
        <button type="submit" onClick={handleLogin}>로그인</button>
      </form>
    </div>
  )
}

export default LoginPage;