import type { CheckboxCheckedChangeDetails } from "@chakra-ui/react";
import { useState } from "react";

/**
 * Return type for the useSelection hook.
 */
export interface UseSelectionReturn {
  /**
   * The selected items
   */
  selection: number[];

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
  isItemChecked: (item: number) => boolean;

  /**
   * Creates a handler to run when an item's checkbox value changes that updates the selection.
   */
  onItemCheckedChange: (
    item: number
  ) => (changes: CheckboxCheckedChangeDetails) => void;

  /**
   * Determines the value of the data-selected attribute for a HTML element associated with the item.
   */
  isItemDataSelected: (item: number) => "" | undefined;

  /**
   * Resets the selection to an empty array.
   */
  resetSelection: () => void;

  /**
   * Removes selections from the current list of selections.
   */
  removeSelections: (ids: number[]) => void;
}

/**
 * Hook to work with a checkbox selection.
 *
 * @param list The list of items to consider for selection.
 * @returns Event handlers and state values for selection state.
 */
export default function useSelection(list: number[]): UseSelectionReturn {
  const [selection, setSelection] = useState<number[]>([]);

  const selectionCount = selection.length;
  const hasSelection = selectionCount > 0;
  const indeterminate = hasSelection && selectionCount < list.length;
  const allChecked = indeterminate ? "indeterminate" : selectionCount > 0;

  const onAllCheckedChange = (changes: CheckboxCheckedChangeDetails) => {
    setSelection(changes.checked ? list : []);
  };

  const isItemChecked = (item: number) => selection.includes(item);

  const onItemCheckedChange = (item: number) => {
    return (changes: CheckboxCheckedChangeDetails) =>
      setSelection((prev: number[]) =>
        changes.checked
          ? [...prev, item]
          : selection.filter((currentItem) => currentItem !== item)
      );
  };

  const isItemDataSelected = (item: number) =>
    selection.includes(item) ? "" : undefined;

  const removeSelections = (items: number[]) =>
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
