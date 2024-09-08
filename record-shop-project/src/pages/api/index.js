// Firebase
import { db, auth } from '../../../lib/firebase';
import {
	collection,
	getDocs,
	getDoc,
	doc,
	addDoc,
	getFirestore,
	query,
	where,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore';

// Axios
import axios from 'axios';

// Redux Toolkit 비동기화
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUser } from 'firebase/auth';

const instance = axios.create({
	baseURL: 'http://localhost:3000/api',
});

// 전체 상품 조회 함수
const fetchAllProducts = async () => {
	let products = [];
	try {
		const productsCollection = collection(db, 'products');
		const productsSnapshot = await getDocs(productsCollection);
		products = productsSnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}));
	} catch (reason) {
		console.error('데이터를 가져오는 데 실패했습니다.', reason);
	}

	if (!products) products = [];
	return products;
};

// 각 상품 상세 페이지 조회 함수
const fetchProductDetails = async params => {
	const { category, productId } = params;

	try {
		const productDocRef = doc(db, 'products', category);
		const productDoc = await getDoc(productDocRef);

		// 문서 존재 확인
		if (!productDoc.exists()) {
			console.log('카테고리 문서가 존재하지 않습니다.');
		}

		const data = productDoc.data();

		const product = data.products.find(p => Number(p.id) === Number(productId));
		console.log('### 상품 확인 ### ==> ', product);

		return product ? product : { notFound: true };
	} catch (reason) {
		console.error('데이터를 가져오는 데 실패했습니다.', reason);
		return { notFound: true };
	}
};

// 특정 카테고리 상품 조회 함수 모듈
const fetchCategoryIdProducts = async categoryId => {
	let categoryProducts = [];
	try {
		const productDocRef = doc(db, 'products', categoryId);
		const productDoc = await getDoc(productDocRef);

		if (productDoc.exists()) {
			const data = productDoc.data();
			if (data.products) categoryProducts = data.products;
		}
	} catch (reason) {
		console.error('데이터를 가져오는데 실패 했습니다.', reason);
	}

	return categoryProducts;
};

// 상품 검색 함수
const fetchProductsByName = async searchTerm => {
	let filteredProducts = [];

	try {
		const productsCollection = collection(db, 'products');
		const querySnapshot = await getDocs(productsCollection);

		// 모든 문서에서 데이터 가져오기
		querySnapshot.forEach(doc => {
			const data = doc.data();
			if (data.products) {
				data.products.forEach(product => {
					if (
						product.name &&
						product.name.toLowerCase().includes(searchTerm.toLowerCase())
					) {
						filteredProducts.push(product);
					}
				});
			}
		});
	} catch (reason) {
		console.error('데이터를 가져오는 데 실패했습니다.', reason);
	}

	return filteredProducts;
};

// 한국 상품 조회 함수
const fetchKoreanProducts = async () => {
	return await fetchCategoryIdProducts('korean');
};

// 힙합 , 알앤비 상품 조회 함수
const fetchHiphopRnbProducts = async () => {
	return await fetchCategoryIdProducts('hiphop&rnb');
};

// 비트, 인스트루멘탈 상품 조회 함수
const fetchBeatsAndInstrumentalProdcuts = async () => {
	return await fetchCategoryIdProducts('beats&instrumental');
};

// 재즈 상품 조회 함수
const fetchJazzProducts = async () => {
	return await fetchCategoryIdProducts('jazz');
};

// 뉴 디스코, 모던 펑크 상품 조회 함수
const fetchNuDiscoModernFunkProducts = async () => {
	return await fetchCategoryIdProducts('nu_disco&modern_funk');
};

// 소울, 펑크, 디스코 상품 조회 함수
const fetchSoulFunkDiscoProducts = async () => {
	return fetchCategoryIdProducts('soul&funk&disco');
};

// 락, 팝 상품 조회 함수
const fetchRockPopProducts = async () => {
	return await fetchCategoryIdProducts('rock&pop');
};

// 사운드트랙 상품 조회 함수
const fetchSoundtrackProducts = async () => {
	return await fetchCategoryIdProducts('soundtrack');
};

// 회원가입 시 user ID 필드 값 증가 함수
export const incrementUserId = async () => {
	const userCollection = collection(db, 'users');
	const userSnapshot = await getDocs(userCollection);

	// 유저 ID 가 가장 높은 값 찾기
	let maxUserId = 0;
	userSnapshot.forEach(doc => {
		const userData = doc.data();
		if (Number(userData.id) > maxUserId) maxUserId = Number(userData.id);
	});

	return maxUserId + 1;
};

