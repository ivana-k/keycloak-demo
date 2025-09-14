import useKeycloak from '../keycloak/useKeycloak';

export function useAuthService() {
    const { keycloak, authenticated } = useKeycloak();

    const login = () => {
        keycloak?.login({ redirectUri: window.location.origin + "/" });
    };

    const logout = () => {
        keycloak?.logout({ redirectUri: window.location.origin + "/" });
    };

    const fetchWithAuth = async (endpoint: string, method: string = "GET") => {
        if (!keycloak) throw new Error("Keycloak not initialized");

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`, {
            method,
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
                "Content-Type": "application/json",
            },
        });

        return response;
    };

    const getAccessMessage = async (): Promise<string | null> => {
        try {
            const response = await fetchWithAuth("/user/");
            if (!response.ok) return null;
            return await response.text();
        } catch {
            return null;
        }
    };

    const getUserProfile = async (): Promise<any | null> => {
        try {
            const response = await fetchWithAuth("/user/profile");
            if (!response.ok) return null;
            return await response.json();
        } catch {
            return null;
        }
    };
    return {
        login,
        logout,
        getAccessMessage,
        getUserProfile,
    };
}