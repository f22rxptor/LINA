export default function FoodModal({ food, isOpen, onClose }) {
  if (!isOpen || !food) return null

  const getSafetyBadge = (safeStatus) => {
    if (safeStatus === true) return '<span class="bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Low Risk</span>'
    if (safeStatus === false) return '<span class="bg-red-200 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">High Risk</span>'
    return '<span class="bg-yellow-200 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Moderate Risk</span>'
  }

  const getGIBadge = (gi) => {
    if (gi <= 55) return `<span class="bg-green-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Low GI: ${gi}</span>`
    if (gi <= 69) return `<span class="bg-yellow-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Med GI: ${gi}</span>`
    return `<span class="bg-red-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">High GI: ${gi}</span>`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative transform transition-all scale-100 opacity-100" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{food.name}</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            <div dangerouslySetInnerHTML={{ __html: getGIBadge(food.gi) }} />
            <div dangerouslySetInnerHTML={{ __html: getSafetyBadge(food.safe) }} />
          </div>
          <p className="text-slate-300 mb-4">{food.details}</p>
          
          <div className="bg-slate-900 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-white mb-3">Nutritional Info</h4>
            <p className="text-sm text-slate-400 mb-3">Approximate values per serving ({food.serving})</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-slate-300">
              <div className="flex justify-between border-b border-slate-700 py-1"><span>Calories:</span> <strong>{food.calories}</strong></div>
              <div className="flex justify-between border-b border-slate-700 py-1"><span>Carbs:</span> <strong>{food.carbs}g</strong></div>
              <div className="flex justify-between border-b border-slate-700 py-1"><span>Protein:</span> <strong>{food.protein}g</strong></div>
              <div className="flex justify-between border-b border-slate-700 py-1"><span>Fiber:</span> <strong>{food.fiber}g</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
