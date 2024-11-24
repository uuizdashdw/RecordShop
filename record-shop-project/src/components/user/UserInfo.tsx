import React, {
	useEffect,
	useState,
	useRef,
	SetStateAction,
	ChangeEvent,
} from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../pages/api';

// Type
import { UserInfoButtonProps, UserAccountInfoProps } from '../../types';
interface UserInfoProps {
	setUser: (user: any) => void;
}

// Components
import dynamic from 'next/dynamic';
import { AppDispatch } from '../../store';

const DynamicUserCheck = dynamic(() => import('./UserCheck'));
const DynamicUserAccountInfo = dynamic<UserAccountInfoProps>(
	() => import('./UserAccountInfo'),
);
const DynamicUserInfoButton = dynamic<UserInfoButtonProps>(
	() => import('../buttons/UserInfoButton'),
);

const UserInfo = React.memo(function UserInfo({ setUser }: UserInfoProps) {
	const [formData, setFormData] = useState({
		userAccount: '',
		userPassword: '',
	});
	const [isDisabled, setIsDisabled] = useState(true);

	const dispatch = useDispatch<AppDispatch>();
	const { userInfo, error } = useSelector((state: any) => state.users);

	const onChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const onSubmitFormData = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(fetchUser(formData.userAccount));
	};

	const onEnterSubmitFormData = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			onSubmitFormData(e as unknown as React.MouseEvent<HTMLButtonElement>);
		}
	};

	useEffect(() => {
		const { userAccount, userPassword } = formData;
		if (userAccount && userPassword) setIsDisabled(false);
	}, [formData]);

	if (error) return <div style={{ color: 'red' }}>{error}</div>;

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
