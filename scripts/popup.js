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

        document.getElementById('goOption').onclick = () => {
            location.href = '../view/options.html';
        };

        document.getElementById('searchTxt').onkeyup = (e) => {
            if(e.keyCode == 13){
                let engeneType = chrome.storage.sync.get(function(data){
                    if(data.searchEngene == undefined){
                        self.url = (self.searchTxt.value === '') ? 'https://google.com' : `https://www.google.com/search?q=${self.searchTxt.value}`;
                        self.searchType = "google";
                    }else{
                        self.url = (self.searchTxt.value === '') ? data.searchEngene : data.searchUrl + `${self.searchTxt.value}`;
                        self.searchType = data.searchName;
                    }
                    self.search();
                });
            };
        };
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

    async search()
    {   
        let l = this.url;
        let logchk = await chrome.storage.sync.get("logRecord");
        let chk = JSON.stringify(logchk) == "{}" ? [] : logchk['logRecord'];
        if(chk != ""){
            await this.log();    
        }
        chrome.tabs.create({ url: l, active: true });
    }

    now()
    {
        var today = new Date();

        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);

        let hours = today.getHours(); // 시
        let minutes = today.getMinutes();  // 분
        let seconds = today.getSeconds();  // 초

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}

$(function(){
    new popupJs();
});

