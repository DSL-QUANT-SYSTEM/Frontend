import React from 'react';
import styles from './stockList.module.css';
import { userData03 } from '../../../data/dummyData03';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export const StockList = () => {
    const navigate = useNavigate();

    const onClick = (name) => {
        navigate(`/stockinfo`);
        // navigate(`/stockinfo/${name}`);
    };

    const columns = [
        { field: 'rank', headerName: '순위' },
        { field: 'name', headerName: '종목명' },
        {
            field: 'now',
            headerName: '현재가',
            valueFormatter: ({ value }) => (value ? value.toLocaleString() : ''),
        },
    ];

    const rows = userData03.map((data, index) => ({
        id: index,
        rank: data.rank,
        name: data.name,
        now: data.now,
    }));

    const paginationModel = { page: 0, pageSize: 100 };

    return (
        <Paper>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 20, 50, 100]}
                onRowClick={(params) => onClick(params.row.name)}
            />
        </Paper>
    );
};
