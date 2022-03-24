#!/usr/bin/env node
const { execSync } = require("child_process");
const readline = require("readline");
const path = require("path");
const fs = require("fs");

const project = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let projectName = "";
const question = (prompt) => {
  return new Promise((resolve, reject) => {
    project.question(prompt, resolve);
  });
};

(async () => {
  try {
    projectName = await question("Qual o nome do projeto? ");
    project.close();

    const currentPath = process.cwd();
    const projectPath = path.join(currentPath, projectName);
    const git_repo =
      "https://github.com/ylanbenoliel/havan-template-frontend.git";

    fs.mkdirSync(projectPath);
    console.log("Baixando arquivos...");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log("Instalando dependências...");
    execSync("npm install");

    console.log("Removendo arquivos desnecessários...");
    fs.rmSync(path.join(projectPath, ".git"), { recursive: true });
    fs.rmSync(path.join(projectPath, "bin"), { recursive: true });

    console.log("A instalação do template está finalizada!");
  } catch (error) {
    if (error.code === "EEXIST") {
      console.log(
        `Já existe uma pasta chamada ${projectName}. Tente outro nome.`
      );
    } else {
      console.log(error);
    }
  }
  process.exit(1);
})();
