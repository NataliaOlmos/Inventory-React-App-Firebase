import React, { useEffect, useState } from 'react';
import FormProducts from './FormProducts';
import { db } from '../firebase'
import styles from '../Styles/Products.module.css'

const Products = () => {

    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState('');
    const [filterProduct, setFilterProduct] = useState('');


    const addProduct = async (productObject) => {
        if (currentProduct === '') {
            await db.collection('products').doc().set(productObject)
        } else {
            await db.collection('products').doc(currentProduct).update(productObject);
        }
        setCurrentProduct('');
    }

    const deleteProducts = (id) => {
        if (window.confirm('Este producto se eliminará')) {
            db.collection('products').doc(id).delete();
        }
    }

    const getData = async () => {
        db.collection('products')
            .onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id })
                });
                setProducts(docs);
            });
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div >
            <h1>Inventory App</h1>
            <FormProducts {...{ addProduct, currentProduct, products }} />
            <div className={styles.main_container}>
                <h2>Inventarios Sucursales</h2>
                <div className={styles.search}>
                    <input className={styles.search_input}
                        type='text'
                        placeholder='Buscar Sucursal'
                        onChange={(e) => { setFilterProduct(e.target.value) }}
                    />
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Sucursal</th>
                            <th>Producto</th>
                            <th>Código de Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length > 0 ?
                                products.filter((val) => {
                                    if (filterProduct === '') {
                                        return val
                                    } else if (val.location.toLowerCase().includes(filterProduct.toLowerCase())) {
                                        return val
                                    }
                                }).map(product => (
                                    <tr key={product.id}>
                                        <td>{product.location}</td>
                                        <td>{product.product}</td>
                                        <td>{product.barcode}</td>
                                        <td>{product.quantity}</td>
                                        <td>${product.price}.00 MXN</td>
                                        <td>
                                            <button
                                                className={styles.btn_edit}
                                                onClick={() => setCurrentProduct(product.id)}>
                                                Editar
                                                </button>
                                            <button className={styles.btn_delete}
                                                onClick={() => deleteProducts(product.id)}>
                                                Eliminar
                                                </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td>Sin inventario</td>
                                    </tr>
                                )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Products;