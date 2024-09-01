import { db } from '../../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			const productsSnapshot = await getDocs(collection(db, 'products'));
			const productList = productsSnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			}));
			res.status(200).json(productList); // 제품 리스트 반환
		} catch (error) {
			res.status(500).json({ error: '데이터를 가져오는 데 실패했습니다.' });
		}
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).end(`Method ${req.method} Not Allowed`); // 허용되지 않는 메서드 처리
	}
}
