import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import styles from '../Styles/Products.module.css'

const FormProducts = (props) => {

    const initialStateValues = {
        location: '',
        barcode: '',
        product: '',
        quantity: '',
        price: ''
    };

    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addProduct(values);
        setValues({ ...initialStateValues });
    }

    const getProductById = async (id) => {
        const prod = await db.collection('products').doc(id).get();
        setValues({ ...prod.data() })
    }

    useEffect(() => {
        if (props.currentProduct === '') {
            setValues({ ...initialStateValues });
        } else {
            getProductById(props.currentProduct);
        }
    }, [props.currentProduct])

    return (
        <div className={styles.main_container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Agregar Producto</h2>
                <label>Sucursal</label>
                <select name="location"
                    onChange={handleInputChange}
                    value={values.location}>
                    <option value=""></option>
                    <option value="Sucursal A">Sucursal A</option>
                    <option value="Sucursal B">Sucursal B</option>
                    <option value="Sucursal nueva">Sucursal C</option>
                </select>
                <br />
                <label>Producto</label>
                <input type="text" name="product"
                    onChange={handleInputChange}
                    value={values.product}
                />
                <br />
                <label>Código de producto</label>
                <input type="number"
                    name="barcode"
                    onChange={handleInputChange}
                    value={values.barcode}
                />
                <br />
                <label>Cantidad</label>
                <input type="number"
                    name="quantity"
                    onChange={handleInputChange}
                    value={values.quantity}
                />
                <br />
                <label>Precio</label>
                <input type="number"
                    name="price"
                    onChange={handleInputChange}
                    value={values.price}
                />
                <br />
                <button className={styles.btn}>
                    {props.currentProduct === '' ? 'Agregar Producto' : 'Editar producto'}
                </button>
            </form>
        </div>
    )
}

export default FormProducts;