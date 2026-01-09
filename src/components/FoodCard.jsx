export default function FoodCard({ food, onClick }) {
  const getGIBadge = (gi) => {
    if (gi <= 55) return `<span class="bg-green-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Low GI: ${gi}</span>`
    if (gi <= 69) return `<span class="bg-yellow-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Med GI: ${gi}</span>`
    return `<span class="bg-red-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">High GI: ${gi}</span>`
  }

  return (
    <div onClick={onClick} className='bg-slate-700 rounded-lg shadow-md cursor-pointer transform hover:-translate-y-1 transition-transform p-4 flex flex-col justify-center items-center text-center h-28'>
      <h4 className='font-bold text-md text-white'>{food.name}</h4>
      <div className='mt-2 flex flex-wrap gap-2 justify-center'>
        <div dangerouslySetInnerHTML={{ __html: getGIBadge(food.gi) }} />
      </div>
    </div>
  )
}
