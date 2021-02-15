'use strict';

$(function () {
    let keywords = [];
    let objects = [];
    // get data
    $.ajax('./data/page-1.json').then(data => {
        data.forEach(element => {
            let newTemplate = new Template(
                element.image_url,
                element.title,
                element.description,
                element.keyword,
                element.horns);
            newTemplate.render();
            newTemplate.addArray();
            objects.push(newTemplate);

        });
        filter();

        // event
        $('select').on('change', function () {
            $('main').html('');
            objects.forEach(item => {
                if ($(this).val() === item.keyword) {
                    item.render();
                }
            })
            if ($(this).val() === 'default') {
                objects.forEach(item => {
                    item.render();
                })
            }
        })
    })

    // constructor
    function Template(url, title, description, keyword, horns) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.keyword = keyword;
        this.horns = horns;
    }
    Template.prototype.addArray = function () {
        if (!keywords.includes(this.keyword)) {
            keywords.push(this.keyword);
        }
    }

    // render method
    Template.prototype.render = function () {
        let tem = $('#photo-template').clone();
        tem.removeAttr('id');
        tem.find('h2').text(this.title);
        tem.find('img').attr('src', this.url);
        tem.find('p').text(this.description);
        $('main').append(tem);
    }

    // render keywords
    const filter = () => {
        keywords.forEach(item => {
            let selectKey = $('option').first().clone();
            selectKey.attr('value', item);
            selectKey.text(item);
            $('select').append(selectKey);
        })
    }


});