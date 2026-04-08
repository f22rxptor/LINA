import { motion } from 'framer-motion'

export default function FoodCard({ food, onClick }) {
  const getGIBadge = (gi) => {
    if (gi <= 55) return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">Low GI: {gi}</span>
    if (gi <= 69) return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">Med GI: {gi}</span>
    return <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">High GI: {gi}</span>
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick} 
      className='bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-slate-700/50 cursor-pointer transition-all duration-300 flex flex-col group h-full hover:shadow-indigo-500/10 hover:border-indigo-500/50'
    >
      <div className="relative h-40 w-full overflow-hidden bg-slate-700">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
        <img 
          src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop'} 
          alt={food.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-slate-700">
            {food.cuisine || 'Global'}
          </span>
        </div>
      </div>
      
      <div className='p-5 flex flex-col flex-1'>
        <h4 className='font-bold text-lg text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-1' title={food.name}>{food.name}</h4>
        <div className='mt-auto flex items-center justify-between'>
          {getGIBadge(food.gi)}
          <span className="text-xs font-medium text-slate-400">{food.calories} kcal</span>
        </div>
      </div>
    </motion.div>
  )
}
