function debounce<T extends ((...args: any[]) => any)>(fn: T, delay: number) {
	let timer: NodeJS.Timeout | null = null;
	return (...args: Parameters<T>) => {
		if (timer) {
			clearTimeout(timer);
		}
		timer =
			setTimeout(
				() => {
					fn.apply(null, args);
					timer = null;
				},
				delay,
			);
	};
}
