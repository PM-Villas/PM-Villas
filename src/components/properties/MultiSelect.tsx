// src/components/properties/MultiSelect.tsx
'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty, CommandGroup } from '@/components/ui/command'

interface MultiSelectProps {
    label: string
    values: string[]
    options: string[]
    onChange: (next: string[]) => void
    placeholder?: string
}

export default function MultiSelect({
    label,
    values,
    options,
    onChange,
    placeholder = 'Select',
}: MultiSelectProps) {
    const [open, setOpen] = useState(false)

    const valueText = values.length
        ? values.slice(0, 2).join(', ') + (values.length > 2 ? ` +${values.length - 2}` : '')
        : placeholder

    return (
        <div className="w-full">
            <Label className="text-[10px] font-medium tracking-wide text-slate-500">
                {label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className="w-full h-10 px-4 text-left rounded-lg border bg-white hover:bg-slate-50 transition shadow-sm"
                    >
                        <span className="text-[15px] leading-5 text-slate-900 truncate">
                            {valueText}
                        </span>
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className="p-0 w-[360px] rounded-2xl shadow-xl border bg-white"
                >
                    <div className="p-3 border-b">
                        <Command className="bg-transparent">
                            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                        </Command>
                    </div>
                    <Command className="bg-transparent">
                        <CommandList className="max-h-64">
                            <CommandEmpty className="py-4">No results.</CommandEmpty>
                            <CommandGroup
                                heading={
                                    <span className="text-xs text-slate-500">
                                        Select one or more
                                    </span>
                                }
                            >
                                {options.map(opt => {
                                    const checked = values.includes(opt)
                                    return (
                                        <CommandItem
                                            key={opt}
                                            value={opt}
                                            className="flex items-center gap-3 py-3"
                                            onSelect={() => {
                                                if (checked) {
                                                    onChange(values.filter(v => v !== opt))
                                                } else {
                                                    onChange([...values, opt])
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={checked}
                                                onCheckedChange={() => {
                                                    if (checked) {
                                                        onChange(values.filter(v => v !== opt))
                                                    } else {
                                                        onChange([...values, opt])
                                                    }
                                                }}
                                            />
                                            <span className="text-[15px]">{opt}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}