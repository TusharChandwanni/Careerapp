import React, {  useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = ({ match }) => {
  const dispatch = useDispatch();
let navigate=useNavigate();
const {token}=useParams(); 

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {

    if (success) {

      navigate("/login");
    }
  }, [dispatch, error, alert, success]);

  return (
          <div >
            <div>
              <h2 >Update Profile</h2>

              <form onSubmit={resetPasswordSubmit}
              >
                <div>
                
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                 
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
  )
};

export default ResetPassword;
