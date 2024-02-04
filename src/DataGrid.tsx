import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { DEFAULT_THEME, DefaultTheme } from "./theme";
import IconButton from "./components/IconButton";
import FilterIcon from "./components/icons/FilterIcon";
import { SortState, sortData, useSort } from "./useSort";
import DownIcon from "./components/icons/DownIcon";

declare module "@emotion/react" {
  export interface Theme extends DefaultTheme {}
}

export type ColumnDef<T extends Record<string, unknown>> = {
  field: keyof T;
  headerName: string;

  // default: true
  sortable?: boolean;

  // default: false
  filterable?: boolean;

  // default: false
  editable?: boolean;
  cellRenderer?: (row: T) => React.ReactNode;
  headerRenderer?: () => React.ReactNode;

  align?: "left" | "right";
};

export type DataGridProps<T extends Record<string, unknown>> = {
  data: T[];
  columns: ColumnDef<T>[];
  rowToId?: (row: T) => string;

  // ======
  // Sorting
  // ======
  // default: "client"
  sorting: "disabled" | "client" | "server";

  // when sorting === "server"
  onSortChange?: (model: SortState<T>) => void;

  defaultSortState?: SortState<T>;

  // ======
  // Filtering
  // ======
  enableFiltering?: boolean;
  defaultFilters?: Record<string, string>;
  onFilterChange?: (filters: Record<string, string>) => void;
  // pagination?: {
  //   enabled: boolean;
  //   pageSize: number;
  //   currentPage: number;
  //   onPageChange: (page: number) => void;
  // };
  // rowSelection?: "none" | "single" | "multiple";
  // selectedRowIds?: Set<string>;
  // onSelectionChange?: (selectedIds: Set<string>) => void;
  // enableEditing?: boolean;
  // onEditCommit?: (rowId: string, field: string, value: any) => void;
  // enableGrouping?: boolean;
  // groupByFields?: string[];
  // aggregationFunctions?: Record<string, (rows: T[]) => any>;
  // onExport?: () => void;
  // persistedState?: Record<string, any>;
  // onStateChange?: (state: Record<string, any>) => void;
  // customRenderers?: {
  //   cell?: (row: T) => React.ReactNode;
  //   header?: () => React.ReactNode;
  // };
  // locale?: string;
  // accessibilityOptions?: Record<string, any>;
  // className?: string;
  // style?: React.CSSProperties;
  // resizableColumns?: boolean;
  // virtualized?: boolean;
  // apiRef?: React.MutableRefObject<any>;
};

const DivTable = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.fontFamilies.primary};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const DivTableHead = styled.div`
  display: table-header-group;
  background-color: ${({ theme }) => theme.colors.headerBg};
  width: 100%;
`;

const DivTableBody = styled.div`
  display: table-row-group;
`;

const DivTableRow = styled.div`
  display: table-row;
`;

const DivTableHeader = styled.div`
  display: table-cell;
  padding: ${({ theme: t }) => `${t.spacing[1]} ${t.spacing[3]}`};
  border-top: 1px solid ${({ theme: t }) => t.colors.border};
  border-bottom: 1px solid ${({ theme: t }) => t.colors.border};
  &.align-right {
    text-align: right;
  }
`;

const ThInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    color: ${({ theme }) => theme.colors.textLight};
    cursor: pointer;
  }
  &:hover {
    svg {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

const DivTableCell = styled.div`
  display: table-cell;
  padding: ${({ theme: t }) => `${t.spacing[2]} ${t.spacing[3]}`};
  border-bottom: 1px solid ${({ theme: t }) => t.colors.border};
  &.align-right {
    text-align: right;
  }
`;

const SortableName = styled.div`
  color: ${({ theme }) => theme.colors.headerText};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.normal} ease-in-out;
  display: flex;
  align-items: center;
  svg {
    color: ${({ theme }) => theme.colors.textLight};
    cursor: pointer;
    margin-left: ${({ theme }) => theme.spacing[0]};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    svg {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export const DataGrid = <T extends Record<string, unknown>>({
  data,
  columns,
  rowToId,
  defaultSortState,
  sorting = "client",
  onSortChange,
}: DataGridProps<T>) => {
  const cols = withDefaults(columns);

  const { getAriaSort, handleSortChange, getFieldSort, sortState } = useSort({
    sorting,
    defaultSortState,
    sortableColumns: cols.filter((c) => c.sortable).map((c) => c.field),
  });

  // ===============
  // SANITY CHECKS
  // ===============
  if (data[0]) {
    if (!("id" in data[0]) && !rowToId) {
      throw new Error(
        'DataGrid: "id" field is required in data rows, or provide a "rowToId" function to generate unique IDs.'
      );
    }
  }

  if (sorting === "server" && !onSortChange) {
    throw new Error(
      'DataGrid: "onSortChange" is required when "sorting" is set to "server".'
    );
  }

  const sortedData = sortData(data, sortState);

  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <DivTable role="grid" className="DataGridRoot">
        <DivTableHead className="DataGridHead" role="rowgroup">
          <DivTableRow role="row" aria-rowindex={1}>
            {cols.map((column, index) => (
              <DivTableHeader
                key={String(column.field)}
                role="columnheader"
                aria-colindex={index + 1}
                aria-sort={getAriaSort(column.field)}
                className={`DataGridHeaderCell align-${column.align}`}
              >
                <ThInner>
                  <SortableName onClick={() => handleSortChange(column.field)}>
                    {column.headerName}
                    {sortIcon(getFieldSort(column.field))}
                  </SortableName>
                  {column.filterable && (
                    <IconButton
                      icon={<FilterIcon />}
                      label={`Filter by ${column.headerName}`}
                      onClick={() => {
                        console.log(`Filtering by ${column.headerName}`);
                      }}
                    />
                  )}
                </ThInner>
              </DivTableHeader>
            ))}
          </DivTableRow>
        </DivTableHead>
        <DivTableBody className="DataGridBody" role="rowgroup">
          {sortedData.map((row, rowIndex) => (
            <DivTableRow
              key={
                rowToId
                  ? rowToId(row)
                  : "id" in row
                  ? String(row["id"])
                  : rowIndex
              }
              role="row"
              aria-rowindex={rowIndex + 2}
            >
              {cols.map((column, index) => (
                <DivTableCell
                  key={String(column.field)}
                  role="cell"
                  aria-colindex={index + 1}
                  className={`DataGridCell align-${column.align}`}
                >
                  {column.cellRenderer
                    ? column.cellRenderer(row)
                    : String(row[column.field])}
                </DivTableCell>
              ))}
            </DivTableRow>
          ))}
        </DivTableBody>
      </DivTable>
    </ThemeProvider>
  );
};

function withDefaults<T extends Record<string, unknown>>(
  columns: ColumnDef<T>[]
): ColumnDef<T>[] {
  return columns.map((c) => ({
    sortable: true,
    filterable: false,
    editable: false,
    align: "left",
    ...c,
  }));
}

function sortIcon(sort: "asc" | "desc" | null) {
  if (sort === "asc") {
    return <DownIcon rotated />;
  }

  if (sort === "desc") {
    return <DownIcon />;
  }

  return null;
}
