import DishCard from './DishCard'

const MenuGrid = ({ dishes }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
    {dishes.map((dish) => (
      <DishCard key={dish.id} dish={dish} />
    ))}
  </div>
)

export default MenuGrid
