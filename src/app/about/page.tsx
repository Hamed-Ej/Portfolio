export default function About() {
  return (
    <div className="py-20 font-mono">
      <h1 className="text-4xl font-black tracking-tighter mb-12 uppercase">// SYSTEM_PROFILE</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <section>
          <h2 className="text-xs tracking-widest text-gray-500 uppercase mb-4">// BIO</h2>
          <p className="text-lg text-gray-700 leading-relaxed border-l-2 border-gray-900 pl-6">
            Health teacher by vocation. Computer systems engineer by obsession.
            I believe the human body is the most complex machine in existence—I study it for a living,
            and I optimize it with code. Whether I'm teaching the mechanics of human movement
            or configuring a Linux kernel, my goal is the same:
            <span className="font-bold text-black"> Efficiency. Stability. Optimization.</span>
          </p>
        </section>

        <section>
          <h2 className="text-xs tracking-widest text-gray-500 uppercase mb-4">// TECH_STACK</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center gap-4">
              <span className="font-bold text-2xl">01</span>
              <div>
                <span className="block font-bold text-black">LINUX</span>
                <span className="text-gray-500 text-sm">Because root access is the only access that matters.</span>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <span className="font-bold text-2xl">02</span>
              <div>
                <span className="block font-bold text-black">PYTHON</span>
                <span className="text-gray-500 text-sm">The glue that automates the chaos.</span>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <span className="font-bold text-2xl">03</span>
              <div>
                <span className="block font-bold text-black">HARDWARE</span>
                <span className="text-gray-500 text-sm">Knowing how the metal talks to the logic.</span>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
