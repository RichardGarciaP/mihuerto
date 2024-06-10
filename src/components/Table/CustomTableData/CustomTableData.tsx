import { useMemo, useState } from "react";
import DataTable, { TableProps } from "react-data-table-component";
import { Card, CardBody, Col, Input, Label } from "reactstrap";
import TableHeader from "@/components/Headers/TableHeader/TableHeader";
import { useRouter } from "next/router";
import { setQueryStringValue } from "../../../../utils/utils";

type CustomTableProps = {
  title: string;
  button?: {
    title: string;
    onClick: () => void;
  };
  data: any[];
  columns: any[];
} & TableProps<any>;
const CustomTableData = ({
  title,
  button,
  data,
  columns,
  ...otherProps
}: CustomTableProps) => {
  const router = useRouter();
  const [filterText, setFilterText] = useState("");

  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div className="dataTables_filter">
        <Label>
          Search:
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQueryStringValue("search", e.target.value, router);
              setFilterText(e.target.value);
            }}
            type="search"
            value={filterText}
          />
        </Label>
      </div>
    );
  }, [filterText]);
  return (
    <Col sm={12}>
      <Card className="main-zero-config">
        <CardBody>
          <TableHeader
            headingClassName="pb-0 card-no-border"
            Heading={title}
            button={button}
          />
          <div className="table-responsive">
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
              {...otherProps}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CustomTableData;
