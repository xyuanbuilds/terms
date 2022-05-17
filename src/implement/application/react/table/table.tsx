/**
 * 基本实现
 * https://zhuanlan.zhihu.com/p/362473728
 * demo
 * https://codepen.io/susiechang-the-styleful/pen/JjEWzPK
 */
import * as React from "react";

const tableStyle: React.CSSProperties = {
  tableLayout: "auto",
  width: "100%",
  borderCollapse: "collapse",
};
const tableBody: React.CSSProperties = {
  backgroundColor: "#fff",
};
const tableHeader: React.CSSProperties = {
  backgroundColor: "lightgray",
};
const tableCell: React.CSSProperties = {
  padding: "8px 16px",
  border: "1px solid gray",
};

export interface ColumnType {
  key: string;
  title: string;
  width?: React.CSSProperties["width"];
  align?: React.CSSProperties["textAlign"];
}

export interface TableProps {
  columns: ColumnType[];
  className?: string;
  style?: React.CSSProperties;
  dataSource?: { [x: string]: any }[];
  rowKey?: string | ((record: { [x: string]: any }) => string);
  tableLayout?: React.CSSProperties["tableLayout"];
}

const ColumnGroup: React.FC<{ columns: ColumnType[] }> = ({ columns }) => {
  const columnWidths = columns.map((ele) => ele.width).join("-");
  const cols = React.useMemo(() => {
    let cols: React.ReactElement[] = [];
    let mustInsert = false;
    for (let i = columns.length; i >= 0; i--) {
      const width = columns[i] && columns[i].width;
      if (width || mustInsert) {
        cols.unshift(
          <col
            key={i}
            style={{ width, minWidth: width, textAlign: columns[i].align }}
          />
        );
        mustInsert = true;
      }
    }
    return cols;
    // eslint-disable-next-line
  }, [columnWidths]);
  return <colgroup>{cols}</colgroup>;
};

const TableCell: React.FC<{
  componentType?: "th" | "td";
  children?: React.ReactNode;
}> = ({ children, componentType = "td" }) => {
  return React.createElement(
    componentType,
    {
      style: tableCell,
    },
    children
  );
};

const TableBody: React.FC<{
  dataSource?: { [x: string]: any }[];
  columns: ColumnType[];
  getRowKey: (record: { [x: string]: any }) => string;
}> = ({ dataSource, columns, getRowKey }) => {
  return (
    <tbody style={tableBody}>
      {dataSource?.map((record) => (
        <tr key={getRowKey(record)}>
          {columns.map((cell) => (
            <TableCell key={cell.key}>{record[cell.key]}</TableCell>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const TableHead: React.FC<{ columns: ColumnType[] }> = ({ columns }) => {
  return (
    <thead style={tableHeader}>
      <tr>
        {columns.map((column) => (
          <TableCell key={column.key}>{column.title}</TableCell>
        ))}
      </tr>
    </thead>
  );
};

const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  className,
  style = {},
  tableLayout,
  rowKey,
}) => {
  const getRowKey = React.useCallback(
    (record: { [x: string]: any }) => {
      if (typeof rowKey === "function") {
        return rowKey(record);
      }
      let key = typeof rowKey === "string" ? rowKey : "key";
      return record[key] as string;
    },
    [rowKey]
  );

  return (
    <table
      className={`${tableStyle} ${className}`}
      style={{ tableLayout: tableLayout, ...style }}
    >
      <ColumnGroup columns={columns} />
      <TableHead columns={columns}></TableHead>
      <TableBody
        getRowKey={getRowKey}
        columns={columns}
        dataSource={dataSource}
      />
    </table>
  );
};

const columns = [
  { key: "name", title: "name", width: 100 },
  { key: "age", title: "age" },
  { key: "year", title: "year" },
  { key: "address", title: "address" },
];
const generateData = (num: number) => {
  return new Array(num).fill(0).map((ele, i) => ({
    key: i,
    name: `name-${i}`,
    age: 20 + i,
    year: 2020 + i,
    address: Math.random(),
  }));
};

const TableTest = () => (
  <Table
    tableLayout="fixed"
    columns={columns}
    dataSource={generateData(10)}
  ></Table>
);
