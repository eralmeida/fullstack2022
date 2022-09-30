const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form style={{ marginBottom: 10 }} onSubmit={handleSubmit}>
        <div>
          username <input type="text" value={username} name="Username" onChange={handleUsernameChange}></input>
        </div>
        <div>
          password <input type="password" value={password} name="Password" onChange={handlePasswordChange}></input>
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
