import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';

const HeadModule = React.memo(function HeadModule({ nowPath }) {
	const [metaData, setMetaData] = useState({
		title: '',
		description: '',
		keywords: '',
		imageUrl:
			'https://img.freepik.com/premium-vector/vector-illustration-vinyl-record-black_786040-379.jpg?w=996',
		url: 'wizrecords-uuizdashdws-projects.vercel.app',
	});

	const getMetaDataConfig = useMemo(() => {
		switch (nowPath) {
			case '/':
				return {
					title: 'Wiz Records',
					description: '레코드 전문 판매',
					keywords: '레코드, LP, Music',
				};
			case '/product/korean':
				return {
					title: 'Wiz Records | 한국 음악 레코드',
					description: 'Wiz Records | 한국 음악 레코드 모음',
					keywords: '한국 레코드, 한국 LP, 한국 음악, LP, Korean Records',
				};
			case '/product/hiphop&rnb':
				return {
					title: 'Wiz Records | 힙합 / R&B',
					description: 'Wiz Records | 힙합 / R&B 레코드 모음',
					keywords:
						'힙합 레코드, R&B 레코드, 힙합 LP, R&B LP, 힙합 음악, R&B 음악',
				};
			case '/product/beats&instrumental':
				return {
					title: 'Wiz Records | 비트 / Instrumental',
					description: 'Wiz Records | 비트 / Instrumental 레코드 모음',
					keywords:
						'비트 레코드, Instrumental 레코드, 비트 LP, Instrumental LP, 비트',
				};
			case '/product/jazz':
				return {
					title: 'Wiz Records | 재즈',
					description: 'Wiz Records | 재즈 레코드 모음',
					keywords: '재즈 레코드, 재즈 LP, 재즈 음악, Jazz Records',
				};

			case '/product/nu_disco&modern_funk':
				return {
					title: 'Wiz Records | 뉴 디스코 / 모던 펑크',
					description: 'Wiz Records | 뉴 디스코 / 모던 펑크 레코드 모음',
					keywords:
						'뉴 디스코 레코드, 뉴 디스코 LP, 뉴 디스코 음악, Nu Disco Records, 모던 펑크 레코드, 모던  펑크 LP, 모던 펑크 음악, Modern Funk Records',
				};
			case '/product/soul&funk&disco':
				return {
					title: 'Wiz Records | 소울 / 펑크 / 디스코',
					description: 'Wiz Records | 소울 / 펑크 / 디스코 레코드 모음',
					keywords:
						'소울 레코드, 소울 LP, 소울 음악, Soul Records, 펑크 레코드, 펑크 LP, 펑크 음악, Funk Records, 디스코 레코드, 디스코 LP, 디스코 음악, Disco Records',
				};
			case '/product/rock&pop':
				return {
					title: 'Wiz Records | 락 / 팝',
					description: 'Wiz Records | 락 / 팝 레코드 모음',
					keywords:
						'락 레코드, 락 LP, 락 음악, Rock Records, 팝 레코드, 팝 LP, 팝 음악, Pop Records',
				};
			case '/product/soundtrack':
				return {
					title: 'Wiz Records | 사운드트랙',
					description: 'Wiz Records | 사운드트랙 레코드 모음',
					keywords:
						'사운드트랙 레코드, 사운드트랙 LP, OST, OST LP, OST Records, Soundtrack LP, Soundtrack Records',
				};
			case '/auth/signin':
				return {
					title: 'Wiz Records | 로그인',
					description: 'Wiz Records | 로그인',
					keywords: 'Wiz Records | 로그인',
				};
			case 'auth/signup':
				return {
					title: 'Wiz Records | 회원가입',
					description: 'Wiz Records | 회원가입',
					keywords: 'Wiz Records | 회원가입',
				};
			default:
				return {
					title: 'Wiz Records',
					description: '레코드 전문 판매',
					keywords: '레코드, LP, Music',
				};
		}
	}, [nowPath]);

	useEffect(() => {
		setMetaData(prev => ({
			...prev,
			getMetaDataConfig,
		}));
	}, [getMetaDataConfig]);

	return (
		<>
			<Head>
				<title>{metaData.title}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content={metaData.description} />
				<meta name="keywords" content={metaData.keywords} />
				<meta property="og:title" content={metaData.title} />
				<meta property="og:description" content={metaData.description} />
				<meta property="og:image" content={metaData.imageUrl} />
				<meta property="og:url" content={metaData.url} />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={metaData.title} />
				<meta name="twitter:description" content={metaData.description} />
				<meta name="twitter:image" content={metaData.imageUrl} />
			</Head>
		</>
	);
});

export default HeadModule;
