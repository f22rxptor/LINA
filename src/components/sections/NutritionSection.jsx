import { useState } from 'react'
import FoodCard from '../FoodCard'
import FoodModal from '../modals/FoodModal'

const foodData = [
  // Veg
  { id: 1, name: 'Roti (Whole Wheat)', category: 'veg', gi: 62, safe: 'moderate', details: 'A staple. Prefer whole wheat over refined flour (maida). Portion size is crucial.', serving: '1 medium (30g)', calories: 85, carbs: 18, fiber: 3, protein: 3 },
  { id: 2, name: 'Dal Tadka (Lentils)', category: 'veg', gi: 32, safe: true, details: 'Excellent source of protein and fiber, with a low GI. A great choice for any meal.', serving: '1 cup (250g)', calories: 280, carbs: 35, fiber: 15, protein: 15 },
  { id: 3, name: 'Paneer Butter Masala', category: 'veg', gi: 40, safe: 'moderate', details: 'Paneer itself is low carb, but the gravy can be high in fat and sometimes sugar. Best homemade with less cream and no added sugar.', serving: '1 cup (240g)', calories: 350, carbs: 12, fiber: 3, protein: 18 },
  { id: 4, name: 'Aloo Gobi', category: 'veg', gi: 60, safe: 'moderate', details: 'Cauliflower is great, but potatoes have a high GI. Limit potato quantity and pair with fiber.', serving: '1 cup (150g)', calories: 150, carbs: 20, fiber: 5, protein: 4 },
  { id: 5, name: 'Chana Masala', category: 'veg', gi: 33, safe: true, details: 'Chickpeas are a superfood for diabetics - high in fiber and protein.', serving: '1 cup (250g)', calories: 300, carbs: 45, fiber: 12, protein: 15 },
  { id: 6, name: 'Idli (Steamed)', category: 'veg', gi: 65, safe: 'moderate', details: 'Made from fermented rice and lentil batter. It\'s steamed, not fried, which is good. Pair with sambar for added protein and fiber.', serving: '2 pieces', calories: 120, carbs: 28, fiber: 2, protein: 4 },
  { id: 7, name: 'Dosa (Plain)', category: 'veg', gi: 68, safe: 'moderate', details: 'Similar to idli batter. Can be high in carbs. Choose a plain dosa and avoid potato filling (Masala Dosa).', serving: '1 medium', calories: 150, carbs: 30, fiber: 2, protein: 4 },
  { id: 8, name: 'Samosa (Fried)', category: 'veg', gi: 75, safe: false, details: 'Made with refined flour and deep-fried, often with high-GI potato filling. Best avoided.', serving: '1 piece', calories: 250, carbs: 30, fiber: 3, protein: 5 },
  { id: 17, name: 'Palak Paneer', category: 'veg', gi: 30, safe: true, details: 'Excellent combination. Spinach is nutrient-dense and paneer provides protein. Very low carb.', serving: '1 cup (240g)', calories: 300, carbs: 10, fiber: 5, protein: 20 },
  { id: 18, name: 'Bhindi Masala', category: 'veg', gi: 20, safe: true, details: 'Okra (bhindi) is a low-calorie, high-fiber vegetable that can help in blood sugar management.', serving: '1 cup (150g)', calories: 130, carbs: 15, fiber: 7, protein: 3 },
  { id: 19, name: 'Rajma Curry', category: 'veg', gi: 28, safe: true, details: 'Kidney beans are a fantastic source of complex carbs, fiber, and protein, leading to slow sugar release.', serving: '1 cup (250g)', calories: 330, carbs: 50, fiber: 15, protein: 15 },
  { id: 20, name: 'Vegetable Pulao', category: 'veg', gi: 68, safe: 'moderate', details: 'Using brown rice instead of white can lower the GI. Load it with vegetables to increase fiber content. Portion control is essential.', serving: '1 cup (200g)', calories: 290, carbs: 55, fiber: 5, protein: 6 },
  // Non-Veg
  { id: 9, name: 'Butter Chicken', category: 'non-veg', gi: 30, safe: 'moderate', details: 'Chicken is protein-rich. The gravy, however, can be very high in fat and sugar. A small portion of homemade version is better.', serving: '1 cup (240g)', calories: 450, carbs: 15, fiber: 3, protein: 30 },
  { id: 10, name: 'Fish Curry', category: 'non-veg', gi: 25, safe: true, details: 'Fish is an excellent source of lean protein and omega-3 fatty acids. Opt for grilled or curry-based preparations over fried.', serving: '1 cup (250g)', calories: 300, carbs: 10, fiber: 2, protein: 25 },
  { id: 11, name: 'Chicken Tikka', category: 'non-veg', gi: 15, safe: true, details: 'Marinated and grilled, not fried. A very healthy, high-protein option.', serving: '4-5 pieces', calories: 250, carbs: 5, fiber: 1, protein: 30 },
  { id: 12, name: 'Mutton Rogan Josh', category: 'non-veg', gi: 35, safe: 'moderate', details: 'Mutton is higher in saturated fat than chicken or fish. Consume in moderation and opt for leaner cuts.', serving: '1 cup (240g)', calories: 400, carbs: 12, fiber: 2, protein: 28 },
  // Fruits
  { id: 13, name: 'Mango', category: 'fruit', gi: 51, safe: 'moderate', details: 'Known as the king of fruits, but high in natural sugar. A small portion (a few slices, not the whole fruit) is okay.', serving: '1/2 cup slices', calories: 60, carbs: 15, fiber: 1.6, protein: 0.8 },
  { id: 14, name: 'Guava (Amrood)', category: 'fruit', gi: 12, safe: true, details: 'An excellent choice! Very low GI and extremely high in dietary fiber, which helps regulate blood sugar.', serving: '1 medium', calories: 112, carbs: 24, fiber: 9, protein: 4 },
  { id: 15, name: 'Banana', category: 'fruit', gi: 52, safe: 'moderate', details: 'GI depends on ripeness (less ripe is better). It is energy-dense, so portion control is key.', serving: '1 small', calories: 90, carbs: 23, fiber: 2.6, protein: 1 },
  { id: 16, name: 'Papaya', category: 'fruit', gi: 60, safe: 'moderate', details: 'Rich in vitamins and antioxidants. Enjoy in moderation due to its medium GI.', serving: '1 cup chunks', calories: 62, carbs: 16, fiber: 2.5, protein: 0.7 },
  // Drinks
  { id: 35, name: 'Chaas (Buttermilk)', category: 'drink', gi: 30, safe: true, details: 'Salted buttermilk is a fantastic, hydrating, low-GI drink. Aids digestion and is very refreshing.', serving: '1 glass (250ml)', calories: 60, carbs: 6, fiber: 0, protein: 4 },
  { id: 36, name: 'Coconut Water', category: 'drink', gi: 55, safe: true, details: 'Natural and hydrating. Has electrolytes but also natural sugars, so consume in moderation.', serving: '1 glass (250ml)', calories: 50, carbs: 10, fiber: 0, protein: 2 },
  // Sweets
  { id: 41, name: 'Gulab Jamun', category: 'sweet', gi: 80, safe: false, details: 'Deep-fried milk solids soaked in sugar syrup. Very high in sugar, fat, and calories. Best to avoid completely.', serving: '1 piece', calories: 150, carbs: 20, fiber: 0, protein: 2 },
  { id: 44, name: 'Dark Chocolate (>70%)', category: 'sweet', gi: 25, safe: true, details: 'High in antioxidants and low in sugar. A small square is a healthy way to satisfy a sweet craving.', serving: '1 square (10g)', calories: 60, carbs: 4, fiber: 1, protein: 1 },
]

