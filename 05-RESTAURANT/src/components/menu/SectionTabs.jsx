const SectionTabs = ({ sections, activeSectionId, onSelect }) => (
  <div className="sticky top-20 z-30 bg-surface-container-lowest/95 backdrop-blur-md shadow-md py-space-sm">
    <div className="w-full px-gutter-mobile md:px-margin overflow-x-auto">
      <div className="flex items-center gap-space-xs min-w-max p-1 bg-surface-container-low rounded-lg">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={`font-label-md text-label-md uppercase tracking-wider px-space-md py-space-xs rounded transition-all ${
            activeSectionId === null ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          All Dishes
        </button>
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(section.id)}
            className={`font-label-md text-label-md uppercase tracking-wider px-space-md py-space-xs rounded transition-all ${
              activeSectionId === section.id ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>
    </div>
  </div>
)

export default SectionTabs
