export let entry: string;
export namespace module {
    let rules: ({
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
}
export namespace resolve {
    let extensions: string[];
}
export namespace output {
    let filename: string;
    let path: string;
    namespace library {
        let name: string;
        let type: string;
    }
    let globalObject: string;
}
