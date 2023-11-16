import React from "react";
import MaterialTable, { MTableToolbar} from "@material-table/core";
import TableFooter from "@material-table/core";
import TableCell from "@material-table/core";
import TableRow from "@material-table/core";
//Nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function InformeColeccion(props) {
  const col = [
    { title: "Nombre", field: "firstName", filtering: false},
    { title: "Marca", field: "marca" },
    { title: "Tipo", field: "type" },
    { title: "Precio", field: "price", type: "numeric", filtering: false }
  ];

  const tableData = props.datos.map((item) => ({
    id: item.id,
    firstName: item.nombre,
    marca: item.marca,
    type: item.tipo,
    price: item.precio,
  }));


  return (
    <div>
      <MaterialTable title="Coleccion de coches" 
        columns={col}
        data={tableData}
        components={{
            Toolbar: (props) => (
              <div style={{ backgroundColor: "#808080" }}>
                <MTableToolbar {...props} />
              </div>
            ),
            Footer: (props) => {
              const { data, renderSummaryRow } = props;
              const summaryRow = renderSummaryRow({ column: col[0], data });
              return (
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={col.length} style={summaryRow?.style}>
                      Suma total de precios: {summaryRow?.value}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              );
            },
        }}
        options={{
            columnsButton: true,
            filtering: true,
            exportMenu: [
                {
                    label: "Export PDF",
                    exportFunc: (cols, datas) => ExportPdf(cols, datas, "ColeccionPDF"),
                },
                {
                    label: "Export CSV",
                    exportFunc: (cols, datas) => ExportCsv(cols, datas, "ColeccionCSV"),
                },                 
            ],
                headerStyle: {
                    backgroundColor: '#000',
                    color: '#FFF'
                },
                cellStyle: {
                    backgroundColor: '#808080',
                    color: '#FFF'
                }
        }}
        renderSummaryRow={({column, data }) =>
        column.field === "price"
          ? {
              value: data.reduce((agg, row) => agg + row.price, 0),
              style: { background: "#333" },
            }
          : undefined
      }
      />
    </div>
  );
}

export default InformeColeccion;
