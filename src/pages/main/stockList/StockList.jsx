import React, { useEffect, useState } from 'react';
import styles from './stockList.module.css';
import { useNavigate } from 'react-router-dom';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import axios from 'axios';
import { getStockListClosing } from '../../../utils/stocklistApi';
import { Loading } from '../../../components/loading/Loading';
import { Box } from '@mui/system';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const CustomPagination = () => {
    const apiRef = useGridApiContext();

    if (!apiRef) {
        return null;
    }

    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            page={page + 1}
            count={pageCount}
            renderItem={(props) => <PaginationItem {...props} disableRipple />}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
};

export const StockList = () => {
    const navigate = useNavigate();
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 20,
    });

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const data = await getStockListClosing();
                setStockData(data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStockData();
    }, []);

    const onClick = (name) => {
        navigate(`/stockinfo`);
    };

    const columns = [
        {
            field: 'market',
            headerName: '종목명',
            flex: 2,
            headerAlign: 'center',
        },
        {
            field: 'closingPrice',
            headerName: '현재가',
            flex: 1,
            type: 'number',
            headerAlign: 'center',
            renderCell: (params) => {
                const value = Number(params.value);
                const formattedValue = value ? new Intl.NumberFormat().format(value) : '-';
                return <span>{formattedValue}</span>;
            },
        },
        {
            field: 'fluctuatingRate',
            headerName: '등락률 (%)',
            flex: 1,
            type: 'number',
            headerAlign: 'center',
            renderCell: (params) => {
                const value = Number(params.value); // 값을 숫자로 변환
                const color = value < 0 ? 'var(--down-color)' : 'var(--up-color)';
                return <span style={{ color }}> {value ? (value * 100).toFixed(2) : '-'}</span>; // 기본값 처리
            },
        },
        {
            field: 'tradingVolume',
            headerName: '거래량',
            flex: 1,
            type: 'number',
            headerAlign: 'center',
            renderCell: (params) => {
                const value = Number(params.value);
                const formattedValue = value ? new Intl.NumberFormat().format(value) : '-';
                return <span>{formattedValue}</span>;
            },
        },
    ];

    const rows = stockData.map((data, index) => ({
        id: index,
        market: data.market,
        closingPrice: data.closingPrice,
        fluctuatingRate: data.fluctuatingRate,
        tradingVolume: data.tradingVolume,
    }));

    if (loading) return <Loading />;

    return (
        <div className={styles.stockList}>
            <div className={styles.title}>코인 종목</div>
            <div className={styles.table}>
                <Box
                    sx={{
                        width: '100%',
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: 'var(--point-color-2) ',
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: 'var(--color-white) ',
                            },
                        },
                    }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[20, 50, 100]}
                        slots={{ pagination: CustomPagination }}
                        onRowClick={(params) => onClick(params.row.market)}
                        disableColumnResize
                        disableColumnReorder
                    />
                </Box>
            </div>
        </div>
    );
};
