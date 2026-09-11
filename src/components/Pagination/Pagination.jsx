import { Icon } from "@iconify/react";
import Button from "../Button/Button";

export default function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  itemLabel = "items",
}) {
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);

  const start =
    totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-6 flex items-center gap-6  w-full">
      {/* Pagination Text */}
      <p
        role="status"
        className="text-[12px] font-normal text-white/80"
      >
        Page {currentPage} of {pageCount} ({start} to {end} from{" "}
        {totalItems} {itemLabel})
      </p>

      {/* Pagination Buttons */}
      <nav
        aria-label={`${itemLabel} pagination`}
        className="flex items-center gap-4"
      >
        {/* Previous */}
        <Button
          aria-label="Previous page"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`
            size-6
            rounded-full!
            flex
            items-center
            justify-center
            border
            border-[#174A2B]
            transition-all
            ${
              currentPage <= 1
                ? "bg-[#10251A] text-[#A0A0A0] opacity-70 cursor-not-allowed"
                : "bg-[#10251A] text-text-highlight hover:bg-[#153B23]"
            }
          `}
        >
          <Icon
            icon="solar:alt-arrow-left-linear"
            width="18"
            height="18"
            aria-hidden="true"
          />
        </Button>

        {/* Next */}
        <Button
          aria-label="Next page"
          disabled={currentPage >= pageCount}
          onClick={() => onPageChange(currentPage + 1)}
          className={`
            size-6
            rounded-full!
            flex
            items-center
            justify-center
            border
            border-[#7CFF91]
            transition-all
            ${
              currentPage >= pageCount
                ? "bg-[#10251A] text-[#355B43] opacity-70 cursor-not-allowed"
                : "bg-[#0EFF7B] text-black hover:bg-[#69EA7D]"
            }
          `}
        >
          <Icon
            icon="solar:alt-arrow-right-linear"
            width="18"
            height="18"
            aria-hidden="true"
          />
        </Button>
      </nav>
    </div>
  );
}