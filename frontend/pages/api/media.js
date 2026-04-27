// Media Tracker API Route
// Replaces Express backend for Vercel deployment

let media = [];
let nextId = 1;

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(media);
  }

  if (req.method === 'POST') {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Invalid URL' });
    }
    
    const newEntry = { 
      id: nextId++, 
      url, 
      addedAt: new Date().toISOString() 
    };
    
    media.push(newEntry);
    return res.status(201).json(newEntry);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
