
let searchTxt = document.getElementById("searchTxt");
let searchBtn = document.getElementById("searchBtn");




document.getElementById('searchByGoogle').onclick = () => { 
    chrome.tabs.create({ url: `https://www.google.com/search?q=${searchTxt.value}`, active: true }); 
};
document.getElementById('searchBygitHub').onclick = () => { 
    chrome.tabs.create({ url: `https://github.com/search?q=${searchTxt.value}`, active: true }); 
};

document.getElementById('searchByYoutube').onclick = () => {
	let l = (searchTxt.value === '') ? 'https://www.youtube.com' : `https://www.youtube.com//results?search_query=${searchTxt.value}`;
	chrome.tabs.create({ url: l, active: true });
};


document.getElementById('searchByNaver').onclick = () => {
	let l = (searchTxt.value === '') ? 'https://www.naver.com' : `https://search.naver.com/search.naver?query=${searchTxt.value}`;
	chrome.tabs.create({ url: l, active: true });
};

document.getElementById('searchByDaum').onclick = () => {
	let l = (searchTxt.value === '') ? 'https://www.daum.com' : `https://search.daum.net/search?w=tot&q=${searchTxt.value}`;
	chrome.tabs.create({ url: l, active: true });
};
searchTxt.focus();

