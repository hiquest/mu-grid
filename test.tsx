<DataGrid
  // Data and Columns
  data={dataArray} // Array of objects representing row data
  columns={columnDefs} // Array of objects defining column configurations
  // Features: Sorting
  enableSorting={true} // Enables sorting on columns
  defaultSortField="id" // Field to sort by default
  defaultSortDirection="asc" // Sort direction ('asc' or 'desc')
  onSortChange={handleSortChange} // Callback for when sorting changes
  // Features: Filtering
  enableFiltering={true} // Enables filtering on columns
  defaultFilters={filterObject} // Object representing default filters
  onFilterChange={handleFilterChange} // Callback for when filters change
  // Features: Pagination
  pagination={{
    enabled: true,
    pageSize: 10,
    currentPage: 1,
    onPageChange: handlePageChange,
  }}
  // Features: Selection
  rowSelection="multiple" // 'none', 'single', 'multiple'
  selectedRowIds={selectedIds} // Array or set containing IDs of selected rows
  onSelectionChange={handleSelectionChange} // Callback when selection changes
  // Features: Editing
  enableEditing={true} // Enables editing functionality
  onEditCommit={handleEditCommit} // Callback for when edits are committed
  // Features: Grouping and Aggregation
  enableGrouping={true} // Enables grouping functionality
  groupByFields={groupByFieldsArray} // Array of fields to group by
  aggregationFunctions={aggregationFunctionsObject} // Aggregation functions
  // Features: Exporting
  onExport={handleExport} // Callback to trigger data export
  // Features: State Persistence
  persistedState={persistedStateObject} // Object for persisted state
  onStateChange={handleStateChange} // Callback for state change
  // Customization & Extensibility
  customRenderers={{
    cell: CustomCellRenderer,
    header: CustomHeaderRenderer,
  }}
  // Accessibility & Internationalization
  locale="en-US" // Locale identifier
  accessibilityOptions={{
    rowAriaLabel: (row) => `Row ${row.id}`,
    ...otherA11yProps,
  }}
  // Styling
  className="custom-grid-class" // Custom CSS class for styling
  style={{ maxHeight: "500px" }} // Inline styles object
  // Additional Utility Features
  resizableColumns={true} // Allow column resizing
  virtualized={true} // Use virtualization to render rows
  // API & Documentation
  apiRef={gridApi} // Exposing grid API for more control
/>;
