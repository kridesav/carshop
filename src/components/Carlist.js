import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteButtonRenderer from './DeleteButtonRenderer';
import Addcar from './Addcar';
import Editcar from './Editcar';

export default function Carlist() {
    const [cars, setCars] = useState([]);
    const divRef = React.useRef(null);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carrestapi.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err));
    }

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(() => fetchData())
                .catch(err => console.error(err))
        }
    }

    const saveCar = (car) => {
        fetch('https://carrestapi.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const gridOptions = {
        components: {
            deleteButtonRenderer: DeleteButtonRenderer,
            editCar: Editcar
        },
        columnDefs: [
            { headerName: "Brand", field: "brand", sortable: true, filter: true },
            { headerName: "Model", field: "model", sortable: true, filter: true },
            { headerName: "Color", field: "color", sortable: true, filter: true },
            { headerName: "Fuel", field: "fuel", sortable: true, filter: true },
            { headerName: "Year", field: "year", sortable: true, filter: true },
            { headerName: "Price", field: "price", sortable: true, filter: true },
            {
                headerName: "Edit",
                cellRenderer: 'editCar',
                cellRendererParams: { rowValue: params => params.data, updateCar:updateCar},
                width: 100,
            },
            {
                headerName: "Delete",
                cellRenderer: 'deleteButtonRenderer',
                cellRendererParams: { deleteCar: deleteCar, },
                width: 100,
            }
        ]
    }

    return (
        <div ref={divRef}>
            <Addcar saveCar={saveCar} />
            <div className="ag-theme-material"
                style={{ height: '800px', width: '75%', margin: 'auto' }}>
                <AgGridReact
                    gridOptions={gridOptions}
                    rowData={cars}
                />
            </div>
        </div>
    );
}
