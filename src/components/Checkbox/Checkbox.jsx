import { Icon } from "@iconify/react";

const Checkbox = ({ checked, onChange }) => (
  <label className="relative flex h-4 w-4 cursor-pointer items-center justify-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="peer sr-only"
    />
    <span className="flex h-4 w-4 items-center justify-center rounded-sm border border-gray-600 bg-transparent transition peer-checked:border-emerald-500 peer-checked:">
      {checked && (
        <Icon
          icon="mingcute:check-fill"
          width="10"
          className="text-[var(--text-highlight)]"
        />
      )}
    </span>
  </label>
);

export default Checkbox;
