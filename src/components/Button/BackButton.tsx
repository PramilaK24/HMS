import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label?: string;
}

const BackButton = ({ label = "Back" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="
        flex h-[40px] w-[92px]
        items-center justify-center gap-2
        rounded-[8px]
        border-b border-top-1 border-emerald-400
        bg-gradient-to-br from-[#025126] via-[#0D7F41] to-[#025126]
        px-3
        text-white
        transition-all duration-200
        hover:from-emerald-700
        hover:via-emerald-600
        hover:to-emerald-800
        hover:pointer
        active:scale-[0.98]
      "
    >
      <Icon
        icon="solar:arrow-left-linear"
        width={24}
        height={24}
      />

      <span className="text-[14px] font-normal">
        {label}
      </span>
    </button>
  );
};

export default BackButton;
