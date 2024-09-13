export async function Handler(req, res) {
	const { path } = req.query;

	const validPaths = [
		'/',
		'/product/korean',
		'/product/hiphop&rnb',
		'/product/beats/instrumental',
		'/product/soul&funk&disco',
		'/product/nu_disco&modern_funk',
		'/product/rock&pop',
	];

	const isValidPath =
		validPaths.includes(path) || (path && path.startsWith('/product/'));

	if (!isValidPath) {
		return res
			.status(400)
			.json({ message: '잘못된 경로이거나 누락된 경로입니다.' });
	}

	try {
		if (path.startsWith('/product/')) {
			await res.revalidate(path);
		} else {
			await res.revalidate('/');
		}
		return res.json({ revalidate: true });
	} catch (reason) {
		console.error('Revalidation Error!', reason);
		return res.status(500).send('Revalidate Failed');
	}
}
