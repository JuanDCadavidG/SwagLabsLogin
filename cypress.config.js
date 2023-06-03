const { defineConfig } = require("cypress");

async function setupNodeEvents(on, config) {
	await addCucumberPreprocessorPlugin(on, config);

	on('task', { downloadFile });

	on(
		'file:preprocessor',
		createBundler({
			plugins: [createEsbuildPlugin(config)],
		})
	);
	return config;
}

module.exports = defineConfig({
  projectId: '',
	viewportWidth: 1280,
	viewportHeight: 720,
	watchForFileChanges: false,
	chromeWebSecurity: false,
	reporter: 'cypress-multi-reporters',
	reporterOptions: {
		configFile: 'jsconfig.json',
	},
	retries: 0,
	video: false,
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://www.saucedemo.com'
  },
  env: {
    baseUrl: 'https://www.saucedemo.com',
    swagLabs: {
        endpoint: {
            endpointInventory: '/inventory.html',
            endpointCart: '/cart.html',
            endpointStepOne: '/checkout-step-one.html',
            endpointStepTwo: '/checkout-step-two.html',
            endpointComplete: '/checkout-complete.html'
        },
        login: {
            users: {
                standardUser: 'standard_user',
                lockedUser: 'locked_out_user',
                problemUser: 'problem_user',
                performanceUser: 'performance_glitch_user',
                userInv: 'invalid_username',
                password: 'secret_sauce',
            },
            errorMsg: {
                inventoryErrorMessage: "Epic sadface: You can only access '/inventory.html' when you are logged in.",
                cartErrorMessage: "Epic sadface: You can only access '/cart.html' when you are logged in.",
                checkoutOneErrorMessage: "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.",
                checkoutTwoErrorMessage: "Epic sadface: You can only access '/checkout-step-two.html' when you are logged in.",
                checkoutAllErrorMessage: "Epic sadface: You can only access '/checkout-complete.html' when you are logged in.",
                lockedUserMessage: 'Epic sadface: Sorry, this user has been locked out.',
                passOrUserNotMatchMessage: 'Epic sadface: Username and password do not match any user in this service',
                userRequiredMessage: 'Epic sadface: Username is required',
                passRequiredMessage: 'Epic sadface: Password is required',
            },
        },
    },
},
});


