import svelte from 'rollup-plugin-svelte';
import pkg from './package.json' assert { type: "json" };

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	input: 'src/index.svelte',
	external: ['svelte', 'svelte/internal', 'svelte/internal/disclose-version'],
	output: [
		{ file: pkg.module, 'format': 'es' },
		{ file: pkg.main, 'format': 'umd', name }
	],
	plugins: [
		svelte()
	]
};
