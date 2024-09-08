import React, { useEffect, useState, useRef } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/pages/api";

// Components
import dynamic from "next/dynamic";
const DynamicUserCheck = dynamic(() => import("./UserCheck"));
const DynamicUserAccountInfo = dynamic(() => import("./UserAccountInfo"));
const DynamicUserInfoButton = dynamic(
  () => import("../buttons/UserInfoButton")
);

const UserInfo = React.memo(function UserInfo({ setUser }) {
  const [formData, setFormData] = useState({
    userAccount: "",
    userPassword: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();
  const { userInfo, error } = useSelector((state) => state.users);

  const onChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitFormData = (e) => {
    e.preventDefault();
    dispatch(fetchUser(formData.userAccount));
  };

  const onEnterSubmitFormData = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmitFormData(e);
    }
  };

  useEffect(() => {
    const { userAccount, userPassword } = formData;
    if (userAccount && userPassword) setIsDisabled(false);
  }, [formData]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      {!userInfo && (
        <DynamicUserCheck
          isDisabled={isDisabled}
          formData={formData}
          onChangeFormData={onChangeFormData}
          onSubmitFormData={onSubmitFormData}
          onEnterSubmitFormData={onEnterSubmitFormData}
        />
      )}

      {userInfo && (
        <DynamicUserAccountInfo
          userInfo={userInfo}
          DynamicUserInfoButton={DynamicUserInfoButton}
          setUser={setUser}
        />
      )}
    </>
  );
});

export default UserInfo;
