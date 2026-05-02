import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-3",
        caption: "flex justify-center pt-2 relative items-center mb-2",
        caption_label: "text-sm font-semibold text-gray-900",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 bg-transparent p-0 hover:bg-gray-100 rounded-full"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse",
        head_row: "flex mb-1",
        head_cell:
          "text-gray-500 w-10 font-medium text-xs uppercase tracking-wide",
        row: "flex w-full",
        cell: "h-10 w-10 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: cn(
          "h-10 w-10 p-0 font-normal text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-150 ease-in-out"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-[#41919C] text-white hover:bg-[#4A9BA6] focus:bg-[#41919C] focus:text-white rounded-full font-medium",
        day_today: "text-gray-900 font-medium",
        day_outside:
          "day-outside text-gray-400 hover:text-gray-400 hover:bg-transparent",
        day_disabled: "text-gray-300 hover:text-gray-300 hover:bg-transparent cursor-not-allowed",
        day_range_middle:
          "aria-selected:bg-[#41919C]/10 aria-selected:text-[#41919C] aria-selected:font-medium",
        day_range_start:
          "bg-[#41919C] text-white hover:bg-[#4A9BA6] focus:bg-[#41919C] focus:text-white rounded-full font-medium",
        day_range_end:
          "bg-[#41919C] text-white hover:bg-[#4A9BA6] focus:bg-[#41919C] focus:text-white rounded-full font-medium",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