// 회원가입 함수
const fetchUserSignUp = createAsyncThunk(
	'user/signup',
	async (userData, { rejectWithValue }) => {
		try {
			const userId = await incrementUserId();
			const userWithId = { ...userData, id: userId };
			await addDoc(collection(db, 'users'), userWithId);

			return userWithId; // 가입된 유저 정보를 반환
		} catch (error) {
			console.error('회원가입이 실패하였습니다.', error);
			return rejectWithValue(error.message); // 에러 메시지 반환
		}
	},
);

// 회원탈퇴 함수
const fetchDeleteUserAccount = createAsyncThunk(
	'user/deleteAccount',
	async (_, { rejectWithValue }) => {
		const user = auth.currentUser;
		if (user) {
			try {
				await deleteUser(user);
				return user.uid;
			} catch (reason) {
				return rejectWithValue(reason.message);
			}
		} else {
			return rejectWithValue('로그인된 사용자가 없습니다.');
		}
	},
);

// 로그인 함수
const fetchUserLogin = async (userAccount, password) => {
	const db = getFirestore();
	try {
		// users 컬렉션에서 userAccount 에 해당하는 사용자 찾기
		const q = query(
			collection(db, 'users'),
			where('userAccount', '==', userAccount),
		);
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			console.error('사용자를 찾을 수 없습니다.');
			return null;
		}

		// 사용자 데이터 가져오기
		const userData = querySnapshot.docs[0].data();

		// 비밀번호 확인
		if (userData.userPassword === password) {
			return userData;
		} else {
			console.error('비밀번호가 일치하지 않습니다');
			return null;
		}
	} catch (reason) {
		console.error('로그인 중 오류 발생 :: ', reason);
		throw reason;
	}
};

// 전체 회원 정보 가져오기 함수
const fetchGetUserList = () => {
	return instance.get('/users');
};

// 로그인 회원 정보 가져오기 함수 1
const fetchUserByAccount = async userAccount => {
	try {
		const usersRef = collection(db, 'users');
		const q = query(usersRef, where('userAccount', '==', userAccount));
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			throw new Error('사용자 정보를 찾을 수 없습니다.');
		}

		let userData;
		querySnapshot.forEach(doc => {
			userData = { id: doc.data().id, ...doc.data() };
		});

		return userData;
	} catch (reason) {
		throw new Error('정보를 가져오는 데 실패했습니다.', reason);
	}
};

// 로그인 회원 정보 가져오기 함수 2
const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (userAccount, { rejectWithValue }) => {
		try {
			const userInfo = await fetchUserByAccount(userAccount);

			return userInfo;
		} catch (reason) {
			return rejectWithValue(reason.message);
		}
	},
);

// 비밀번호 변경 함수
const updateUserPassword = createAsyncThunk(
	'user/updatePasword',
	async({ userAccount, newPassword }, { rejectWithValue }) => {
		try {
			const usersRef = collection(db, 'users');
			const q = query(usersRef, where('userAccount', '==', userAccount));
			const querySnapshot = await getDocs(q);

			if(!querySnapshot.empty) {
				const doc = querySnapshot.docs[0];
				await updateDoc(doc.ref, {
					userPassword: newPassword,
				})
				
				const updatedUserData = {
					...doc.data(),
				}
		
				return updatedUserData;
			
				
			} else {
				throw new Error('해당 사용자가 존재하지 않습니다.');
			}
		} catch (reason) {
			console.error('오류 발생', reason);
			return rejectWithValue('비밀번호 변경 중 오류가 발생했습니다! :: ' + reason.message)
		}
	}
);

// 유저 개인정보 변경 함수
const updateUserPersonalInfo = createAsyncThunk(
	'user/updateUserInfo',
	async({ userAccount, userInfo }, { rejectWithValue }) => {
		try {
			
			const userRef = collection(db, 'users');
			const q = query(userRef, where('userAccount', '==', userAccount));
			const querySnapshot = await getDocs(q);

			if(querySnapshot.empty) {
				throw new Error('사용자를 찾을 수 없습니다.');
			}

			const docId = querySnapshot.docs[0].id;
			const userDocRef = doc(db, 'users', docId);
			await updateDoc(userDocRef, userInfo);

			return userInfo;
		} catch(reason) {
			console.error('개인정보 변경 중 에러 발생.', reason);
			return rejectWithValue(reason.message);
		}
	}
)

export {
	fetchAllProducts,
	fetchProductDetails,
	fetchProductsByName,
	fetchKoreanProducts,
	fetchHiphopRnbProducts,
	fetchBeatsAndInstrumentalProdcuts,
	fetchJazzProducts,
	fetchNuDiscoModernFunkProducts,
	fetchSoulFunkDiscoProducts,
	fetchRockPopProducts,
	fetchSoundtrackProducts,
	fetchUserSignUp,
	fetchDeleteUserAccount,
	fetchUserLogin,
	fetchGetUserList,
	fetchUser,
	updateUserPassword,
	updateUserPersonalInfo
};
