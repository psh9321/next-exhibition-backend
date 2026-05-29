import type { JwtPayload } from 'jsonwebtoken';

declare global {
    interface USER_TOKNE_PAYLOAD extends JwtPayload {
        userId?: string;
    };

    interface AUTH_HEADER_TOKEN {
        "a-t"?: string;
        "r-t"?: string;
    }
}

export {}