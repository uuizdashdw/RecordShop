import ProductLayout from '@/layouts/ProductLayout';

const SoulFunkDiscoPage = () => {
	return (
		<ProductLayout>
			<h1>Soul Funk Disco Page</h1>
		</ProductLayout>
	);
};

SoulFunkDiscoPage.getLayout = function getLayout(page) {
	return <SoulFunkDiscoPage>{page}</SoulFunkDiscoPage>;
};

export default SoulFunkDiscoPage;
