const DishCard = ({ dish }) => (
  <article className="flex flex-col rounded-xl overflow-hidden bg-surface-container shadow-lg">
    {dish.image_url ? (
      <div className="w-full aspect-video overflow-hidden bg-surface-container-high">
        <img src={dish.image_url} alt={dish.name} className="w-full h-full object-cover" />
      </div>
    ) : null}
    <div className="flex flex-col flex-1 p-space-md justify-between gap-space-sm">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-start justify-between gap-space-xs">
          <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight">{dish.name}</h3>
          <span className="font-headline-sm text-headline-sm text-primary font-bold whitespace-nowrap">
            ${Number(dish.price).toFixed(2)}
          </span>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">{dish.description}</p>
        {dish.allergens.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {dish.allergens.map((allergen) => (
              <span key={allergen} className="bg-surface-container-high text-on-surface-variant px-space-xs py-0.5 rounded font-label-sm text-label-sm">
                {allergen}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  </article>
)

export default DishCard
