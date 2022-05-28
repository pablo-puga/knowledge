import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: [
            'public/**',
            '.next/**',
            'knowledge/**',
            '**/node_modules/**',
            '**/dist/**',
            '**/.{git,cache,idea}/**',
        ],
    },
});
