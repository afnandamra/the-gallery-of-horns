'use strict';

$(function () {
    // default render
    page(1);
});

let keywords = [];
let objects = [];
let afterFilter = '';

// get data
function page(page) {
    keywords = [];
    objects = [];
    afterFilter = '';
    $.ajax(`./data/page-${page}.json`).then(data => {
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
        sort();
        select();

    })
}

// click event
$('button').click(function () {
    $('#cards').html('');
    $('select').first().children().not(':first-child').remove();
    page($(this).attr('id'));
    $('#sort').val('default');
})

// filtering
function select() {
    $('select').first().on('change', function () {
        afterFilter = $(this).val();
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
        console.log(afterFilter);
        if ($(this).val() === 'title') {
            sortByName(objects);
        } else if ($(this).val() === 'horns') {
            sortByHorns(objects);
        } else {
            shuffle(objects);
        }
    })
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    array.forEach(obj => {
        if (afterFilter === '') {
            $('#cards').append(obj.render());
        }
        else if (afterFilter === obj.keyword) {
            $('#cards').append(obj.render());
        }
    })
}

function sortByName(objArr) {
    objArr.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
    // rendering
    objArr.forEach(obj => {
        if (afterFilter === '') {
            $('#cards').append(obj.render());
        }
        else if (afterFilter === obj.keyword) {
            $('#cards').append(obj.render());
        }
    })
}

function sortByHorns(objArr) {
    objArr.sort((a, b) => {
        if (a.horns < b.horns) return -1;
        else if (a.horns > b.horns) return 1;
        else return 0;
    })
    // rendering
    objArr.forEach(obj => {
        if (afterFilter === '') {
            $('#cards').append(obj.render());
        }
        else if (afterFilter === obj.keyword) {
            $('#cards').append(obj.render());
        }
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


// old way render
    // let tem = $('#photo-template').clone();
    // tem.removeAttr('id');
    // tem.find('h2').text(this.title);
    // tem.find('img').attr('src', this.url);
    // tem.find('p').text(this.description);
    // $('main').append(tem);