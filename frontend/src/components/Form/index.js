import styles from './styles.module.css'
import { api } from '@/libs/axios.js';
import { useContext, useState } from 'react'
import { RefreshTableContext } from '@/contexts/RefreshTableContext';

export default function Form() {
  const {refresh, setRefresh} = useContext(RefreshTableContext);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    price: '',
  });

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const body = {
      code: formData.code,
      description: formData.description,
      name: formData.name,
      price: formData.price,
    };

    try {
        const response = await api.post(`/products`, body);
        
        if(response.data.message === "There is a unique constraint violation, a new user cannot be created with this code"){
          alert("Código do produto ja utilizado, favor cadastre outro código");

          return;
        }

        setFormData({
          code: '',
          name: '',
          description: '',
          price: '',
        });

        setRefresh(true);

        
        } catch (error) {
        console.error(error);
    }
    
  }  
  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="code">Código do produto</label>
        <input 
            className={styles.input} 
            name="code" 
            type='number' 
            placeholder='123456..' 
            required
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        />

        <label htmlFor="name">Nome do produto</label>
        <input className={styles.input} 
            name="name" 
            type='text' 
            placeholder='produto A' 
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        
        <label htmlFor="descripition">Descrição do produto</label>
        <input 
            className={styles.input} 
            name="description" 
            type='text' 
            placeholder='123456..' 
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <label htmlFor="price">Preço do produto</label>
        <input 
            className={styles.input} 
            name="price" 
            type='number' 
            placeholder='233' 
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        <button type="submit" className={styles.button}>Adicionar</button>
    </form>
  )
}