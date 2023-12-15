import styles from './styles.module.css'
import { api } from '@/libs/axios.js';
import { useContext } from 'react'
import { RefreshTableContext } from '@/contexts/RefreshTableContext';

export default function Form() {
  const { refresh, setRefresh } = useContext(RefreshTableContext);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const code = e.target.elements.code.value;
    const description = e.target.elements.description.value;
    const name = e.target.elements.name.value;
    const price = e.target.elements.price.value;
    
    const body = {
        code: code,
        description: description,
        name: name,
        price: price
    }

    try {
        const response = await api.post(`/products`, body);
        
        if(response.data.message === "There is a unique constraint violation, a new user cannot be created with this code"){
          alert("Código do produto ja utilizado, favor cadastre outro código");
        }

        setRefresh(true);
        
        } catch (error) {
        console.error(error);
    }
    
  }  
  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="code">Código do produto</label>
        <input className={styles.input} name="code" type='number' placeholder='123456..' required/>

        <label htmlFor="name">Nome do produto</label>
        <input className={styles.input} name="name" type='text' placeholder='produto A' required/>
        
        <label htmlFor="descripition">Descrição do produto</label>
        <input className={styles.input} name="description" type='text' placeholder='123456..' required/>

        <label htmlFor="price">Preço do produto</label>
        <input className={styles.input} name="price" type='number' placeholder='233' required/>

        <button type="submit" className={styles.button}>Adicionar</button>
    </form>
  )
}