import { Link } from "react-router-dom"
import { UploadOutlined, UserOutlined, VideoCameraOutlined, HomeOutlined } from '@ant-design/icons';

export const Items = [
    {
        label: (
            <Link to="/profile">Account</Link>
        ), key: 'item-1', icon: <UserOutlined />
    },
    {
        label: (
            <Link to="/">Home</Link>
        ), key: 'item-2', icon: <HomeOutlined />
    },

];