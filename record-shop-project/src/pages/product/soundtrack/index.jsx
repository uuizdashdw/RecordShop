import ProductLayout from '@/layouts/ProductLayout';

const SoundtrackPage = () => {
	return (
		<ProductLayout>
			<h1>Soundtrack Page!!</h1>
		</ProductLayout>
	);
};

SoundtrackPage.getLayout = function getLayout(page) {
	return <SoundtrackPage>{page}</SoundtrackPage>;
};

export default SoundtrackPage;
