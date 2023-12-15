import DataTable from 'react-data-table-component';
import styles from './styles.module.css'
import { api } from '@/libs/axios.js';
import { useEffect, useState, useContext } from 'react';
import { RefreshTableContext } from '@/contexts/RefreshTableContext';

const handleDeleteButton = (row) => {
    console.log(row);
};

const handleEditButton = (row) => {
    console.log(row);
};


const columns = [
    {
        name: 'Código do produto',
        selector: row => row.code,
    },
    {
        name: 'Nome do produto',
        selector: row => row.name,
    },
    {
        name: 'Descrição',
        selector: row => row.description,
    },
    {
        name: 'Preço',
        selector: row => row.price,
    },
    {		
        cell: (row) => <button className={styles.deleteButton} onClick={() => handleDeleteButton(row)}>Deletar</button>,
        ignoreRowClick: false,
        button: true,
    },
    {		
        cell: (row) => <button className={styles.editButton} onClick={() => handleEditButton(row)}>Editar</button>,
        ignoreRowClick: false,
        button: true,
    }
];

export default function Table() {
    const [data, setData] = useState([]); 
    const { refresh, setRefresh } = useContext(RefreshTableContext);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/products`);
                setData(response.data);
                setRefresh(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [refresh]);

    return (
        <DataTable
            columns={columns}
            data={data}
            className={styles.table}
            responsive={true}
            defaultSortFieldId={1}
            keyField='code'
        />
    );
};