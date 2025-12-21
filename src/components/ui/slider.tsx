import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onValueChange?: (value: number[]) => void
    value?: number[]
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, onValueChange, value, ...props }, ref) => {
        return (
            <input
                type="range"
                className={cn(
                    "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600",
                    className
                )}
                ref={ref}
                value={value?.[0]}
                onChange={(e) => onValueChange?.([parseInt(e.target.value)])}
                {...props}
            />
        )
    }
)
Slider.displayName = "Slider"

export { Slider }
