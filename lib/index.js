#!/usr/bin/env node
const path = require("path");
const inquirer = require("inquirer");
const templateDir = require("template-dir");
const difference = require("lodash.difference");
const cpy = require("cpy");

const profiles = ["rt", "wb", "ux", "se", "ax"];

inquirer
  .prompt([
    {
      name: "projectDir",
      default: ".",
      validate: function(value) {
        if (value) {
          return true;
        }
        return "projectDir should not be empty";
      },
    },
    {
      name: "vendor",
      default: "RestarTech",
      validate: function(value) {
        const pattern = /^[a-zA-Z]+$/;
        const pass = value.match(pattern);
        if (pass) {
          return true;
        }
        return "invalid vendor name, should match " + pattern;
      },
    },
    {
      name: "module",
      validate: function(value) {
        const pattern = /^x[A-Z][a-zA-Z]+$/;
        var pass = value.match(pattern);
        if (pass) {
          return true;
        }
        return "invalid module name, should match " + pattern;
      },
    },
    {
      name: "description",
      default: function(answers) {
        return answers.module + " module";
      },
      validate: function(value) {
        if (value) {
          return true;
        }
        return "description should not be empty";
      },
    },
    {
      name: "preferredSymbol",
      default: function(answers) {
        return answers.module.toLowerCase();
      },
      validate: function(value) {
        const pattern = /^[a-z]+$/;
        var pass = value.match(pattern);
        if (pass) {
          return true;
        }
        return "invalid preferredSymbol, should match " + pattern;
      },
    },
    {
      type: "checkbox",
      name: "profiles",
      default: profiles,
      choices: profiles,
    },
    {
      type: "confirm",
      name: "confirm",
      default: false,
    },
  ])
  .then(answers => {
    if (!answers.confirm) {
      console.log("NOT confirmed, skip creating project!");
      return;
    }
    templateDir(
      {
        source: path.join(__dirname, "..", "template"),
        destination: answers.projectDir,
        onlyFiles: false,
        exclude: [
          ".git",
          ".idea",
          "node_modules",
          ...difference(profiles, answers.profiles),
        ],
      },
      answers,
    );
    return cpy("**/*.jar", path.join(process.cwd(), answers.projectDir), {
      cwd: path.join(__dirname, "..", "template"),
      parents: true,
    });
  })
  .then(() => {
    console.log("DONE");
  });
