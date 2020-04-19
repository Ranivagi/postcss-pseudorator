const postcss = require("postcss");
const fs = require("fs");
const plugin = require("./");

async function run(input, output, opts) {
    let result = await postcss([plugin(opts)]).process(input, { from: undefined });
    expect(result.css).toEqual(output);
    expect(result.warnings()).toHaveLength(0);
}

async function runFile(test, opts) {
    return run(fs.readFileSync("test/" + test + ".css", "utf-8"), fs.readFileSync("test/" + test + ".expect.css", "utf-8"), opts);
}

it("Basic", async () => {
    await runFile("basic", { separate: [":focus-within"] });
});

it("Advanced", async () => {
    await runFile("advanced", { separate: [":focus-within", ":dir"] });
});
