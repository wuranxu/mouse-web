import React from "react";
import MouseEditTable, {MouseEditableTableProps} from "@/components/Table/MouseEditTable";

const Params: React.FC<MouseEditableTableProps> = (props) => {
  return (
    <MouseEditTable {...props}/>
  )
}

export default Params;
