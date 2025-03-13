import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Spin } from "antd";
import LoginRequiredModal from "../../pages/auth/LoginRequiredModal";
const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            setIsModalOpen(true);
        }
        setCheckingAuth(false);
    }, [isAuthenticated]);

    const handleOk = () => {
        setIsModalOpen(false);
        navigate("/login", { state: { from: location }, replace: true });
    };

    if (checkingAuth) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20%" }}>
                <Spin size="large" />
            </div>
        );
    }

    return isAuthenticated ? (
        children
    ) : (
        <LoginRequiredModal isOpen={isModalOpen} onConfirm={handleOk} />

    );
};

export default PrivateRoute;
