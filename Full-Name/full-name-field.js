MktoForms2.whenReady(function(form) {
	
	function splitFullName(a, b, c) {
		if(window.splitFullNameActive) return;
		else window.splitFullNameActive = true;
		
		String.prototype.capitalize = function() {
			return this.replace(/(^|s)([a-z])/g, function(m, p1, p2) {
				return p1 + p2.toUpperCase();
			});
		};
		document.getElementsByName(c)[0].oninput = function() {
			var fullName = document.getElementsByName(c)[0].value;
			if ((fullName.match(/ /g) || []).length === 0
					|| fullName.substring(fullName.indexOf(" ") + 1,
							fullName.length) === "") {
				var first = fullName.capitalize();
				;
				var last = "null";
			} else if (fullName.substring(0, fullName.indexOf(" "))
					.indexOf(".") > -1) {
				var first = fullName.substring(0, fullName.indexOf(" "))
						.capitalize()
						+ " "
						+ fullName.substring(fullName.indexOf(" ") + 1,
								fullName.length).substring(
								0,
								fullName.substring(fullName.indexOf(" ") + 1,
										fullName.length).indexOf(" "))
								.capitalize();
				var last = fullName
						.substring(first.length + 1, fullName.length)
						.capitalize();
			} else {
				var first = fullName.substring(0, fullName.indexOf(" "))
						.capitalize();
				var last = fullName.substring(fullName.indexOf(" ") + 1,
						fullName.length).capitalize();
			}
			document.getElementsByName(a)[0].value = first;
			document.getElementsByName(b)[0].value = last;
		};
		// Initial Values
		if (document.getElementsByName(c)[0].value.length < 2
				&& document.getElementsByName(b)[0].value.length.length > 2
				&& document.getElementsByName(a)[0].value.length.length > 2) {
			var first = document.getElementsByName(a)[0].value.capitalize();
			var last = document.getElementsByName(b)[0].value.capitalize();
			var fullName = first + " " + last;
			console.log(fullName);
			document.getElementsByName(c)[0].value = fullName;
		}
	}
	splitFullName("FirstName", "LastName", "leadFullName");
});