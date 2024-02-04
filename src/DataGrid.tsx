import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { DEFAULT_THEME, DefaultTheme } from "./theme";

declare module "@emotion/react" {
  export interface Theme extends DefaultTheme {}
}

export type ColumnDef<T extends object> = {
  field: string;
  headerName: string;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  cellRenderer?: (row: T) => React.ReactNode;
  headerRenderer?: () => React.ReactNode;
};

export type DataGridProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  rowToId?: (row: T) => string;
  // enableSorting?: boolean;
  // defaultSortField?: string;
  // defaultSortDirection?: "asc" | "desc";
  // onSortChange?: (sortField: string, sortDirection: "asc" | "desc") => void;
  // enableFiltering?: boolean;
  // defaultFilters?: Record<string, string>;
  // onFilterChange?: (filters: Record<string, string>) => void;
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
  background-color: ${({ theme }) => theme.colors.header};
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
  padding: ${({ theme: t }) => `${t.spacing[2]} ${t.spacing[3]}`};
  border-top: 1px solid ${({ theme: t }) => t.colors.border};
  border-bottom: 1px solid ${({ theme: t }) => t.colors.border};
  text-align: left;
`;

const DivTableCell = styled.div`
  display: table-cell;
  padding: ${({ theme: t }) => `${t.spacing[2]} ${t.spacing[3]}`};
  border-bottom: 1px solid ${({ theme: t }) => t.colors.border};
`;

export const DataGrid = <T extends object>({
  data,
  columns,
  rowToId,
}: DataGridProps<T>) => {
  if (data[0]) {
    if (!("id" in data[0]) && !rowToId) {
      throw new Error(
        'DataGrid: "id" field is required in data rows, or provide a "rowToId" function to generate unique IDs.'
      );
    }
  }

  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <DivTable role="grid" className="DataGridRoot">
        <DivTableHead className="DataGridHead" role="rowgroup">
          <DivTableRow role="row" aria-rowindex={1}>
            {columns.map((column, index) => (
              <DivTableHeader
                key={column.field}
                role="columnheader"
                aria-colindex={index + 1}
              >
                {column.headerName}
              </DivTableHeader>
            ))}
          </DivTableRow>
        </DivTableHead>
        <DivTableBody className="DataGridBody" role="rowgroup">
          {data.map((row, rowIndex) => (
            <DivTableRow
              key={
                rowToId
                  ? rowToId(row)
                  : "id" in row
                  ? (row.id as string)
                  : rowIndex
              }
              role="row"
              aria-rowindex={rowIndex + 2}
            >
              {columns.map((column, index) => (
                <DivTableCell
                  key={column.field}
                  role="cell"
                  aria-colindex={index + 1}
                >
                  {column.cellRenderer
                    ? column.cellRenderer(row)
                    : row[column.field]}
                </DivTableCell>
              ))}
            </DivTableRow>
          ))}
        </DivTableBody>
      </DivTable>
    </ThemeProvider>
  );
};

// <DataGrid
//   // Data and Columns
//   data={dataArray} // Array of objects representing row data
//   columns={columnDefs} // Array of objects defining column configurations
//   // Features: Sorting
//   enableSorting={true} // Enables sorting on columns
//   defaultSortField="id" // Field to sort by default
//   defaultSortDirection="asc" // Sort direction ('asc' or 'desc')
//   onSortChange={handleSortChange} // Callback for when sorting changes
//   // Features: Filtering
//   enableFiltering={true} // Enables filtering on columns
//   defaultFilters={filterObject} // Object representing default filters
//   onFilterChange={handleFilterChange} // Callback for when filters change
//   // Features: Pagination
//   pagination={{
//     enabled: true,
//     pageSize: 10,
//     currentPage: 1,
//     onPageChange: handlePageChange,
//   }}
//   // Features: Selection
//   rowSelection="multiple" // 'none', 'single', 'multiple'
//   selectedRowIds={selectedIds} // Array or set containing IDs of selected rows
//   onSelectionChange={handleSelectionChange} // Callback when selection changes
//   // Features: Editing
//   enableEditing={true} // Enables editing functionality
//   onEditCommit={handleEditCommit} // Callback for when edits are committed
//   // Features: Grouping and Aggregation
//   enableGrouping={true} // Enables grouping functionality
//   groupByFields={groupByFieldsArray} // Array of fields to group by
//   aggregationFunctions={aggregationFunctionsObject} // Aggregation functions
//   // Features: Exporting
//   onExport={handleExport} // Callback to trigger data export
//   // Features: State Persistence
//   persistedState={persistedStateObject} // Object for persisted state
//   onStateChange={handleStateChange} // Callback for state change
//   // Customization & Extensibility
//   customRenderers={{
//     cell: CustomCellRenderer,
//     header: CustomHeaderRenderer,
//   }}
//   // Accessibility & Internationalization
//   locale="en-US" // Locale identifier
//   accessibilityOptions={{
//     rowAriaLabel: (row) => `Row ${row.id}`,
//     ...otherA11yProps,
//   }}
//   // Styling
//   className="custom-grid-class" // Custom CSS class for styling
//   style={{ maxHeight: "500px" }} // Inline styles object
//   // Additional Utility Features
//   resizableColumns={true} // Allow column resizing
//   virtualized={true} // Use virtualization to render rows
//   // API & Documentation
//   apiRef={gridApi} // Exposing grid API for more control
// />;
