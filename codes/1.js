#! /usr/bin/env node

const inquirer = require('inquirer')

inquirer
	.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Project Name?'
		}
	])
	.then((anwsers) => {
		console.log(anwsers)
	})
