import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
	const jsonPath = path.join(process.cwd(), 'src/backend/db.json');
	const jsonData = await fs.readFile(jsonPath);
	const data = JSON.parse(jsonData);

	res.status(200).json(data);
}
