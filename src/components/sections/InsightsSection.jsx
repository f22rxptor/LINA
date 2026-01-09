export default function InsightsSection() {
  const riskCards = [
    {
      title: 'Heart Disease & Stroke',
      description: 'Diabetes significantly increases the risk of high blood pressure, high cholesterol, and atherosclerosis (hardening of the arteries), which can lead to heart attacks and strokes.'
    },
    {
      title: 'Kidney Disease (Nephropathy)',
      description: 'High blood sugar forces kidneys to filter too much blood, damaging the filtering units. This can eventually lead to kidney failure, requiring dialysis or a transplant.'
    },
    {
      title: 'Nerve Damage (Neuropathy)',
      description: 'Excess sugar can injure the walls of the tiny blood vessels that nourish your nerves, especially in the legs and feet, causing tingling, pain, or numbness.'
    },
    {
      title: 'Liver Disease (Cirrhosis)',
      description: 'Diabetes is a major risk factor for Non-Alcoholic Fatty Liver Disease (NAFLD). Over time, NAFLD can progress to severe scarring (cirrhosis) and liver failure.'
    },
    {
      title: 'Sciatica & Nerve Pain',
      description: 'While not a direct cause, diabetic neuropathy can mimic or worsen sciatica symptoms. High blood sugar damages nerves, making them more susceptible to compression and pain.'
    },
  ]

  const myths = [
    {
      myth: '"Home remedies, like those mentioned by Rajiv Dixit, can cure diabetes, making modern medicine unnecessary."',
      reality: 'While many traditional remedies (like fenugreek, bitter gourd) can be beneficial as a supplement to a healthy lifestyle, they are not a cure for diabetes. Diabetes is a complex metabolic disorder that, for many, requires medically prescribed treatments to effectively manage blood sugar and prevent severe complications. Relying solely on home remedies and abandoning prescribed medication is extremely dangerous and can lead to the severe health issues listed above. These remedies should be discussed with your doctor and used as part of a comprehensive management plan, not as a replacement for it.'
    },
    {
      myth: '"Medical guidelines changed the fasting blood sugar level for a diabetes diagnosis from 120mg/dL to 100mg/dL just so pharmaceutical companies can sell more drugs."',
      reality: 'This is a misunderstanding of preventative medicine. Extensive global studies, conducted over many years, revealed a crucial insight: damage to blood vessels and nerves can begin even at blood sugar levels previously considered "normal." The range of 100-125 mg/dL is now classified as \'prediabetes.\' Identifying people in this range is not about immediately prescribing drugs; it\'s about providing a critical early warning. This early detection empowers individuals to make lifestyle changes (diet, exercise) that can prevent or delay the onset of full-blown diabetes and its complications, often without needing medication at all. The goal is to intervene earlier to achieve better long-term health outcomes.'
    }
  ]

  return (
    <section id="insights" className="section-card">
      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 h-8 w-8">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          Myth Busters & Insights
        </h2>
        <p className="text-center text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">Understanding the nuances of diabetes management and separating fact from fiction.</p>

        {/* Consequential Diseases */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-4">The Risks of Unmanaged Diabetes</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">If left unmanaged, high blood sugar can damage nerves, blood vessels, and organs over time, leading to serious complications. It's not just about blood sugar; it's about protecting your whole body.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskCards.map((card, idx) => (
              <div key={idx} className="info-card p-4 rounded-lg">
                <h4 className="font-bold text-indigo-400">{card.title}</h4>
                <p className="text-sm text-slate-400 mt-1">{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Myth Busting Section */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Debunking Common Myths</h3>
          <div className="space-y-6">
            {myths.map((mythItem, idx) => (
              <div key={idx} className="info-card p-6 rounded-lg border-slate-700">
                <p className="font-semibold text-red-400 mb-2"><span className="font-bold">Myth:</span> {mythItem.myth}</p>
                <p className="font-semibold text-green-400"><span className="font-bold">Scientific Perspective:</span> {mythItem.reality}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
