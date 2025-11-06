'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Common timezones
const commonTimezones = [
  'America/Toronto',
  'America/Lima',
  'America/Bogota',
  'America/Mexico_City',
  'America/Santiago',
  'America/Argentina/Buenos_Aires',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/Madrid',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Dubai',
];

interface TimezoneComboboxProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function TimezoneCombobox({
  className,
  value: initialValue,
  onChange,
}: TimezoneComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);
  const [showAll, setShowAll] = React.useState(false);

  // load navigator timezones
  const allTimezones = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supported = (Intl as any).supportedValuesOf?.('timeZone');
    return supported ?? commonTimezones;
  }, []);

  const list = showAll ? allTimezones : commonTimezones;

  const handleSelect = (selected: string) => {
    setValue(selected);
    onChange?.(selected);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={` justify-between ${className}`}
        >
          {value ? value : 'Select timezone...'}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." className="h-9" />
          <CommandList>
            <CommandEmpty>Timezones not found.</CommandEmpty>

            <CommandGroup
              heading={showAll ? 'All timezones' : 'Common timezones'}
            >
              {list.map((tz: string) => (
                <CommandItem key={tz} value={tz} onSelect={handleSelect}>
                  {tz}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === tz ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>

            {!showAll && (
              <CommandGroup>
                <CommandItem
                  onSelect={() => setShowAll(true)}
                  className="font-medium text-blue-600"
                >
                  See all timezones …
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
