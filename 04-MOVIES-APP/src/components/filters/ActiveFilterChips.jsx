import './ActiveFilterChips.css';

export function ActiveFilterChips({ chips, onRemove, onClearAll }) {
  if (chips.length === 0) return null;

  return (
    <div className="active-filter-chips">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          className="active-filter-chips__chip"
          onClick={() => onRemove(chip.key)}
        >
          {chip.label} <span aria-hidden="true">×</span>
        </button>
      ))}
      <button type="button" className="active-filter-chips__clear" onClick={onClearAll}>
        Clear All
      </button>
    </div>
  );
}
