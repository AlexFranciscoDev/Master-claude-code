import { PARTY_SIZE_OPTIONS } from '../../utils/constants'

const PartySizeStep = ({ value, onChange }) => (
  <fieldset className="flex flex-col gap-space-sm">
    <legend className="font-headline-md text-headline-md text-on-surface uppercase mb-space-xs">1. Party Size</legend>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
      {PARTY_SIZE_OPTIONS.map((option) => (
        <label key={option.value} className="cursor-pointer">
          <input
            type="radio"
            name="party_size"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="peer sr-only"
          />
          <div className="p-space-md rounded bg-surface-container-low peer-checked:bg-surface-container-highest peer-checked:text-primary transition-all text-center">
            <span className="block font-headline-sm text-headline-sm text-on-surface">{option.value}</span>
            <span className="block font-label-sm text-label-sm text-on-surface-variant">{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  </fieldset>
)

export default PartySizeStep
