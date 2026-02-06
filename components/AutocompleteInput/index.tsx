import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";

interface AutocompleteInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  suggestionsList: string[];
}

export default function AutocompleteInput({ value, defaultValue, onChange, placeholder = "Enter...", suggestionsList }: AutocompleteInputProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isControlled = value !== undefined;

  const initialSearch = isControlled ? value! : (defaultValue || searchParams.get("name") || "pikachu");
  const [internalValue, setInternalValue] = useState(initialSearch);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const searchValue = isControlled ? value : internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isControlled && onChange) {
      onChange(val);
    } else {
      setInternalValue(val);
    }
  };

  const suggestions = useMemo(() => {
    if (!searchValue?.trim()) return [];
    const lowerSearch = searchValue.toLowerCase();

    return suggestionsList
      .filter(item => item.toLowerCase().includes(lowerSearch))
      .slice(0, 5);
  }, [suggestionsList, searchValue]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isControlled && !defaultValue) {
      const queryName = searchParams.get("name");
      if (queryName) setInternalValue(queryName);
    }
  }, [searchParams, isControlled, defaultValue]);

  const performSearch = (text: string) => {
    if (isControlled && onChange) {
      onChange(text);
      setIsFocused(false);
    } else {
      if (text.trim()) {
        router.push(`/pokemon/${text.trim().toLowerCase()}`);
        setIsFocused(false);
        setInternalValue(text);
      }
    }
  };

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue) performSearch(searchValue);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="flex gap-2 w-full" role="search">
        <input
          name="autocompleteInput"
          type="text"
          placeholder={placeholder}
          className="flex-1 p-2 border rounded-md dark:bg-zinc-700 dark:text-white dark:border-zinc-600 focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          autoComplete="off"
          aria-label="Search Pokemon"
          aria-expanded={isFocused && suggestions.length > 0}
          aria-controls="pokemon-suggestions-list"
          aria-autocomplete="list"
        />
        {/* Only show search button if meant for submission, not live filtering */}
        {!isControlled && (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <ul
          id="pokemon-suggestions-list"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-md shadow-lg z-50 overflow-hidden"
        >
          {suggestions.map((item) => (
            <li key={item} role="none">
              <button
                role="option"
                onClick={() => performSearch(item)}
                className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-zinc-200"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
