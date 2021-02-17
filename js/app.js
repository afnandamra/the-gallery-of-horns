'use strict';

$(function () {
    let keywords = [];
    let objects = [];

    // get data
    const page = a => {
        keywords = [];
        objects = [];
        $.ajax(`./data/page-${a}.json`).then(data => {
            data.forEach(element => {
                let newTemplate = new Template(
                    element.image_url,
                    element.title,
                    element.description,
                    element.keyword,
                    element.horns);
                objects.push(newTemplate);
            });
            filter();
            sortByName(objects);
            // events
            select();
            sort();
        })
    }

    // default render
    page(1);

    // click event
    $('button').click(function () {
        $('#cards').html('');
        $('select').first().children().not(':first-child').remove();
        let buttonId = $(this).attr('id');
        page(buttonId);
        $('#sort').val('default');
    })

    // filtering
    function select() {
        $('select').first().on('change', function () {
            $('#cards').empty();
            objects.forEach(item => {
                if ($(this).val() === item.keyword) {
                    $('#cards').append(item.render());
                }
            })
            if ($(this).val() === 'default') {
                objects.forEach(item => {
                    $('#cards').append(item.render());
                })
            }
        })
    }

    // sorting functions
    function sort() {
        $('#sort').on('change', function () {
            $('#cards').html('');
            if ($(this).val() === 'title') {
                sortByName(objects);
            } else if ($(this).val() === 'horns') {
                sortByHorns(objects);
            } else {
                $(this).val('default');
                objects.reverse();
                objects.forEach(obj => {
                    let renderedObj = obj.render();
                    $('#cards').append(renderedObj);
                })
            }
        })
    }

    function sortByName(objArr) {
        objArr.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        // rendering
        objArr.forEach(obj => {
            let renderedObj = obj.render();
            $('#cards').append(renderedObj);
        })
    }

    function sortByHorns(objArr) {
        objArr.sort((a, b) => {
            if (a.horns < b.horns) return -1;
            else if (a > b) return 1;
            else return 0;
        })
        // rendering
        objArr.forEach(obj => {
            let renderedObj = obj.render();
            $('#cards').append(renderedObj);
        })
    }

    // render keywords
    const filter = () => {
        objects.forEach(obj => {
            obj.addArray();
        })
        keywords.forEach(item => {
            let selectKey = $('option').first().clone();
            selectKey.attr('value', item);
            selectKey.text(item);
            $('select').first().append(selectKey);
        })
    }

    // constructor
    function Template(url, title, description, keyword, horns) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.keyword = keyword;
        this.horns = horns;
    }

    // adding keywords without duplicates
    Template.prototype.addArray = function () {
        if (!keywords.includes(this.keyword)) {
            keywords.push(this.keyword);
        }
    }

    // render method
    Template.prototype.render = function () {
        let tem = $('#template').html();
        let card = Mustache.render(tem, this);
        return card;
    }

});


    // old way render
        // let tem = $('#photo-template').clone();
        // tem.removeAttr('id');
        // tem.find('h2').text(this.title);
        // tem.find('img').attr('src', this.url);
        // tem.find('p').text(this.description);
        // $('main').append(tem);