const os = require('os');
const { spawn } = require('child_process');
const { Command, Option } = require('commander');
const SvelteApplication = require('./SvelteApplication');
const packageJson = require('./package.json');

function createNewSvelte() {

    let appName;
    const program = new Command(packageJson.name)
        .usage('<project-name> [options]')
        .version(packageJson.version)
        .arguments('[project-name]')
        .action(name => {
            if (!name) {
                console.error(`${os.EOL}Please specify a project name.${os.EOL}`);
                process.exit(1);
            }
            appName = name;
        })
        .addOption(new Option('-t, --transpiler <transpiler>', 'specify a transpiler').default('none').choices(['none', 'typescript', 'ts']))
        .addOption(new Option('-b, --bundler <bundler-type>', 'specify the bundler').default('rollup').choices(['rollup', 'webpack']))
        .addOption(new Option('--no-install', 'create the app only, no package installation'))
        .allowUnknownOption()
        .parse(process.argv);

    const options = program.opts();
    options.name = appName;
    const app = new SvelteApplication(options);
    app.create();
    if (options.install)
        installPackages(app.dir);
}

function installPackages(dir) {
    const spawnOpts = {
        cwd: dir,
        env: process.env,
        stdio: [0, 1, 2],
        shell: true
    };

    spawn('npm', ['install'], spawnOpts);
}

module.exports = { createNewSvelte }