import { Button, Form, Input, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const EditClient = (props) => {
    const { id } = useParams();
    const { register } = useForm();
    const navigate = useNavigate();
    const [client, setClient] = useState([]);


    useEffect(() => {
        (

            async () => {
                const response = await api.get(`/clients/${id}`)
                setClient(response.data);
            })()
    }, [id]);

    const onFinish = async (values: any) => {
        await api.put(`/clients/${id}`, values);
        navigate('/');
    };

    return (
        <>
            {
                client.map(client => (
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}  key={client.id} >
                        <Form.Item
                            name={['nome']}
                            label="Nome"
                        


                        >
                            <Input placeholder={client.nome} {...register("nome", { required: "Required", })} />
                        </Form.Item>
                        <Form.Item
                            name={['email']}
                            label="Email"
                        >
                            <Input placeholder={client.email} {...register("email")} />
                        </Form.Item>
                        <Form.Item
                            name={['endereco']}
                            label="Endereço"
                        >
                            <Input placeholder={client.endereco} {...register("endereco")} />
                        </Form.Item>
                        <Form.Item name={['telefone']} label="Telefone">
                            <Input placeholder={client.telefone} {...register("telefone")} />
                        </Form.Item>


                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                ))
            }
        </>
    );
}
export default EditClient;





