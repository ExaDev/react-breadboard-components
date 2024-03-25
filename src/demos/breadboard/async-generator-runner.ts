export class AsyncGeneratorRunner<
	TReturn,
	TNext,
	TNextReturn,
	TGenerateParams
> {
	constructor(
		private readonly generatorGenerator: (
			params?: TGenerateParams
		) => AsyncGenerator<TReturn, TNext, TNextReturn | undefined>,
		private readonly handler: (value: TReturn) => unknown,
		private readonly generatorParams?: TGenerateParams
	) {}

	run(): void {
		const generator = this.generatorGenerator(this.generatorParams);
		const handler = this.handler;
		(async (): Promise<void> => {
			try {
				for await (const value of generator) {
					await handler(value);
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}
}
