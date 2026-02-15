import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useCurrentAccount } from "@onelabs/dapp-kit";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

type WalletAccount = ReturnType<typeof useCurrentAccount>;

interface AuthContextType {
    isAuthenticated: boolean;
    userId: Id<"users"> | null;
    userAddress: string | undefined;
    account: WalletAccount;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const account = useCurrentAccount();
    const login = useMutation(api.users.login);
    const [userId, setUserId] = useState<Id<"users"> | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (account?.address) {
            setIsLoading(true);
            login({ walletAddress: account.address })
                .then((id) => {
                    console.log("AuthProvider: User login success", id);
                    setUserId(id);
                })
                .catch((err) => {
                    console.error("AuthProvider: User login failed", err);
                    setUserId(null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            console.log("AuthProvider: No account connected");
            setUserId(null);
            setIsLoading(false);
        }
    }, [account?.address, login]);

    const value = {
        isAuthenticated: !!account?.address,
        userId,
        userAddress: account?.address,
        account: account || null,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
