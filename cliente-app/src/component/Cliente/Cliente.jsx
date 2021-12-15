import React, { useState, useEffect } from 'react'
import MaterialTable from "material-table";
import { Grid } from '@mui/material';
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cliente = () => {

    toast.configure()

    const [modal, setModal] = useState(false)
    const [newData, setnewData] = useState([])

    const toggle = () => setModal(!modal);

    const columns = [
        { title: "Producto", field: "nombre" },
        { title: "Descripción", field: "descripcion" },
        { title: "Cantidad", field: "cantidad", type: "numeric" },
        { title: "Valor Unitario", field: "valorUnitario", type: "numeric" },
    ];

    const productoFormik = useFormik({
        initialValues: {
            nombreProducto: '',
            descripcionProducto: '',
            cantidadProducto: '',
            valorProducto: '',
        },
        validationSchema: Yup.object({
            nombreProducto: Yup.string()
                .max(14, 'El nombre del producto no debe de contener mas de 14 carácteres')
                .required('Este campo es requerido'),
            descripcionProducto: Yup.string()
                .max(50, 'El nombre del producto no debe de contener mas de 50 carácteres')
                .required('Este campo es requerido'),
            cantidadProducto: Yup.number()
                .required('Este campo es requerido')
                .positive('La cantidad debe ser mayor a 0'),
            valorProducto: Yup.number()
                .required('Este campo es requerido')
                .positive('El valor  debe ser mayor a 0')
        })
    })

    useEffect(() => {
        listarProductos()
      });

    const handleSubmit = () => {
        const data = productoFormik.values
        axios.post('http://localhost:4000/producto', data)
            .then(response => {
                const { status } = response
                const { message } = response.data
                if (status === 200 && message.length > 0) {
                    toast.success(message, { autoClose: 3000 })
                    listarProductos()
                    limpiarCampos()
                    setModal(false)
                }
                else {
                    toast.error('Ha ocurrido un error al tratar de realizar esta operación', { autoClose: 3000 })
                }
            })
            .catch(e => {
                console.log(e)
                toast.error('Ha ocurrido un error al tratar de realizar esta operación', { autoClose: 3000 })
            });
    }

    const listarProductos = () => {
        axios.get('http://localhost:4000/productos')
            .then(response => {
                const { data } = response.data 
                setnewData(data) 
            })
            .catch(e => {
                console.log(e)
            });
    }

    const limpiarCampos = () => {
        productoFormik.errors.nombreProducto = false
        productoFormik.values.nombreProducto = ''
        productoFormik.errors.descripcionProducto = false
        productoFormik.values.descripcionProducto = ''
        productoFormik.values.cantidadProducto = ''
        productoFormik.errors.valorProducto = false
        productoFormik.values.valorProducto = ''
    }

    return (
        <Grid container>
            <Grid item direction={'row'}>
                <Grid item className='btn-crear-producto'>
                    <Button  style={{marginLeft: '35px'}} color='primary' variant='contained' onClick={toggle}>Crear Producto</Button>
                </Grid>
                <Modal isOpen={modal}>
                    <ModalHeader>Producto</ModalHeader>
                    <ModalBody>
                        <Grid item>
                            <Form>
                                <FormGroup className="mb-4">
                                    <Label for="nombreProducto">Nombre Producto</Label>
                                    <Input
                                        type="text"
                                        name="nombreProducto"
                                        id="nombreProducto"
                                        placeholder="Ingrese el nombre del producto"
                                        onChange={productoFormik.handleChange}
                                        onBlur={productoFormik.handleBlur}
                                        value={productoFormik.values.nombreProducto}
                                    />
                                    <div className="bg-red-100 border-l-4">
                                        <p className='mb-0'>{productoFormik.touched.nombreProducto && productoFormik.errors.nombreProducto}</p>
                                    </div>
                                </FormGroup>
                            </Form>
                        </Grid>
                        <Grid item>
                            <Form>
                                <FormGroup className="mb-4">
                                    <Label for="descripcionProducto">Descripción Producto</Label>
                                    <Input
                                        type="textarea"
                                        name="descripcionProducto"
                                        id="descripcionProducto"
                                        placeholder="Ingrese el nombre del producto"
                                        onChange={productoFormik.handleChange}
                                        onBlur={productoFormik.handleBlur}
                                        value={productoFormik.values.descripcionProducto}
                                    />
                                    <div className="bg-red-100 border-l-4">
                                        <p className='mb-0'>{productoFormik.touched.descripcionProducto && productoFormik.errors.descripcionProducto}</p>
                                    </div>
                                </FormGroup>
                            </Form>
                        </Grid>
                        <Grid item>
                            <Form>
                                <FormGroup className="mb-4">
                                    <Label for="cantidadProducto">Cantidad Producto</Label>
                                    <Input type="number"
                                        name="cantidadProducto"
                                        id="cantidadProducto"
                                        placeholder="Ingrese el nombre del producto"
                                        onChange={productoFormik.handleChange}
                                        onBlur={productoFormik.handleBlur}
                                        value={productoFormik.values.cantidadProducto}
                                    />
                                    <div className="bg-red-100 border-l-4">
                                        <p className='mb-0'>{productoFormik.touched.cantidadProducto && productoFormik.errors.cantidadProducto}</p>
                                    </div>
                                </FormGroup>
                            </Form>
                        </Grid>
                        <Grid item>
                            <Form>
                                <FormGroup className="mb-4">
                                    <Label for="valorProducto">Valor Producto</Label>
                                    <Input type="number"
                                        name="valorProducto"
                                        id="valorProducto"
                                        placeholder="Ingrese el nombre del producto"
                                        onChange={productoFormik.handleChange}
                                        onBlur={productoFormik.handleBlur}
                                        value={productoFormik.values.valorProducto}
                                    />
                                    <div className="bg-red-100 border-l-4">
                                        <p className='mb-0'>{productoFormik.touched.valorProducto && productoFormik.errors.valorProducto}</p>
                                    </div>
                                </FormGroup>
                            </Form>
                        </Grid>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='btn-spaces' color="primary" size='small' variant='contained' onClick={toggle}>
                            Cerrar
                        </Button>
                        <Button color="success" size='small' variant='contained' onClick={handleSubmit}>
                            Aceptar
                        </Button>
                    </ModalFooter>
                </Modal>
            </Grid>
            <Grid style={{marginLeft: '35px', marginTop: '40px'}} item direction={'row'}  md={11}>
                <MaterialTable
                    title="Productos"
                    columns={columns}
                    data={newData}
                />;
            </Grid>
        </Grid>
    )
}


export default Cliente

