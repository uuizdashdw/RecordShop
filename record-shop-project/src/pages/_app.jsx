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

export default function App({ Component, pageProps }) {
	const getLayout =
		Component.getLayout || (page => <MainLayout>{page}</MainLayout>);

	return (
		<>
			<Header />
			<Provider store={store}>
				{getLayout(<Component {...pageProps} />)}
			</Provider>
			<Footer />
		</>
	);
}
