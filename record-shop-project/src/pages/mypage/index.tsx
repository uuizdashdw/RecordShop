import React, { SetStateAction } from 'react';

// CSS
import styles from './index.module.css';

// Layout
import MyPageLayout from '../../layouts/MyPageLayout';

// Dynamic
import dynamic from 'next/dynamic';
const DynamicUserInfo = dynamic(() => import('../../components/user/UserInfo'));

// Type
import { NextPageWithLayout, UserType } from '../../types';
interface MyPageProps {
	setUser: React.Dispatch<SetStateAction<UserType>>;
}

const MyPage: NextPageWithLayout<MyPageProps> = React.memo(function MyPage({
	setUser,
}: MyPageProps) {
	return (
		<>
			<h1 className={styles.title}>마이페이지</h1>
			<DynamicUserInfo setUser={setUser}></DynamicUserInfo>
		</>
	);
});

MyPage.getLayout = function getLayout(page) {
	return <MyPageLayout>{page}</MyPageLayout>;
};

export default MyPage;
