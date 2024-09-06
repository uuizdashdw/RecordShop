import React from 'react';

// Layout
import MyPageLayout from '@/layouts/MyPageLayout';

// Dynamic
import dynamic from 'next/dynamic';
const DynamicUserInfo = dynamic(() => import('@/components/user/UserInfo'));

const MyPage = React.memo(function MyPage({ setUser }) {
	return (
		<div>
			<h1>마이페이지</h1>
			<DynamicUserInfo setUser={setUser}></DynamicUserInfo>
		</div>
	);
});

MyPage.getLayout = function getLayout(page) {
	return <MyPageLayout>{page}</MyPageLayout>;
};

export default MyPage;
