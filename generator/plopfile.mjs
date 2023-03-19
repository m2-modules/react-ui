import path from "path";
import { fileURLToPath } from "url";
import childProcess from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PACKAGE_BASE_PATH = path.resolve(__dirname, "../packages");
const TEMPLATE_BASE_PATH = path.resolve(__dirname, "./templates");

const UI_PACKAGE_PATH = path.join(PACKAGE_BASE_PATH, "ui");
const UI_TEMPLATE_PATH = path.join(TEMPLATE_BASE_PATH, "ui");

export default function (plop) {
  plop.setActionType("install-deps", () => {
    childProcess.execSync("yarn install");
  });

  plop.setGenerator("ui", {
    description: "Generate React UI Module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What will be your awesome UI module name?",
        validate: (input) => {
          if (!input) return "module name is required!";
          return true;
        },
      },
    ],
    actions: [
      {
        type: "addMany",
        base: UI_TEMPLATE_PATH,
        templateFiles: UI_TEMPLATE_PATH,
        destination: `${UI_PACKAGE_PATH}/{{ kebabCase name }}`,
        globOptions: { dot: true },
      },
      { type: "install-deps" },
    ],
  });
}
