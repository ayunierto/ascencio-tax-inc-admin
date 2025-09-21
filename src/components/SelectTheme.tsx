import { Moon, PcCaseIcon, Sun } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/components/theme-provider";

export const SelectTheme = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Select defaultValue={theme}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Themes</SelectLabel>
            <SelectItem value={`light`} onClick={() => setTheme("light")}>
              <Sun /> Light
            </SelectItem>
            <SelectItem value={`dark`} onClick={() => setTheme("dark")}>
              <Moon /> Dark
            </SelectItem>
            <SelectItem value={`system`} onClick={() => setTheme("system")}>
              <PcCaseIcon /> System
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
