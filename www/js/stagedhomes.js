/* --------------------------------------------------------------------------------
	Customizations / mmenu / etc
-------------------------------------------------------------------------------- */
// Document Ready
jQuery(document).ready(function( $ ) {
	// Variables
	var dateCurrentYear = new Date();
	var currentYear = dateCurrentYear.getFullYear();

	// Update copyright date.
	document.getElementById("currentYear").innerHTML = currentYear;

	// mmenu: Arguments
	$("#my-menu").mmenu({
	   "slidingSubmenus": false,
	   "extensions": [
			"border-full",
			"effect-slide-panels-100",
			"multiline",
			"pageshadow"
	   ], // extensions
		"navbars": [{
			position 	: "bottom",
			height 		: 1,
			content 	: [
				"<a class='fa fa-envelope' style='color: #fff;' href='mailto:aspcourses@stagedhomes.com'></a>",
				"<a class='fa fa-phone' style='color: #fff;' href='tel:18003927161'></a>",
				"<a class='fa fa-facebook' style='color: #fff;' href='#/' onclick=\"intel.xdk.device.launchExternal('http://www.facebook.com/barbstagedhomes');\"></a>"
			] // content
		}] // navbars
	}); // /mmenu
}); // jQuery(document)


/* --------------------------------------------------------------------------------
	AngularJS Components

	This section helps use the mathematical formula developed by Staged Homes.s
-------------------------------------------------------------------------------- */
// Variables
var app = angular.module("rosi-calculator", []);

// AngularJS controller for whole index.html
app.controller("MainCtrl", function($scope) {
	// Variables
	$scope.hasEmptyFields = false;

	// Scrolls automatically to top of document.
	$scope.ngappScrollTo = function() {
		window.scrollTo(0,0);
	};

	// Calculates Results
	$scope.calculate_results = function() {
		// Variables
		var numStagedBeforeSale = parseFloat(document.getElementById("stagedBeforeSale").value);
		var numNotStagedBeforeSale = parseFloat(document.getElementById("notStagedBeforeSale").value);
		var numMortgageAmt = parseInt(document.getElementById("mortgageAmt").value);
		var numMonthlyUtilities = parseInt(document.getElementById("monthlyUtilities").value);
		var numStagingInvestment = parseInt(document.getElementById("stagingInvestment").value);

		// Results Variables
		var numCostUnstaged, numCostStaged, numSavingsStaged, numRosi;

		// Error Control
		if (!numStagedBeforeSale) { document.getElementById('stagedBeforeSale-error').classList.add('has-error'); } else { document.getElementById('stagedBeforeSale-error').classList.remove('has-error'); }
		if (!numNotStagedBeforeSale) { document.getElementById('notStagedBeforeSale-error').classList.add('has-error'); } else { document.getElementById('notStagedBeforeSale-error').classList.remove('has-error'); }
		if (!numMortgageAmt) { document.getElementById('mortgageAmt-error').classList.add('has-error'); } else { document.getElementById('mortgageAmt-error').classList.remove('has-error'); }
		if (!numMonthlyUtilities) { document.getElementById('monthlyUtilities-error').classList.add('has-error'); } else { document.getElementById('monthlyUtilities-error').classList.remove('has-error'); }
		if (!numStagingInvestment) { document.getElementById('stagingInvestment-error').classList.add('has-error'); } else { document.getElementById('stagingInvestment-error').classList.remove('has-error'); }
		if (!numStagedBeforeSale || !numNotStagedBeforeSale || !numMortgageAmt || !numMonthlyUtilities || !numStagingInvestment || !numStagedBeforeSale) {
			hasEmptyFields = true;
		} else {
			hasEmptyFields = false
		}

		// Runs if all fields are filled in.
		if (!hasEmptyFields) {
			// Cost to Sell Your Home Unstaged
			numCostUnstaged = (numMortgageAmt + numMonthlyUtilities) * numNotStagedBeforeSale;
			document.getElementById("costUnstaged").innerHTML = "$" + numCostUnstaged;

			// Cost to Sell Your Home Staged
			numCostStaged = (numMortgageAmt + numMonthlyUtilities) * numStagedBeforeSale + numStagingInvestment;
			document.getElementById("costStaged").innerHTML = "$" + numCostStaged;

			// Savings When You SELL Your Home ASP® Staged
			numSavingsStaged = numCostUnstaged - numCostStaged;
			document.getElementById("savingsStaged").innerHTML = "$" + numSavingsStaged;

			// Return on Staging Investment (ROSI)
			numRosi = (numSavingsStaged / numStagingInvestment) * 100;
			document.getElementById("rosi").innerHTML = numRosi.toFixed(2) + " %";

			// Go to next screen.
			document.getElementById("btnResults").setAttribute("data-slide-to", "5");
		} // if (!hasEmptyFields)

		// Scroll Up
		if (hasEmptyFields == false) $scope.ngappScrollTo();
	} // Calculates Results

	$scope.results_back = function() {
		document.getElementById("btnResults").setAttribute("data-slide-to", "");
	} // results_back

	/* --------------------------------------------------------------------------------
		Results Page | Menu Button (Now Home Button)

		Barb requested to make the button "Menu" and open the menu screen.  This
		leaves the results_reset() function DEPRECATED.
	-------------------------------------------------------------------------------- */
	$scope.results_reset = function() {
		// SHC Provided Inputs
		document.getElementById("stagedBeforeSale").value = 0.4;
		document.getElementById("notStagedBeforeSale").value = 3;

		// User Inputs
		document.getElementById("mortgageAmt").value = null;
		document.getElementById("monthlyUtilities").value = null;
		document.getElementById("stagingInvestment").value = null;

		// Disable Results Button from input fields.
		$scope.results_back();

		// Scroll Up
		$scope.ngappScrollTo();
	} // results_reset
});

// Fast click integration.
app.run(function() {
	FastClick.attach(document.body);
});

