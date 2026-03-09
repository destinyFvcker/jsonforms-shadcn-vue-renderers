// https://nuxt.com/docs/api/configuration/nuxt-config
const targetHost = "example";
const targetPort = "8080";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },

	ssr: false,

	app: {
		head: {
			title: "Vue Sandbox Json forms support examples",
			// link: [{ rel: "icon", type: "image/x-icon", href: "/example.ico" }],
		},
	},

	modules: [
		// "@nuxt/content", // we don't need it right now
		"@nuxt/eslint",
		"@nuxt/hints",
		"@nuxt/image",
		"@nuxt/scripts",
		"@nuxt/test-utils",
		"@nuxtjs/tailwindcss",
		"shadcn-nuxt",
		"@pinia/nuxt",
	],

	// eslint: {
	// 	config: {
	// 		standalone: false,
	// 	},
	// },

	shadcn: {
		/**
		 * Prefix for all the imported component.
		 * @default "Ui"
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * Will respect the Nuxt aliases.
		 * @link https://nuxt.com/docs/api/nuxt-config#alias
		 * @default "@/components/ui"
		 */
		componentDir: "@/components/ui",
	},

	components: [
		{
			path: "~/components/renders",
			pathPrefix: false,
		},
	],

	hooks: {
		"prerender:routes"({ routes }) {
			routes.clear(); // Do not generate any routes (except the defaults)
		},
	},

	devServer: {
		port: 5173,
	},

	vite: {
		server: {
			proxy: {
				"^/api": {
					target: `http://${targetHost}:${targetPort}`,
					changeOrigin: true,
					secure: false,
				},
				"^/ws": {
					target: `ws://${targetHost}:${targetPort}`,
					changeOrigin: true,
					secure: false,
					ws: true,
				},
			},
		},
		optimizeDeps: {
			// 使用 pnpm 感知的嵌套语法，确保 ajv（CJS）在被 @jsonforms/core 引用时
			// 也能正确进入 Vite 预构建流程，完成 CJS → ESM 转换
			include: [
				"@jsonforms/core",
				"@jsonforms/vue",
				"@jsonforms/vue-vanilla",
				"@jsonforms/core > ajv",
				"@jsonforms/core > ajv-formats",
			],
		},
	},
});
