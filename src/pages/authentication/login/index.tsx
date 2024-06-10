import CommonLogo from "@/components/Others/authentication/common/CommonLogo";
import { Col, Container, Row } from "reactstrap";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import {
  EmailAddress,
  EnterEmailPasswordLogin,
  Password,
  RememberPassword,
  SignIn,
  SignInAccount,
} from "utils/Constant";
import { postLogin } from "../../../../helper/api/login";
import { UserContext } from "../../../../helper/User";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Login = () => {
  const { login } = useContext(UserContext);
  const router = useRouter();

  const [showPassWord, setShowPassWord] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "maxrd",
    password: "Riden",
  });
  const [error, setError] = useState("");

  const { username, password } = formValues;
  const [loading, setLoading] = useState(true);

  const handleUserValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  const formSubmitHandle = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    postLogin({ username, password }).then((response) => {
      const userData = response?.data?.user;
      const token = response?.data?.token;
      setLoading(false);

      if (response.status === "error") {
        setError(response.message);
      }
      if (response.status === "success") {
        Cookies.set("token", token);

        router.push("/dashboard/home");
        toast.success("Sesión iniciada correctamente");
        login(userData, token);
      }
    });
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs={12} className="p-0">
          <div className="login-card login-dark">
            <div>
              <div>
                <CommonLogo />
              </div>
              <div className="login-main">
                <form className="theme-form" onSubmit={formSubmitHandle}>
                  <h4>{SignInAccount}</h4>
                  <p>{EnterEmailPasswordLogin}</p>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      required
                      placeholder="Test12"
                      value={username}
                      name="username"
                      onChange={handleUserValue}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <div className="form-input position-relative">
                      <Input
                        type={showPassWord ? "text" : "password"}
                        placeholder="*********"
                        onChange={handleUserValue}
                        value={password}
                        name="password"
                      />
                      <div className="show-hide">
                        <span
                          onClick={() => setShowPassWord(!showPassWord)}
                          className={!showPassWord ? "show" : ""}
                        />
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-0 form-group">
                    <div className="checkbox p-0">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" htmlFor="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <div className="text-end mt-3">
                      <Button
                        color="primary"
                        className="btn-block w-100"
                        type="submit"
                      >
                        {SignIn}
                      </Button>
                    </div>
                  </FormGroup>
                </form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
