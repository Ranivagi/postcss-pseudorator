const postcss = require("postcss");
const selectorParser = require("postcss-selector-parser");

module.exports = postcss.plugin("postcss-pseudorator", (opts = { }) => {

    let separatePseudos = new Set(opts.separate);

    return (root) => {
        root.walkRules((rule) => {
            rule.selector = selectorParser((selectors) => {
                let separateSelectors = [];
                selectors.walkPseudos((pseudo) => {
                    if (separatePseudos.has(pseudo.value)) {
                        let parent = pseudo;
                        while (parent.parent.type !== "root") parent = parent.parent;
                        if (separateSelectors.indexOf(parent) === -1) {
                            separateSelectors.push(parent);
                        }
                    }
                });
                if (separateSelectors.length > 0) {
                    if (separateSelectors.length === selectors.nodes.length) {
                        separateSelectors.shift();
                    }
                    for (let selector of separateSelectors) {
                        selectors.removeChild(selector);
                        let clonedRule = rule.clone();
                        clonedRule.selector = selector.toString().trim();
                        rule.parent.insertBefore(rule, clonedRule);
                        if (opts.debug) console.log("pseudorator: separating", clonedRule.selector);
                    }
                }
            }).processSync(rule.selector);
        });
    }
});
