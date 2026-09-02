export default function Contact() {
  return (
    <div className="py-20 font-mono">
      <h1 className="text-4xl font-black tracking-tighter mb-12 uppercase">// CONTACT_POINT</h1>

      <div className="max-w-xl">
        <p className="text-lg text-gray-700 leading-relaxed mb-12 border-l-2 border-gray-900 pl-6">
          Whether you have a question about systems architecture, want to discuss health physiology, or just want to connect, my inbox is open.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-xs tracking-widest text-gray-500 uppercase">// EMAIL</h2>
            <a href="mailto:hamedejbary@gmail.com" className="text-2xl font-bold hover:underline">
              hamedejbary@gmail.com
            </a>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-xs tracking-widest text-gray-500 uppercase mb-4">// SOCIALS</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <a href="https://github.com/Hamed-Ej" className="hover:font-bold">GITHUB</a>
              <a href="https://t.me/hamedejbary" className="hover:font-bold">TELEGRAM</a>
              <a href="https://instagram.com/hamedejbary" className="hover:font-bold">INSTAGRAM</a>
              <a href="https://x.com/hamed13821382" className="hover:font-bold">X (TWITTER)</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
