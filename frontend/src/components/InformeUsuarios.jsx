import React from "react";
import MaterialTable, { MTableToolbar} from "@material-table/core";
//Nos permite exportar a CSV y PDF
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function InformeUsuarios(props) {
  const col = [
    { title: "Nombre", field: "firstName"},
    { title: "Login", field: "login" , filtering: false},
    { title: "Password", field: "password" , filtering: false},
    { title: "Rol", field: "rol", filtering: false }
  ];

  const tableData = props.datos.map((item) => ({
    id: item.id,
    firstName: item.nombre,
    login: item.login,
    password: item.password,
    rol: item.rol,
  }));


  return (
    <div>
      <MaterialTable title="Usuarios" 
        columns={col}
        data={tableData}
        components={{
            Toolbar: (props) => (
              <div style={{ backgroundColor: "#808080" }}>
                <MTableToolbar {...props} />
              </div>
            ),
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
      />
    </div>
  );
}

export default InformeUsuarios;
