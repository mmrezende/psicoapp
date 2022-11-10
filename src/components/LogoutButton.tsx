import { useContext } from "react";
import { IconButton } from "react-native-paper";
import { AuthContext } from "../auth/AuthContext";

export const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    return (
        <IconButton icon="logout" onPress={ logout }/>
    );
}