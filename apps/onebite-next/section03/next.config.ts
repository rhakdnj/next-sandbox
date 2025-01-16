import type { NextConfig } from "next";
import {RemotePattern} from "next/dist/shared/lib/image-config";

const nextConfig: NextConfig = {
  /* config options here */
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    images: {
        remotePatterns: [
            {
                hostname: "shopping-phinf.pstatic.net",
                protocol: "https",
            }
        ]
    }
};

export default nextConfig;
