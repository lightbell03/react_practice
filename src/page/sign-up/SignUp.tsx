import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutationSignUp } from "../../http/query";

const SignUpPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUpQuery = useMutationSignUp(() => {
    navigate('/login');
  })

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    signUpQuery.mutate({ userId, password });
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