import path from 'node:path';
import {fileURLToPath} from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Pin the file-tracing root to this app so Next doesn't warn about the
    // sibling lockfiles in the SDK package above it.
    outputFileTracingRoot: dir,
};

export default nextConfig;
