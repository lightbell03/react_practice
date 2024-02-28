import { useState } from "react";
import { postLogin, postSignUp } from "../../http/api";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await postSignUp({ userId, password });

    if (res.status === 200) {
      navigate('/login');
    }
  }

  return (
    <div>
      <form>
        <div>
          <label>아이디</label>
          <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)} />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={handleSignUp}>회원가입</button>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage;