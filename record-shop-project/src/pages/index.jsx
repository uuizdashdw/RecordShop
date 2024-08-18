import MainLayout from '@/layouts/MainLayout';

const MainPage = () => {
	return (
		<div>
			<MainLayout>
				<h1>Main Page</h1>
				<p>main page text</p>
			</MainLayout>
		</div>
	);
};

MainPage.getLayout = function getLayout(page) {
	return <MainLayout>{page}</MainLayout>;
};

export default MainPage;
