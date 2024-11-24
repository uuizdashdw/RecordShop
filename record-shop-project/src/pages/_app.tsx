// CSS
import '../styles/globals.css';

// Layout
import MainLayout from '../layouts/MainLayout';

// Common Components
// import Header from '@/components/common/Header';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

// Redux, Store
import { Provider } from 'react-redux';
import store from '../store';

// Hooks
import { ReactNode, useEffect, useState } from 'react';

// UI
import { ChakraProvider } from '@chakra-ui/react';

// Router
import { useRouter } from 'next/router';

// Dynamic Head Module
import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';

const DynamicHeadModule = dynamic(
	// () => import('@/components/common/HeadModule'),
	() => import('../components/common/HeadModule'),
);

// Type
import { NextPageWithLayout } from '../types';

export default function App({ Component, pageProps }: AppProps) {
	const getLayout =
		(Component as NextPageWithLayout).getLayout ||
		((page: ReactNode) => <MainLayout>{page}</MainLayout>);

	const router = useRouter();

	useEffect(() => {
		if (!localStorage.getItem('carts')) {
			localStorage.setItem('carts', JSON.stringify([]));
		}
	}, []);

	const [user, setUser] = useState(null);

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('user') as any);

		if (userInfo) {
			setUser(userInfo);
		} else {
			setUser(null);
			localStorage.removeItem('user');
		}
	}, []);

	return (
		<>
			<DynamicHeadModule nowPath={router.pathname} />
			<Provider store={store}>
				<Header replace={router.replace} user={user} setUser={setUser} />
				<ChakraProvider>
					{getLayout(<Component {...pageProps} setUser={setUser} />)}
				</ChakraProvider>
			</Provider>
			<Footer />
		</>
	);
}
