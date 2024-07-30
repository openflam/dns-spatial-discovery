export let entry: string;
export namespace output {
    let filename: string;
    let path: string;
    namespace library {
        let name: string;
        let type: string;
    }
}
export namespace module {
    let rules: {
        test: RegExp;
        use: string;
        exclude: RegExp;
    }[];
}
export namespace resolve {
    let extensions: string[];
}
export let mode: string;
