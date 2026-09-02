import ZahedanMap from "@/components/ZahedanMap";

export default function Home() {
  return (
    <div className="py-20 font-mono">
      <div className="mb-12">
        <h1 className="text-8xl font-black tracking-tighter mb-4 text-gray-900">
          HAMED<br/>EJBARI
        </h1>
        <div className="flex gap-4 text-xs tracking-widest text-gray-500 uppercase">
          <span>// HEALTH TEACHER</span>
          <span>// TECH NERD</span>
          <span>// SYSTEM:HUMAN</span>
        </div>
      </div>

      <p className="text-xl text-gray-700 max-w-2xl leading-relaxed mb-12 border-l-2 border-gray-900 pl-6">
        Exploring the intersection of <span className="text-black font-bold">biological wellness</span> and <span className="text-black font-bold">digital infrastructure</span>.
        I teach bodies how to function and build systems to help them thrive.
      </p>

      <div className="mb-12">
        <h2 className="text-xs tracking-widest text-gray-500 uppercase mb-4">// BASE OF OPERATIONS: ZAHEDAN</h2>
        <ZahedanMap />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm border-t border-gray-200 pt-8">
        <a href="https://github.com/Hamed-Ej" className="hover:font-bold">GITHUB</a>
        <a href="https://t.me/hamedejbary" className="hover:font-bold">TELEGRAM</a>
        <a href="https://instagram.com/hamedejbary" className="hover:font-bold">INSTAGRAM</a>
        <a href="https://x.com/hamed13821382" className="hover:font-bold">X (TWITTER)</a>
      </div>
    </div>
  );
}

