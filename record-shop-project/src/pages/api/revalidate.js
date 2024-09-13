// // pages/api/revalidate.js
// export default async function handler(req, res) {
// 	const { path } = req.query;
// 	console.log('## 씨발 패쓰 ==>', path);

// 	const validPaths = [
// 		'/', // 메인 페이지
// 		'/product/korean',
// 		'/product/hiphop&rnb',
// 		'/product/beats/instrumental',
// 		'/product/soul&funk&disco',
// 		'/product/nu_disco&modern_funk',
// 		'/product/rock&pop',
// 		'/product/[id]', // 상품 상세 페이지
// 	];

// 	const isValidPath = validPaths.includes(path);
// 	console.log('### 개씨발 트루 아니기만 해봐라 ==> ', isValidPath);

// 	if (!isValidPath) {
// 		console.error('잘못된 패스임 ::', path);
// 		return res.status(400).json({ message: '잘못된 경로입니다.' });
// 	}

// 	try {
// 		await res.revalidate(path);
// 		console.log('Revalidation successful for path:', path);
// 		return res.json({ revalidate: true });
// 	} catch (error) {
// 		console.error('Revalidation Error!', error);
// 		return res.status(500).send('Revalidate Failed');
// 	}
// }
