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

// Hook
import { useEffect } from 'react';

// UI
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }) {
	const getLayout =
		Component.getLayout || (page => <MainLayout>{page}</MainLayout>);

	useEffect(() => {
		if (!localStorage.getItem('carts')) {
			localStorage.setItem('carts', JSON.stringify([]));
		}
	}, []);
	return (
		<>
			<Provider store={store}>
				<Header />
				<ChakraProvider>
					{getLayout(<Component {...pageProps} />)}
				</ChakraProvider>
			</Provider>
			<Footer />
		</>
	);
}
