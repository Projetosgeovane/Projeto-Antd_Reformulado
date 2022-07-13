import { DeleteOutlined, EditOutlined, HeartTwoTone, WindowsFilled } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../components/nav';
import { api } from '../../services/api';


interface recordType {
    id: number;
    name: string;
    endereco: string;
    email: string;
    telefone: number;
}




const Client = () => {

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

                return (
                    <>
                        <div className="btn-group">
                            <Link to={`/edit/${record.id}/client`}  >
                                <EditOutlined twoToneColor="#52c41a" />
                            </Link>
                            <Button onClick={showModal}>

                                <Link to={`/delete/${record.id}/client`} />
                                
                                <DeleteOutlined twoToneColor="#eb2f96" />
                            </Button>
                        </div>
                    </>
                )
            }
        }

    ];

    const { id } = useParams();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
        
    };

    const handleOk = () => {
        setConfirmLoading(true);

        async () => {
            await api.delete(`/clients/5`)
        }
        // setTimeout(() => {
        //     setVisible(false);
        //     setConfirmLoading(false);
        // }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        (

            async () => {
                const response = await api.get('/clients');
                setData(response.data);
            }
        )()
    }, [])

    return (
        <>
            <Button type="primary">Cadastrar Novo Cliente</Button>
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={data}
            />
            <Button type="primary" onClick={showModal}>
                <EditOutlined twoToneColor="#52c41a" />
            </Button>
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>

    );
}
export default Client;




