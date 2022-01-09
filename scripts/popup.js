class popupJs{
    constructor(){
        this.initControl();
        this.initEvent();
    };

    initControl(){
        this.searchTxt = document.getElementById("searchTxt");
        this.searchBtn = document.getElementById("searchBtn");
        this.searchTxt.focus();
    }
    initEvent(){
        let self = this;
        document.getElementById('searchByGoogle').onclick = () => { 
            let l = (self.searchTxt.value === '') ? 'https://google.com' : `https://www.google.com/search?q=${self.searchTxt.value}`;
            chrome.tabs.create({ url: l, active: true }); 
        };
        document.getElementById('searchBygitHub').onclick = () => { 
            let l = (self.searchTxt.value === '') ? 'https://github.com' : `https://github.com/search?q=${self.searchTxt.value}`;
            chrome.tabs.create({ url: l, active: true }); 
        };
        
        document.getElementById('searchByYoutube').onclick = () => {
            let l = (self.searchTxt.value === '') ? 'https://www.youtube.com' : `https://www.youtube.com//results?search_query=${self.searchTxt.value}`;
            chrome.tabs.create({ url: l, active: true });
        };
        
        
        document.getElementById('searchByNaver').onclick = () => {
            let l = (self.searchTxt.value === '') ? 'https://www.naver.com' : `https://search.naver.com/search.naver?query=${self.searchTxt.value}`;
            chrome.tabs.create({ url: l, active: true });
        };
        
        document.getElementById('searchByDaum').onclick = () => {
            let l = (self.searchTxt.value === '') ? 'https://www.daum.com' : `https://search.daum.net/search?w=tot&q=${self.searchTxt.value}`;
            chrome.tabs.create({ url: l, active: true });
        };
        document.getElementById('searchByYahoo').onclick = () => {
            let l = (self.searchTxt.value === '') ? 'https://search.yahoo.com' : `https://search.yahoo.com/search?p=${self.searchTxt.value}`;
            chrome.tabs.create({ url: l, active: true });
        };
        document.getElementById('searchTxt').onkeyup = (e) => {
            //Enter
            if(e.keyCode == 13){
                let l = (self.searchTxt.value === '') ? 'https://google.com' : `https://www.google.com/search?q=${self.searchTxt.value}`;
                chrome.tabs.create({ url: l, active: true }); 
            };
        };
    }
}


$(function(){
    new popupJs();
});
