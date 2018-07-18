var configForDevelopment = {
	providers: {
	}
};

var configForProduction = {
	providers: {
	}
};

var config ;
if (window.location.hostname==='localhost') {
	config = configForDevelopment;
}
else{
	config = configForProduction;
}

export default config;
