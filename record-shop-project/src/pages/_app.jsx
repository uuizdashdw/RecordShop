// CSS
import '../styles/globals.css';

// Layout
import MainLayout from '@/layouts/MainLayout';

// Common Components
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

// Redux, Store
import { Provider } from 'react-redux';
import store from '@/store';

// Hooks
import { useEffect, useState } from 'react';

// UI
import { ChakraProvider } from '@chakra-ui/react';

// Router
import { useRouter } from 'next/router';

// Dynamic Head Module
import dynamic from 'next/dynamic';
const DynamicHeadModule = dynamic(
	() => import('@/components/common/HeadModule'),
);

export default function App({ Component, pageProps }) {
	const getLayout =
		Component.getLayout || (page => <MainLayout>{page}</MainLayout>);

	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		if (!localStorage.getItem('carts')) {
			localStorage.setItem('carts', JSON.stringify([]));
		}

		const userData = JSON.parse(localStorage.getItem('user'));
		if (userData) setUser(userData);
	}, []);
	return (
		<>
			<DynamicHeadModule nowPath={router.pathname} />
			<Provider store={store}>
				<Header user={user} setUser={setUser} />
				<ChakraProvider>
					{getLayout(<Component {...pageProps} setUser={setUser} />)}
				</ChakraProvider>
			</Provider>
			<Footer />
		</>
	);
}
