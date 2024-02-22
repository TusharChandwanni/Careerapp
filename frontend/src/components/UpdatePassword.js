import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";
import { useNavigate } from "react-router-dom";


const UpdatePassword = ({ history }) => {
  let navigate=useNavigate();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldpassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldpassword", oldpassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error,isUpdated]);

  return (
          <div>
            <div >
              <h2 >Update Profile</h2>

              <form onSubmit={updatePasswordSubmit}
              >
                <div >
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldpassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div >
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
  );
};

export default UpdatePassword;
