// backend/data.js
// In‑memory store for media URLs
let media = [];
let nextId = 1;

module.exports = {
  getAll: () => media,
  add: (url) => {
    const entry = { id: nextId++, url, addedAt: new Date().toISOString() };
    media.push(entry);
    return entry;
  },
};
