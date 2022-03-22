#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

if (process.argv.length < 3) {
  console.log("Você precisa fornececer um nome para o projeto.");
  console.log("Por exemplo:");
  console.log("    yarn create template meu-projeto");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/ylanbenoliel/havan-template-frontend.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      `Já existe uma pasta chamada ${projectName}. Tente outro nome.`
    );
  } else {
    console.log(error);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log("Baixando arquivos...");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log("Instalando dependências...");
    execSync("npm install");

    console.log("Removendo arquivos desnecessários...");
    fs.rmdirSync(path.join(projectPath, ".git"), { recursive: true });
    fs.rmdirSync(path.join(projectPath, "bin"), { recursive: true });

    console.log("A instalação do template está finalizada!");
  } catch (error) {
    console.log(error);
  }
}
main();
