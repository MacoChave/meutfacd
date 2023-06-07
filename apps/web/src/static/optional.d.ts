declare module '*.svg' {
	import * as React from 'react';

	export const ReactComponent: FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>;

	const src: string;
	export default src;
}
