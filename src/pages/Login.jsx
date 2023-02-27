const Login = () => {
    return (
        <div className="loginForm">
        <form>
          <h1>Увійти</h1>

          <div className="loginFields">
            <img src="/img/img1.png" alt="img" />
            <div className="loginInputs">
              <input type="text" name="login" placeholder="Username" />
              <input type="password" name="password" placeholder="Password" />
            </div>
          </div>
          <button>Увійти</button>
        </form>
      </div>
    )
}

export default Login;