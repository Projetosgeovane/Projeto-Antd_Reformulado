import { ClockCircleOutlined, DeleteOutlined, EditOutlined, HeartTwoTone, PlusOutlined, WindowsFilled } from '@ant-design/icons';
import { Button, Input, Modal, Popconfirm, Form, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Nav from '../../components/nav';
import { api } from '../../services/api';


interface recordType {
    id: number;
    name: string;
    endereco: string;
    email: string;
    telefone: number;
}

const Client = (props) => {
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            width: '30%',
        },
        {
            title: 'Endereço',
            dataIndex: 'endereco',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Telefone',
            dataIndex: 'telefone',
        },

        {
            title: 'Ações',
            dataIndex: 'acoes',
            render: (text, record) => {
                const confirm = async () => {
                    await api.delete(`/clients/${record.id}`);
                    window.location.href = ('/');
                };

                return (
                    <>
                        <div className="btn-group">
                            <Link to={`/edit/${record.id}/client`}  >
                                <EditOutlined twoToneColor="#52c41a" />
                            </Link>
                            {/* <Link to={`/delete/${record.id}/client`} >
                                <DeleteOutlined twoToneColor="#eb2f96" />
                            </Link > */}
                            <Popconfirm
                                title="Are you sure to delete this task?"
                                onConfirm={confirm}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="/a" >Delete</a>
                            </Popconfirm>
                        </div>
                    </>
                )
            }
        }

    ];

    const { register } = useForm();
    const [data, setData] = useState([]);

    useEffect(() => {
        (

            async () => {
                const response = await api.get('/clients');
                setData(response.data);
            }
        )()
    }, [])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (values) => {
        const response = await api.post('/clients', values);
        console.log(response);
        window.location.href = '/';

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <div>
                <Button type="primary" onClick={showModal}>
                    <PlusOutlined type='primary' twoToneColor="#52c41a" />
                </Button>
            </div>
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={data}
            />
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form name="nest-messages" onFinish={handleOk}  >
                    <Form.Item
                        name={['nome']}
                        label="Nome"



                    >
                        <Input {...register("nome", { required: "Required", })} />
                    </Form.Item>
                    <Form.Item
                        name={['email']}
                        label="Email"
                    >
                        <Input {...register("email")} />
                    </Form.Item>
                    <Form.Item
                        name={['endereco']}
                        label="Endereço"
                    >
                        <Input  {...register("endereco")} />
                    </Form.Item>
                    <Form.Item name={['telefone']} label="Telefone">
                        <Input  {...register("telefone")} />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" onSubmit={handleOk}>
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </>

    );
}
export default Client;




