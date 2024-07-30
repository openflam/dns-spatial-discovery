declare const _exports: {
    entry: string;
    module: {
        rules: ({
            test: RegExp;
            use: string;
            exclude: RegExp;
            type?: undefined;
            generator?: undefined;
        } | {
            test: RegExp;
            type: string;
            generator: {
                dataUrl: (content: any) => string;
            };
            use?: undefined;
            exclude?: undefined;
        })[];
    };
    resolve: {
        extensions: string[];
    };
    output: {
        filename: string;
        path: string;
        library: {
            name: string;
            type: string;
        };
    };
};
export = _exports;
