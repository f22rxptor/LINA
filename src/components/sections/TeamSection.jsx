export default function TeamSection() {
  const developers = [
    {
      name: 'Abhishek Kumar',
      role: 'AI/ML Lead',
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800',
      linkedin: 'https://www.linkedin.com/in/abhishek-kumar-3b30a6356/'
    },
    {
      name: 'Bhargav Reddy',
      role: 'Frontend Developer',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800',
      linkedin: 'https://www.linkedin.com/in/'
    },
    {
      name: 'Goverdhan Reddy',
      role: 'Backend Developer',
      image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=800',
      linkedin: 'https://www.linkedin.com/in/'
    }
  ]

  return (
    <section id="team" className="section-card">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 h-8 w-8">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          The Developers
        </h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">This project was brought to life by a dedicated team of innovators at the hackathon.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {developers.map((dev, index) => (
            <a key={index} href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="info-card p-6 rounded-lg flex flex-col items-center hover:shadow-lg transition-shadow">
              <img className="w-24 h-24 rounded-full mb-4 object-cover ring-2 ring-indigo-500" src={dev.image} alt={`Profile photo of ${dev.name}`} />
              <h4 className="text-lg font-bold text-white">{dev.name}</h4>
              <p className="text-sm text-indigo-400">{dev.role}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
