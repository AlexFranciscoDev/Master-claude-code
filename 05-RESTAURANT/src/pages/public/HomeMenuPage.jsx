import { useMemo, useState } from 'react'
import { useMenu } from '../../hooks/useMenu'
import SectionTabs from '../../components/menu/SectionTabs'
import MenuGrid from '../../components/menu/MenuGrid'

const HomeMenuPage = () => {
  const { sections, dishes, loading, error } = useMenu()
  const [activeSectionId, setActiveSectionId] = useState(null)

  const visibleDishes = useMemo(
    () => (activeSectionId ? dishes.filter((dish) => dish.section_id === activeSectionId) : dishes),
    [dishes, activeSectionId],
  )

  return (
    <>
      <section className="w-full px-gutter-mobile md:px-margin py-space-xl">
        <span className="font-label-sm text-label-sm uppercase text-primary tracking-widest block mb-1">Welcome</span>
        <h1 className="font-display-hero text-display-hero text-on-surface uppercase tracking-tight leading-none mb-space-sm">
          The Kinetic Table
        </h1>
        <p className="font-body-xl text-body-xl text-on-surface-variant max-w-2xl">
          Seasonal dishes, warm hospitality, and a table always ready for you.
        </p>
      </section>
      <SectionTabs sections={sections} activeSectionId={activeSectionId} onSelect={setActiveSectionId} />
      <section className="w-full px-gutter-mobile md:px-margin py-space-xl">
        {loading ? <p className="text-on-surface-variant">Loading menu…</p> : null}
        {error ? <p className="text-error">{error}</p> : null}
        {!loading && !error ? <MenuGrid dishes={visibleDishes} /> : null}
      </section>
    </>
  )
}

export default HomeMenuPage
