// src/components/properties/MultiSelect.tsx - DISPLAY NAMES FOR DEV & NEIGHBORHOOD
'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty, CommandGroup } from '@/components/ui/command'
import { ChevronDown } from 'lucide-react'
import { DEV_DISPLAY_NAMES, NEIGHBORHOOD_DISPLAY_NAMES } from '@/lib/filterUtils'

interface MultiSelectProps {
    label: string
    values: string[]
    options: string[]
    onChange: (next: string[]) => void
    placeholder?: string
    showDisplayNames?: 'development' | 'neighborhood' | false
}

const BRAND_COLOR = '#e1c098'

export default function MultiSelect({
    label,
    values,
    options,
    onChange,
    placeholder = 'All',
    showDisplayNames = false,
}: MultiSelectProps) {
    const [open, setOpen] = useState(false)

    // Check if all options are selected
    const allSelected = values.length === options.length && options.length > 0

    // Get display text based on type
    const getDisplayText = (val: string) => {
        if (showDisplayNames === 'development' && DEV_DISPLAY_NAMES[val]) {
            return DEV_DISPLAY_NAMES[val]
        }
        if (showDisplayNames === 'neighborhood' && NEIGHBORHOOD_DISPLAY_NAMES[val]) {
            return NEIGHBORHOOD_DISPLAY_NAMES[val]
        }
        return val
    }

    // Show "All" when nothing selected OR when all are selected
    const valueText = values.length === 0 || allSelected
        ? 'All'
        : values.length === 1
            ? getDisplayText(values[0])
            : `${values.length} selected`

    const handleAllToggle = () => {
        if (allSelected) {
            onChange([])
        } else {
            onChange([...options])
        }
    }

    const handleOptionToggle = (opt: string) => {
        const checked = values.includes(opt)
        if (checked) {
            onChange(values.filter(v => v !== opt))
        } else {
            onChange([...values, opt])
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className="inline-flex items-center justify-between w-full min-w-[160px] h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-gray-400"
                >
                    <span className="truncate">{valueText}</span>
                    <ChevronDown className="w-4 h-4 ml-2 text-gray-400 flex-shrink-0" />
                </button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="p-0 w-[280px] rounded-lg shadow-lg border border-gray-200 bg-white"
            >
                <div className="p-2 border-b border-gray-100">
                    <Command className="bg-transparent">
                        <CommandInput
                            placeholder="Search..."
                            className="h-8 text-sm border-0 focus:ring-0"
                        />
                    </Command>
                </div>
                <Command className="bg-transparent">
                    <CommandList className="max-h-60">
                        <CommandEmpty className="py-4 text-center text-sm text-gray-500">
                            No results found
                        </CommandEmpty>
                        <CommandGroup className="p-1">
                            {/* "All" Option */}
                            <CommandItem
                                value="__all__"
                                className="flex items-center gap-2 py-2 px-2 cursor-pointer hover:bg-gray-50 rounded font-medium"
                                onSelect={handleAllToggle}
                            >
                                <Checkbox
                                    checked={allSelected}
                                    className="h-4 w-4"
                                    style={{
                                        borderColor: allSelected ? BRAND_COLOR : undefined,
                                        backgroundColor: allSelected ? BRAND_COLOR : undefined
                                    }}
                                />
                                <span className="text-sm text-gray-900 font-semibold">All</span>
                            </CommandItem>

                            {/* Divider */}
                            <div className="h-px bg-gray-100 my-1" />

                            {/* Individual Options */}
                            {options.map(opt => {
                                const checked = values.includes(opt)
                                const displayText = getDisplayText(opt)
                                return (
                                    <CommandItem
                                        key={opt}
                                        value={displayText}
                                        className="flex items-center gap-2 py-2 px-2 cursor-pointer hover:bg-gray-50 rounded"
                                        onSelect={() => handleOptionToggle(opt)}
                                    >
                                        <Checkbox
                                            checked={checked}
                                            className="h-4 w-4"
                                            style={{
                                                borderColor: checked ? BRAND_COLOR : undefined,
                                                backgroundColor: checked ? BRAND_COLOR : undefined
                                            }}
                                        />
                                        <span className="text-sm text-gray-900">{displayText}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}