class popupJs
{
    constructor()
    {
        this.initControl();
        this.initEvent();
    };

    initControl()
    {
        this.maxHistory = 500;
        this.searchTxt = document.getElementById("searchTxt");
        this.searchBtn = document.getElementById("searchBtn");
        this.searchTxt.focus();
    }
    initEvent()
    {
        let self = this;
        document.getElementById('searchByGoogle').onclick = () => { 
            self.url = (self.searchTxt.value === '') ? 'https://google.com' : `https://www.google.com/search?q=${self.searchTxt.value}`;
            self.searchType = "google";
            self.search();
        };
        document.getElementById('searchBygitHub').onclick = () => { 
            self.url = (self.searchTxt.value === '') ? 'https://github.com' : `https://github.com/search?q=${self.searchTxt.value}`;
            self.searchType = "github";
            self.search();
        };
        
        document.getElementById('searchByYoutube').onclick = () => {
            self.url = (self.searchTxt.value === '') ? 'https://www.youtube.com' : `https://www.youtube.com//results?search_query=${self.searchTxt.value}`;
            self.searchType = "youtube";
            self.search();
        };
        
        document.getElementById('searchByNaver').onclick = () => {
            self.url = (self.searchTxt.value === '') ? 'https://www.naver.com' : `https://search.naver.com/search.naver?query=${self.searchTxt.value}`;
            self.searchType = "naver";
            self.search();
        };
        
        document.getElementById('searchByDaum').onclick = () => {
            self.url = (self.searchTxt.value === '') ? 'https://www.daum.com' : `https://search.daum.net/search?w=tot&q=${self.searchTxt.value}`;
            self.searchType = "daum";
            self.search();
        };
        document.getElementById('searchByYahoo').onclick = () => {
            self.url = (self.searchTxt.value === '') ? 'https://search.yahoo.com' : `https://search.yahoo.com/search?p=${self.searchTxt.value}`;
            self.searchType = "yahoo";
            self.search();
        };
        document.getElementById('searchTxt').onkeyup = (e) => {
            if(e.keyCode == 13){
                self.url = (self.searchTxt.value === '') ? 'https://google.com' : `https://www.google.com/search?q=${self.searchTxt.value}`;
                self.searchType = "google";
                self.search();
            };
        };
    }
    async search()
    {
        let l = this.url;
        await this.log();
        chrome.tabs.create({ url: l, active: true }); 
    }
    async log()
    {
        let l = this.url;
        let txt= this.searchTxt.value;
        let searchType= this.searchType;
        let create_date = this.now();
        let history = await chrome.storage.sync.get("history");
        
        let tmpArr = JSON.stringify(history) == "{}" ? [] : history['history'];

        let tmpObj = {
            "url" : l,
            "txt" : txt,
            "searchType" : searchType,
            "create_date" : create_date
        };
        tmpArr.push(tmpObj);
        if(tmpArr.length > this.maxHistory) tmpArr.shift();

        await chrome.storage.sync.set( {"history":tmpArr} );
    }
    now()
    {
        var today = new Date();

        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    }
}


$(function(){
    new popupJs();
});

