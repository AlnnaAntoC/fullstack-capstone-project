const db = await connectToDatabase();

req.query.name>req.query.name && req.query.name.trim() !== ''

query.category = req.query.category;
query.condition = req.query.condition;
query.age_years = { $lte: parseInt(req.query.age_years) };

await collection.find(query).toArray()