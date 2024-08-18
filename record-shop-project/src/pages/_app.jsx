// CSS
import '../styles/globals.css';

// Layout
import MainLayout from '@/layouts/MainLayout';

// Common Components
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function App({ Component, pageProps }) {
	const getLayout =
		Component.getLayout || (page => <MainLayout>{page}</MainLayout>);

	return (
		<>
			<Header />
			{getLayout(<Component {...pageProps} />)}
			<Footer />
		</>
	);
}
