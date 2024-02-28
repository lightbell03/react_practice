const LoginPage = () => {

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    alert('login');
  }

  return (
    <div style={{ width: 200 }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <label>아이디</label>
          <input type="text" />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" />
        </div>
        <button type="submit" onClick={handleLogin}>로그인</button>
      </form>
    </div>
  )
}

export default LoginPage;