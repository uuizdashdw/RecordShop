// pages/api/data.js
import { db } from '../../../lib/firebase'; // Firebase 초기화 파일
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const { pathname } = req.query; // 쿼리 매개변수에서 pathname 가져오기

		if (pathname === 'productList') {
			const productsSnapshot = await getDocs(collection(db, 'productList'));
			const productList = productsSnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			res.status(200).json(productList);
		} else if (pathname === 'products') {
			const productsSnapshot = await getDocs(collection(db, 'productList'));
			const products = {};
			productsSnapshot.forEach(doc => {
				const data = doc.data();
				products[data.category] = products[data.category] || [];
				products[data.category].push({ id: doc.id, ...data });
			});
			res.status(200).json(products);
		} else {
			res.status(404).json({ error: 'Not Found' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
