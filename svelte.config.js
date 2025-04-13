import staticAdapter from '@sveltejs/adapter-static';
import nodeAdapter from '@sveltejs/adapter-node'; // Or another dynamic adapter
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const isStatic = process.env.BUILD_STATIC === 'true';

const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: isStatic
            ? staticAdapter({ strict: false, fallback: 'index.html', pages: 'build_widget', assets: 'build_widget'  }) // Static site
            : nodeAdapter(), // Dynamic app
        prerender: {
            entries: isStatic ? ['/widget', '/config'] : [], // Only prerender for static builds
        },
    }
};

export default config;