import { useEffect } from "react";
import { useCurrentAccount } from "@onelabs/dapp-kit";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useAuth() {
    const account = useCurrentAccount();
    const login = useMutation(api.users.login);

    useEffect(() => {
        if (account?.address) {
            // Login or register user whenever wallet connects
            login({ walletAddress: account.address })
                .then((userId) => {
                    console.log("User authenticated:", userId);
                })
                .catch((err) => {
                    console.error("Failed to authenticate user:", err);
                });
        }
    }, [account?.address, login]); // Re-run if account changes

    return {
        account,
        isAuthenticated: !!account?.address,
        userAddress: account?.address
    };
}
