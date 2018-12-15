/// #### latex
///
/// Special characters are replaced with corresponding LaTeX macros, sometimes wrapped in inline math block.

export default {
    '\u00A0': '~',
    '\u00B1': '\\(\\pm\\)',
    '\u2013': '--',
    '\u2014': '---',
    '\u2026': '\\textellipsis',
    '\u2190': '\\(\\leftarrow\\)',
    '\u2192': '\\(\\rightarrow\\)',
    '\u2212': '\\(-\\)',
    '\u00D7': '\\(\\times\\)',
    '\u2260': '\\(\\neq\\)',
    '\u00AB': '\\guillemotleft',
    '\u00BB': '\\guillemotright',
    '\u2018': '`',
    '\u2019': '\'',
    '\u2032': '\\(\'\\)',
    '\u2033': '\\(\'\'\\)',
    '\u201C': '``',
    '\u201D': '\'\'',
};
