import { useDispatch } from "react-redux";
import { authenticate } from "../store";
import { useState } from "react";

const Login_Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (ev) => {
    ev.target.name === "email"
      ? setEmail(ev.target.value)
      : setPassword(ev.target.value);
  };

  const dispatch = useDispatch();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      dispatch(authenticate(email, password));
      location.hash = "#/home";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>

      <input
        placeholder="email"
        value={email}
        onChange={onChange}
        name="email"
      />

      <input
        placeholder="password"
        value={password}
        onChange={onChange}
        name="password"
      />

      <button>Login</button>
    </form>
  );
};

export default Login_Page;
