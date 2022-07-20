import { useContext } from "react";

export default function useAuth(authContext) {
    return useContext(authContext);
}