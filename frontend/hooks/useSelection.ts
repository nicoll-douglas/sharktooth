import type { CheckboxCheckedChangeDetails } from "@chakra-ui/react";
import { useState } from "react";

export interface UseSelectionReturn<T> {
  /**
   * The selected items.
   */
  selection: T[];

  /**
   * Whether there is a current selection of items i.e the selection list length is greater than 0.
   */
  hasSelection: boolean;

  /**
   * The number of selected items.
   */
  selectionCount: number;

  /**
   * The state value for an all-checked checkbox indicating whether all checkboxes are checked.
   */
  allChecked: "indeterminate" | boolean;

  /**
   * Handler to run when an all-checked checkbox status changes.
   *
   * @param changes Contains details about the new checkbox state.
   */
  onAllCheckedChange: (changes: CheckboxCheckedChangeDetails) => void;

  /**
   * Determines whether an item is currently checked i.e is in the selection.
   *
   * @param item The item.
   * @returns true if the item is in the selection, false otherwise.
   */
  isItemChecked: (item: T) => boolean;

  /**
   * Creates and returns a handler to run when an item's checkbox value changes that updates the selection.
   *
   * @param item The item.
   * @returns A handler that updates the selection when the item's checkbox value changes.
   */
  onItemCheckedChange: (
    item: T
  ) => (changes: CheckboxCheckedChangeDetails) => void;

  /**
   * Determines the value of the data-selected attribute for a HTML element associated with the items's checkbox.
   *
   * @param item The item.
   * @returns An empty string if the item is in the selection (data-selected attribute is on), undefined otherwise (data-selected attribute is off).
   */
  isItemDataSelected: (item: T) => "" | undefined;

  /**
   * Resets the selection to an empty array.
   */
  resetSelection: () => void;

  /**
   * Removes selections from the current list of selections.
   *
   * @param items The items to remove from the selection.
   */
  removeSelections: (items: T[]) => void;
}

/**
 * Hook to work with a checkbox selection.
 *
 * @param list The list of items to consider for selection.
 * @returns An object containing event handlers and state values for selection state.
 */
export default function useSelection<T extends number | string>(
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
