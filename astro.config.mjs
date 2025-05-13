// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://hieunh1801.github.io",
	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'IT',
					autogenerate: { directory: 'it', },
				},
				{
					label: 'Language',
					autogenerate: { directory: 'language' },
				},
			],
		}),
	],
});
