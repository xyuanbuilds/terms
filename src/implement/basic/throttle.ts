function throttle<T extends ((...args: any[]) => any)>(fn: T, delay: number) {
	let timer: NodeJS.Timeout | null = null;
	return function (...args: Parameters<T>) {
		if (!timer) {
			timer =
				setTimeout(
					() => {
						fn.apply(null, args);
						timer = null;
					},
					delay,
				);
		}
	};
}
