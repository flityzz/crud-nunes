import DataTable from 'react-data-table-component';
import styles from './styles.module.css'
import { api } from '@/libs/axios.js';
import Swal from 'sweetalert2'; 
import { useEffect, useState, useContext } from 'react';
import { RefreshTableContext } from '@/contexts/RefreshTableContext';

export default function Table() {
    const [data, setData] = useState([]); 
    const { refresh, setRefresh } = useContext(RefreshTableContext);

    const handleDeleteButton = (row) => {
    
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Esta ação não pode ser revertida!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
    
                api.delete(`/products/${row.code}`).then(response => {
                    
                    setRefresh(true);
                }).catch(error => {
                    console.error(error);
                });
            }
        });
    };
    
    const handleEditButton = (row) => {
        Swal.fire({
          title: 'Editar Produto',
          html: `<form id="editForm" class="grid grid-cols-1 gap-4">
          <div class="col-span-2">
            <label for="editProductName" class="block text-sm font-medium text-gray-700">Nome:</label>
            <input type="text" id="editProductName" class="mt-1 p-2 border border-gray-300 rounded-md" value="${row.name}" required>
          </div>
          <div class="col-span-2">
            <label for="editProductDescription" class="block text-sm font-medium text-gray-700">Descrição:</label>
            <input type="text" id="editProductDescription" class="mt-1 p-2 border border-gray-300 rounded-md" value="${row.description}" required>
          </div>
          <div class="col-span-2">
            <label for="editProductPrice" class="block text-sm font-medium text-gray-700">Preço:</label>
            <input type="number" id="editProductPrice" class="mt-1 p-2 border border-gray-300 rounded-md" value="${row.price}" required>
          </div>
        </form>`,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Salvar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            
            const editedData = {
              name: document.getElementById('editProductName').value,
              description: document.getElementById('editProductDescription').value,
              price: document.getElementById('editProductPrice').value,
            };

            api.put(`/products/${row.code}`, editedData).then(response => {
              setRefresh(true);
            }).catch(error => {
              console.error(error);
            });
          }
        });
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/products`);
                setData(response.data);
                setRefresh(false);
            } catch (error) {
                console.error(error);
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
            noDataComponent="Sem registros"
            keyField='code'
        />
    );
};