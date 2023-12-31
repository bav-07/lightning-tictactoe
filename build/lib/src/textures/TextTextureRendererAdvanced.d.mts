export default class TextTextureRendererAdvanced {
    constructor(stage: any, canvas: any, settings: any);
    _stage: any;
    _canvas: any;
    _context: any;
    _settings: any;
    getPrecision(): any;
    setFontProperties(): string;
    _load(): Promise<void> | undefined;
    draw(): any;
    _calculateRenderInfo(): {
        baseFont: string;
        w: any;
        width: any;
        text: any;
        precision: any;
        fontSize: number;
        fontBaselineRatio: any;
        lineHeight: number;
        letterSpacing: any;
        textAlign: any;
        textColor: any;
        verticalAlign: any;
        highlight: any;
        highlightColor: any;
        highlightHeight: any;
        highlightPaddingLeft: any;
        highlightPaddingRight: any;
        highlightOffset: any;
        paddingLeft: any;
        paddingRight: any;
        maxLines: any;
        maxLinesSuffix: any;
        textOverflow: any;
        wordWrap: any;
        wordWrapWidth: number;
        shadow: any;
        shadowColor: any;
        shadowOffsetX: any;
        shadowOffsetY: any;
        shadowBlur: any;
        cutSx: number;
        cutEx: number;
        cutSy: number;
        cutEy: number;
        textIndent: number;
        wordBreak: any;
        lineNum: number;
        h: any;
        lines: any[];
    };
    _draw(): void;
    renderInfo: {
        baseFont: string;
        w: any;
        width: any;
        text: any;
        precision: any;
        fontSize: number;
        fontBaselineRatio: any;
        lineHeight: number;
        letterSpacing: any;
        textAlign: any;
        textColor: any;
        verticalAlign: any;
        highlight: any;
        highlightColor: any;
        highlightHeight: any;
        highlightPaddingLeft: any;
        highlightPaddingRight: any;
        highlightOffset: any;
        paddingLeft: any;
        paddingRight: any;
        maxLines: any;
        maxLinesSuffix: any;
        textOverflow: any;
        wordWrap: any;
        wordWrapWidth: number;
        shadow: any;
        shadowColor: any;
        shadowOffsetX: any;
        shadowOffsetY: any;
        shadowBlur: any;
        cutSx: number;
        cutEx: number;
        cutSy: number;
        cutEy: number;
        textIndent: number;
        wordBreak: any;
        lineNum: number;
        h: any;
        lines: any[];
    } | undefined;
    /**
     * See {@link measureText}
     *
     * @param {string} word
     * @param {number} space
     * @returns {number}
     */
    measureText(word: string, space?: number): number;
    tokenize(text: any): string[];
    parse(tokens: any): any;
    applyFontStyle(word: any, baseFont: any): void;
    resetFontStyle(baseFont: any): void;
    measure(parsed: any, letterSpacing: number | undefined, baseFont: any): any;
    indent(parsed: any, textIndent: any): any;
    wrapWord(word: any, wordWrapWidth: any, suffix: any): any;
    _getBreakIndex(word: any, width: any): {
        breakIndex: any;
        truncWordWidth: number;
    };
    wordBreak(word: any, width: any, baseFont: any): any;
    alignLine(parsed: any, initialX?: number): void;
}
//# sourceMappingURL=TextTextureRendererAdvanced.d.mts.map