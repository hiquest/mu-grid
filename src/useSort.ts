import { useState } from "react";

export type SortState<T extends Record<string, unknown>> = {
  fields: { field: keyof T; direction: "asc" | "desc" }[];
};

export const useSort = <T extends Record<string, unknown>>({
  defaultSortState,
  sorting = "client",
  sortableColumns,
}: {
  defaultSortState?: SortState<T> | undefined;
  sorting: "disabled" | "client" | "server";
  sortableColumns: (keyof T)[];
}) => {
  const [sortState, setSortState] = useState<SortState<T>>(
    defaultSortState ??
      ({
        fields: [],
      } as SortState<T>)
  );

  function getFieldSort(field: keyof T) {
    const sortField = sortState.fields.find((f) => f.field === field);
    return sortField?.direction ?? null;
  }

  function getAriaSort(field: keyof T) {
    const s = getFieldSort(field);
    if (s === "asc") return "ascending";
    if (s === "desc") return "descending";
    return "none";
  }

  const handleSortChange = (field: keyof T) => {
    if (sorting === "disabled") return;

    if (!sortableColumns.includes(field)) return;

    if (sorting === "client") {
      const currentField = sortState.fields.find((f) => f.field === field);

      // none -> asc
      if (!currentField) {
        setSortState({
          fields: [...sortState.fields, { field, direction: "asc" }],
        });
        return;
      }

      const currentDir = currentField.direction;

      // asc -> desc
      if (currentDir === "asc") {
        setSortState({
          fields: sortState.fields.map((f) =>
            f.field === field ? { field, direction: "desc" } : f
          ),
        });
        return;
      }

      // desc -> none
      if (currentDir === "desc") {
        setSortState({
          fields: sortState.fields.filter((f) => f.field !== field),
        });
        return;
      }
    }

    if (sorting === "server") {
      // TODO: server-side sorting
    }
  };

  return {
    sortState,
    getFieldSort,
    getAriaSort,
    handleSortChange,
  };
};

export function sortData<T extends Record<string, unknown>>(
  array: T[],
  sortState: SortState<T>
): T[] {
  return array.sort((a, b) => {
    for (const { field, direction } of sortState.fields) {
      if (a[field] < b[field]) {
        return direction === "asc" ? -1 : 1;
      } else if (a[field] > b[field]) {
        return direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });
}
