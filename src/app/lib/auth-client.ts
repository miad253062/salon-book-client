import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: [
        inferAdditionalFields({
            user: {
                role: {
                    type: "string",
                },
                isBlocked: {
                    type: "boolean",
                },
            },
        }),
    ],
});

export const { signIn, signUp, signOut, updateUser,  useSession } = authClient;