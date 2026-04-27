import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [url, setUrl] = useState('');
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = '/api/media';

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setMediaList(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching media:', err);
      setError('Could not connect to backend. Make sure it is running on port 5000.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (res.ok) {
        const newEntry = await res.json();
        setMediaList([newEntry, ...mediaList]);
        setUrl('');
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to add URL');
      }
    } catch (err) {
      console.error('Error submitting media:', err);
      setError('Failed to submit. Is the backend running?');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30">
      <Head>
        <title>Digital Sports Media Tracker | Premium Insights</title>
        <meta name="description" content="Track and analyze digital sports media effortlessly with our state-of-the-art tracker." />
      </Head>

      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tight">
            Media Tracker
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Manage and monitor your digital sports media assets with a sleek, high-performance interface.
          </p>
        </header>

        {/* Input Section */}
        <section className="mb-12">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-slate-900 rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-2xl">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your media URL here (e.g., https://twitter.com/highlight...)"
                className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-4 text-lg text-white placeholder-slate-500"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                Track Now
              </button>
            </div>
          </form>
          {error && (
            <p className="mt-4 text-red-400 text-center animate-bounce">{error}</p>
          )}
        </section>

        {/* List Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              Recent Tracks
              <span className="bg-slate-800 text-cyan-400 text-xs px-2 py-1 rounded-full border border-slate-700">
                {mediaList.length}
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
              ))}
            </div>
          ) : mediaList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaList.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  <div className="flex flex-col h-full justify-between gap-4">
                    <div className="overflow-hidden">
                      <p className="text-sm text-cyan-400 font-mono mb-1">#{item.id}</p>
                      <p className="text-slate-200 font-medium truncate group-hover:text-white transition-colors">
                        {item.url}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/50 pt-4">
                      <span>{new Date(item.addedAt).toLocaleDateString()}</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                      >
                        View Original 
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
              <p className="text-slate-500 text-lg">No media tracked yet. Start by pasting a URL above.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-900 py-12 mt-20 text-center">
        <p className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Digital Sports Media Tracker. Built for speed and precision.
        </p>
      </footer>

      <style jsx global>{`
        body {
          background-color: #020617;
        }
      `}</style>
    </div>
  );
}
