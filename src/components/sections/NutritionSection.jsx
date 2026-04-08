import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Utensils, Filter } from 'lucide-react'
import FoodCard from '../FoodCard'
import FoodModal from '../modals/FoodModal'

const foodData = [
  // Indian
  { id: 1, name: 'Roti (Whole Wheat)', category: 'veg', cuisine: 'Indian', gi: 62, safe: 'moderate', details: 'A staple. Prefer whole wheat over refined flour (maida). Portion size is crucial.', serving: '1 medium (30g)', calories: 85, carbs: 18, fiber: 3, protein: 3, image: 'https://images.unsplash.com/photo-1565557613262-b8d90ca74cd0?auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Dal Tadka', category: 'veg', cuisine: 'Indian', gi: 32, safe: true, details: 'Excellent source of protein and fiber, with a low GI. A great choice for any meal.', serving: '1 cup (250g)', calories: 280, carbs: 35, fiber: 15, protein: 15, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Butter Chicken', category: 'non-veg', cuisine: 'Indian', gi: 30, safe: 'moderate', details: 'Chicken is protein-rich. The gravy, however, can be very high in fat and sugar. A small portion of homemade version is better.', serving: '1 cup (240g)', calories: 450, carbs: 15, fiber: 3, protein: 30, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80' },
  { id: 4, name: 'Palak Paneer', category: 'veg', cuisine: 'Indian', gi: 30, safe: true, details: 'Excellent combination. Spinach is nutrient-dense and paneer provides protein. Very low carb.', serving: '1 cup (240g)', calories: 300, carbs: 10, fiber: 5, protein: 20, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=500&q=80' },
  
  // American
  { id: 5, name: 'Classic Cheeseburger', category: 'non-veg', cuisine: 'American', gi: 66, safe: 'moderate', details: 'High in protein and fat, but standard buns have a high GI. Consider lettuce wraps or whole wheat buns.', serving: '1 burger', calories: 550, carbs: 40, fiber: 2, protein: 30, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80' },
  { id: 6, name: 'Caesar Salad', category: 'veg', cuisine: 'American', gi: 25, safe: true, details: 'Low carb, but beware of high-calorie dressings and croutons. Extra chicken adds great protein.', serving: '1 bowl', calories: 350, carbs: 12, fiber: 4, protein: 10, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80' },
  { id: 7, name: 'Grilled Steak', category: 'non-veg', cuisine: 'American', gi: 0, safe: true, details: 'Zero GI and high protein. Pair with high-fiber vegetables instead of starchy potatoes.', serving: '1 steak (250g)', calories: 600, carbs: 0, fiber: 0, protein: 60, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=500&q=80' },
  
  // French
  { id: 8, name: 'Butter Croissant', category: 'veg', cuisine: 'French', gi: 74, safe: false, details: 'High GI from refined flour and high saturated fat. Enjoy rarely and purely as a treat.', serving: '1 medium', calories: 300, carbs: 35, fiber: 1, protein: 5, image: 'https://images.unsplash.com/photo-1549903072-7e6e0fb26faf?auto=format&fit=crop&w=500&q=80' },
  { id: 9, name: 'Ratatouille', category: 'veg', cuisine: 'French', gi: 20, safe: true, details: 'Exceptional vegetable stew. Rich in fiber, antioxidants, and low GI. Very healthy choice.', serving: '1 portion', calories: 150, carbs: 20, fiber: 6, protein: 3, image: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=500&q=80' },
  { id: 10, name: 'Coq au Vin', category: 'non-veg', cuisine: 'French', gi: 20, safe: true, details: 'Braised chicken provides excellent protein with low carbs. Rich but naturally low GI.', serving: '1 segment', calories: 450, carbs: 10, fiber: 2, protein: 45, image: 'https://images.unsplash.com/photo-1698651804797-15d2a90cd6fc?auto=format&fit=crop&w=500&q=80' },

  // Global / Snacks / Drinks
  { id: 11, name: 'Guava (Amrood)', category: 'fruit', cuisine: 'Global', gi: 12, safe: true, details: 'An excellent choice! Very low GI and extremely high in dietary fiber, which helps regulate blood sugar.', serving: '1 medium', calories: 112, carbs: 24, fiber: 9, protein: 4, image: 'https://images.unsplash.com/photo-1536511132770-e5058c730e01?auto=format&fit=crop&w=500&q=80' },
  { id: 12, name: 'Dark Chocolate (>70%)', category: 'sweet', cuisine: 'Global', gi: 25, safe: true, details: 'High in antioxidants and low in sugar. A small square is a healthy way to satisfy a sweet craving.', serving: '1 square (10g)', calories: 60, carbs: 4, fiber: 1, protein: 1, image: 'https://images.unsplash.com/photo-1623351939105-09d29dd54eb0?auto=format&fit=crop&w=500&q=80' },
]

export default function NutritionSection() {
  const [currentCuisineFilter, setCurrentCuisineFilter] = useState('all')
  const [currentRiskFilter, setCurrentRiskFilter] = useState('all')
  const [selectedFood, setSelectedFood] = useState(null)

  const getFilteredFoods = () => {
    let filtered = foodData

    if (currentCuisineFilter !== 'all') {
      filtered = filtered.filter(item => item.cuisine.toLowerCase() === currentCuisineFilter.toLowerCase())
    }

    if (currentRiskFilter !== 'all') {
      filtered = filtered.filter(item => {
        if (currentRiskFilter === 'low') return item.gi <= 55
        if (currentRiskFilter === 'medium') return item.gi > 55 && item.gi <= 69
        if (currentRiskFilter === 'high') return item.gi > 69
        return true
      })
    }

    return filtered
  }

  const filteredFoods = getFilteredFoods()

  return (
    <section id="nutrition" className="section-card py-24 relative flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] opacity-40 mix-blend-screen"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[80px] opacity-30 mix-blend-screen"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/20 rounded-2xl mb-4 shadow-lg shadow-emerald-500/10 backdrop-blur-md">
            <Utensils className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6 tracking-tight">
            Dietary Intelligence
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Beautifully curated health database. Check the glycemic index and macronutrients of global cuisines instantly.
          </p>
        </motion.div>

        {/* Fancy Filters */}
        <div className="mb-12 flex flex-col items-center">
          <div className="bg-slate-900/60 p-4 rounded-3xl border border-slate-700/50 backdrop-blur-md shadow-2xl flex flex-col md:flex-row gap-6 justify-center w-full max-w-3xl">
            {/* Cuisine Filter */}
            <div className="flex-1 flex flex-col items-center bg-slate-800/40 p-3 rounded-2xl border border-slate-700/30">
              <span className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 flex items-center gap-1"><Filter size={12}/> Cuisine Type</span>
              <div className="flex flex-wrap justify-center gap-2">
                {['all', 'Indian', 'American', 'French'].map(cuisine => (
                  <button 
                    key={cuisine} 
                    onClick={() => setCurrentCuisineFilter(cuisine)} 
                    className={`py-1.5 px-4 text-sm font-semibold rounded-xl transition-all duration-300 border ${
                      currentCuisineFilter.toLowerCase() === cuisine.toLowerCase() 
                        ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/30' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {cuisine === 'all' ? 'All Origins' : cuisine}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Filter */}
            <div className="flex-1 flex flex-col items-center bg-slate-800/40 p-3 rounded-2xl border border-slate-700/30">
              <span className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 flex items-center gap-1"><Filter size={12}/> Glycemic Risk</span>
              <div className="flex flex-wrap justify-center gap-2">
                {['all', 'low', 'medium', 'high'].map(risk => {
                  let activeClass = 'bg-slate-500 border-slate-400 text-white'
                  if (risk === 'low') activeClass = 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30'
                  if (risk === 'medium') activeClass = 'bg-amber-500 border-amber-400 text-white shadow-lg shadow-amber-500/30'
                  if (risk === 'high') activeClass = 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/30'

                  return (
                    <button 
                      key={risk} 
                      onClick={() => setCurrentRiskFilter(risk)} 
                      className={`py-1.5 px-4 text-sm font-semibold rounded-xl transition-all duration-300 border ${
                        currentRiskFilter === risk 
                          ? activeClass 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {risk === 'all' ? 'Any Risk' : risk.charAt(0).toUpperCase() + risk.slice(1)}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Grid Area with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food, index) => (
                <motion.div
                  key={food.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <FoodCard food={food} onClick={() => setSelectedFood(food)} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20"
              >
                <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                  <Utensils className="text-slate-500 w-10 h-10" />
                </div>
                <p className="text-slate-400 text-lg font-medium">No results found for these filters.</p>
                <button onClick={() => { setCurrentCuisineFilter('all'); setCurrentRiskFilter('all'); }} className="mt-4 text-indigo-400 hover:text-indigo-300 underline font-medium">Reset Filters</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {selectedFood && (
        <FoodModal food={selectedFood} isOpen={!!selectedFood} onClose={() => setSelectedFood(null)} />
      )}
    </section>
  )
}
