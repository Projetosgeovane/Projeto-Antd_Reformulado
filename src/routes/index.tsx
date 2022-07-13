import { Content } from "antd/lib/layout/layout"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Nav from "../components/nav"
import EditClient from "../pages/client/edit"
import Client from "../pages/client/home"

const AppRoutes = () => {
    return (
        <Router>
            <Nav />
            <Content className="site-layout" style={{ display: 'flex', justifyContent: 'center', width: "100%" , padding: '50px 50px', marginTop: 64 }}>
                <Routes>
                    <Route path="/" element={<Client />} />
                    <Route path="/edit/:id/client" element={<EditClient />}></Route>
                </Routes>
            </Content>
        </Router >

    )
}

export default AppRoutes