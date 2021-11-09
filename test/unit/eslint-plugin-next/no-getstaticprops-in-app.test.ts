import rule from '@next/eslint-plugin-next/lib/rules/no-getstaticprops-in-app'
import { RuleTester } from 'eslint'
	; (RuleTester as any).setDefaultConfig({
		parserOptions: {
			ecmaVersion: 2018,
			sourceType: 'module',
			ecmaFeatures: {
				modules: true,
				jsx: true,
			},
		},
	})
const ruleTester = new RuleTester()

ruleTester.run('no-getstaticprops-in-app', rule, {
	valid: [
		// {
		// 	code: `import Document, { Html, Head, Main, NextScript } from 'next/document'

		//   class MyDocument extends Document {
		//     static async getInitialProps(ctx) {
		//       //...
		//     }

		//     render() {
		//       return (
		//         <Html>
		//           <Head/>
		//         </Html>
		//       )
		//     }
		//   }

		//   export default MyDocument
		// `,
		// 	filename: 'pages/_document.js',
		// },
		// {
		// 	code: `import Document, { Html, Head, Main, NextScript } from 'next/document'

		//   class MyDocument extends Document {      
		//     render() {
		//       return (
		//         <Html>
		//           <Head>
		//             <meta charSet="utf-8" />
		//             <link
		//               href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		//               rel="stylesheet"
		//             />
		//           </Head>
		//         </Html>
		//       )
		//     }
		//   }

		//   export default MyDocument
		// `,
		// 	filename: 'pages/_document.tsx',
		// },
	],
	invalid: [
		{
			code: `
		  import "@styles/globals.css";
			import { AppProps } from "next/app";

			export default function App({ Component, pageProps }: AppProps) {

				return (
					<Component {...pageProps} />
				);
			}
		  `,
			filename: 'pages/_app.js',
			errors: [
				{
					message:
						'Do not include getStaticProps in _app.js. See: https://nextjs.org/docs/messages/no-getstaticprops-in-app',
					type: 'JSXElement',
				},
				{
					message:
						'Do not include getStaticProps in _app.js. See: https://nextjs.org/docs/messages/no-getstaticprops-in-app',
					type: 'JSXElement',
				},
			],
		},
		// {
		// 	code: `
		//   import Document, { Html, Main, NextScript } from 'next/document'
		//   import Head from 'next/head'

		//   class MyDocument extends Document {
		//     render() {
		//       return (
		//         <Html>
		//           <Head>
		//             <meta charSet="utf-8" />
		//             <link
		//               href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		//               rel="stylesheet"
		//             />
		//           </Head>
		//           <body>
		//             <Main />
		//             <NextScript />
		//           </body>
		//           <Head>
		//             <script
		//               dangerouslySetInnerHTML={{
		//                 __html: '',
		//               }}
		//             />
		//           </Head>
		//         </Html>
		//       )
		//     }
		//   }

		//   export default MyDocument
		//   `,
		// 	filename: 'pages/_document.page.tsx',
		// 	errors: [
		// 		{
		// 			message:
		// 				'Do not include multiple instances of <Head/>. See: https://nextjs.org/docs/messages/no-duplicate-head',
		// 			type: 'JSXElement',
		// 		},
		// 	],
		// },
	],
})
