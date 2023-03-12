import { post } from "../common";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";

const Login = () => {
  const toast = useRef(null);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const clearForm = (message) => {
    setUser("");
    setPassword("");
    setErrorUser(false);
    setErrorPassword(false);
    showToast("success", "Success", message);
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000,
    });
  };

  const validateUserInput = () => {
    if (user === null || user === "") {
      return false;
    }
    return true;
  };

  const validatePasswordInput = () => {
    if (password === null || password === "") {
      return false;
    }
    return true;
  };

  const login = async () => {
    try {
      setErrorUser(false);
      setErrorPassword(false);
      if (validateUserInput() && validatePasswordInput()) {
        let data = {
          username: user,
          password: password,
        };
        let response = await post("api-user-login/", data);
        response = JSON.stringify(response);
        if (response.status !== 200) {
          showToast("error", "Error", "Error login in the platform");
        } else {
          clearForm("The login has been sent successfully");
        }
      } else {
        if (!validateUserInput()) {
          setErrorUser(true);
          showToast("error", "Error", "The user input have error");
        }
        if (!validatePasswordInput()) {
          setErrorPassword(true);
          showToast(
            "error",
            "Error",
            "The password input have error"
          );
        }
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Error", "Error login in the system");
    }
  };

  let classErrorUser = errorUser ? "p-invalid mr-2" : "";
  let classErrorPassword = errorPassword ? "p-invalid mr-2" : "";

  return (
    <>
      <Toast ref={toast} />
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <h2>Login in the system </h2>
        </div>
        <div className="col-sm-4"></div>
      </div>

      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-8">
          <Panel header="Login form">
            <div className="mb-3">
              Username:
              <br />
              <span className="p-input-icon-left">
                <InputText
                  required
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="user to login"
                  className={classErrorUser}
                  tooltip="User to login"
                />
              </span>
              {errorUser && (
                <Message severity="error" text="Error in the user" />
              )}
            </div>
            <div className="mb-3">
              Password:
              <br />
              <span className="p-input-icon-left">
                <InputText
                  required
                  value={password}
                  placeholder="password"
                  tooltip="Password for login"
                  className={classErrorPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>
              {errorPassword && (
                <Message severity="error" text="Error in the password" />
              )}
            </div>
            <div className="flex flex-wrap align-items-center justify-content-left">
              <Button label="Send" icon="pi pi-check" onClick={login} />
            </div>
          </Panel>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
