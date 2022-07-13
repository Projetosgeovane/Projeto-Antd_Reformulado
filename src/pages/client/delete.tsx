import { EditOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

const DeleteClient = () => {

    const { id } = useParams();
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);


        {
            (

                async () => {
                    await api.delete(`/clients/${id}`);
                }
            )()
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <>
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
};
export default DeleteClient;