export default function NutritionSection() {
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState('all')
  const [currentRiskFilter, setCurrentRiskFilter] = useState('all')
  const [selectedFood, setSelectedFood] = useState(null)

  const getFilteredFoods = () => {
    let filtered = foodData

    if (currentCategoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === currentCategoryFilter)
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
    <section id="nutrition" className="section-card">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 h-8 w-8">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path>
            <path d="M12 16c-2.2 0-4-1.34-4-3 0-1.62 1.55-2.94 3-3 .78-.03 1.5.21 2.05.61.55.4.95.98.95 1.66 0 1.3-1.34 2.73-3 3z"></path>
            <path d="M12 22a10 10 0 0 0 10-10h-2a8 8 0 0 1-8 8v2z"></path>
          </svg>
          NutriGuide
        </h2>
        <p className="text-center text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">Explore foods, their glycemic index, and nutritional information.</p>

        <div className="space-y-4 mb-8 text-center">
          <div>
            <span className="text-slate-400 font-semibold mr-4">Category:</span>
            <div className="inline-flex rounded-md shadow-sm flex-wrap justify-center gap-1" role="group">
              {['all', 'veg', 'non-veg', 'fruit', 'drink', 'sweet'].map(cat => (
                <button key={cat} onClick={() => setCurrentCategoryFilter(cat)} className={`py-2 px-4 text-sm font-medium rounded-lg ${currentCategoryFilter === cat ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                  {cat === 'all' ? 'All' : cat === 'non-veg' ? 'Non-Veg' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-slate-400 font-semibold mr-4">Glycemic Risk:</span>
            <div className="inline-flex rounded-md shadow-sm flex-wrap justify-center gap-1" role="group">
              {['all', 'low', 'medium', 'high'].map(risk => (
                <button key={risk} onClick={() => setCurrentRiskFilter(risk)} className={`py-2 px-4 text-sm font-medium rounded-lg ${currentRiskFilter === risk ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                  {risk === 'all' ? 'All' : risk === 'low' ? 'Low (Green)' : risk === 'medium' ? 'Moderate (Yellow)' : 'High (Red)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFoods.length > 0 ? (
            filteredFoods.map(food => (
              <FoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
            ))
          ) : (
            <p className="text-slate-400 col-span-full text-center">No food items match the selected filters.</p>
          )}
        </div>
      </div>

      {selectedFood && (
        <FoodModal food={selectedFood} isOpen={!!selectedFood} onClose={() => setSelectedFood(null)} />
      )}
    </section>
  )
}
