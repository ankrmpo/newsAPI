const s = require( "../../sass/main.sass");
const compiler = require('vue-template-compiler');

import Vue from 'vue';

const NewsAPI = require('newsapi');
const axios = require('axios');

var API_KEY = '4d0071e5f37e4f3cb0d1ebf5b9f5b6ba';

var VUE = new Vue({
    el: '.article',
    data: {
        imageLink: "public/img/Placeholder.jpg",
        Title: "",
        Author: null,
        Information: null,
        Link: null,
        articleLink: ""
    }
})

var rezultati:any;
var active = 0;

$(document).ready(function(){
    $("#search").on("click", getArticles);
    $(".next img").on("click", nextArticle);
    $(".prev img").on("click", previousArticle);
});

function getArticles()
{
    var keyword = $("#keyword").val();

    if(keyword != "") 
    {
        axios
            .get('https://newsapi.org/v2/top-headlines?'
            + 'pageSize=5&' + 'q=' + keyword + '&'
            + 'apiKey=' + API_KEY)
            .then((response:any) => {
                rezultati = response.data.articles;
                console.log(rezultati);
                if(rezultati.length === 0)
                    VUE.Title = "No results.";
                else
                {
                    VUE.Title = rezultati[0].title;
                    VUE.Author = "Author: " + rezultati[0].author;
                    VUE.Information = rezultati[0].content;
                    VUE.Link = "Read article";
                    VUE.articleLink = rezultati[0].url;
                    if(rezultati[0].urlToImage !== "")
                        VUE.imageLink = rezultati[0].urlToImage;
                    else
                        VUE.imageLink = "public/img/Placeholder.jpg";
                }
                
            })
            .catch(function(error:any){
                console.log(error);
            })
            
    }
}

function nextArticle()
{
    active = (active + 1) % rezultati.length;
    console.log(active);
    VUE.Title = rezultati[active].title;
    VUE.Author = "Author: " + rezultati[active].author;
    VUE.Information = rezultati[active].content;
    VUE.Link = "Read article";
    VUE.articleLink = rezultati[active].url;
    if(rezultati[active].urlToImage !== "")
        VUE.imageLink = rezultati[active].urlToImage;
    else
        VUE.imageLink = "public/img/Placeholder.jpg";
}

function previousArticle()
{
    --active;
    if(active < 0) active = rezultati.length - 1;
    console.log(active);
    VUE.Title = rezultati[active].title;
    VUE.Author = "Author: " + rezultati[active].author;
    VUE.Information = rezultati[active].content;
    VUE.Link = "Read article";
    VUE.articleLink = rezultati[active].url;
    if(rezultati[active] !== "")
        VUE.imageLink = rezultati[active].urlToImage;
    else
        VUE.imageLink = "public/img/Placeholder.jpg";
}