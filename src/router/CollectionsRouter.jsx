import { notification } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import Collections from "../pages/CollectionsPage"

const CollectionsRouter = ({ security, role }) => {

    console.log(role)
    const navigate = useNavigate();

    if (security.includes(role)) {
        return <Collections />
    }

    navigate('/')
    notification['error']({
        message: `μ κ·Ό μ€ν¨ π¦`,
        description: 'λ‘κ·ΈμΈμ΄ νμνκ±°λ κΆνμ΄ μμ΅λλ€.',
    })

    return null;
}

export default CollectionsRouter