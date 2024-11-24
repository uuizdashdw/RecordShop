import React, { SetStateAction } from 'react';

interface UserPersnolType {
	userName: string;
	userGender: string;
	userPhoneNumber: string;
	zonecode: string;
	userAddress: string;
	userDetailAddress: string;
}

interface UserType extends UserPersnolType {
	id: number;
	userAccount: string;
	userPassword: string;
	createdDate: string;
}

interface UserInfoButtonProps {
	type: string;
	setPasswordChange?: React.Dispatch<SetStateAction<boolean>>;
	setPersonalInfoChange?: React.Dispatch<SetStateAction<boolean>>;
}

interface UserAccountInfoProps {
	userInfo: UserType;
	DynamicUserInfoButton: React.ComponentType<UserInfoButtonProps>;
	setUser: (user: any) => void;
}

export type {
	UserType,
	UserPersnolType,
	UserInfoButtonProps,
	UserAccountInfoProps,
};
