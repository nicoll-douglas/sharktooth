import type { CheckboxCheckedChangeDetails } from "@chakra-ui/react";
import { useState } from "react";

type SelectionItemType = number | string;

/**
 * Return type for the useSelection hook.
 */
export interface UseSelectionReturn<T> {
  /**
   * The selected items
   */
  selection: T[];

  /**
   * Whether there is a current selection of downloads.
   */
  hasSelection: boolean;

  /**
   * The number of selected downloads.
   */
  selectionCount: number;

  /**
   * The state value for the "all checked" checkbox indicating whether all checkboxes are checked.
   */
  allChecked: "indeterminate" | boolean;

  /**
   * Handler to run when the all checked checkbox status changes.
   */
  onAllCheckedChange: (changes: CheckboxCheckedChangeDetails) => void;

  /**
   * Determines whether an item is currently checked (i.e in the selection).
   */
  isItemChecked: (item: T) => boolean;

  /**
   * Creates a handler to run when an item's checkbox value changes that updates the selection.
   */
  onItemCheckedChange: (
    item: T
  ) => (changes: CheckboxCheckedChangeDetails) => void;

  /**
   * Determines the value of the data-selected attribute for a HTML element associated with the item.
   */
  isItemDataSelected: (item: T) => "" | undefined;

  /**
   * Resets the selection to an empty array.
   */
  resetSelection: () => void;

  /**
   * Removes selections from the current list of selections.
   */
  removeSelections: (items: T[]) => void;
}

/**
 * Hook to work with a checkbox selection.
 *
 * @param list The list of items to consider for selection.
 * @returns Event handlers and state values for selection state.
 */
export default function useSelection<T extends SelectionItemType>(
  list: T[]
): UseSelectionReturn<T> {
  const [selection, setSelection] = useState<T[]>([]);

  const selectionCount = selection.length;
  const hasSelection = selectionCount > 0;
  const indeterminate = hasSelection && selectionCount < list.length;
  const allChecked = indeterminate ? "indeterminate" : selectionCount > 0;

  const onAllCheckedChange = (changes: CheckboxCheckedChangeDetails) => {
    setSelection(changes.checked ? list : []);
  };

  const isItemChecked = (item: T) => selection.includes(item);

  const onItemCheckedChange = (item: T) => {
    return (changes: CheckboxCheckedChangeDetails) =>
      setSelection((prev: T[]) =>
        changes.checked
          ? [...prev, item]
          : selection.filter((currentItem) => currentItem !== item)
      );
  };

  const isItemDataSelected = (item: T) =>
    selection.includes(item) ? "" : undefined;

  const removeSelections = (items: T[]) =>
    setSelection((prev) => prev.filter((item) => !items.includes(item)));

  const resetSelection = () => setSelection([]);

  return {
    selection,
    hasSelection,
    allChecked,
    selectionCount,
    onAllCheckedChange,
    isItemChecked,
    isItemDataSelected,
    onItemCheckedChange,
    resetSelection,
    removeSelections,
  };
}
