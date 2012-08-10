$(function(){

    var template  = _.template(
        '<tr>' +
            '<td><a href="project.html"><% print(project.toLowerCase()) %></a></td>' +
            '<td><% print(accounting.formatMoney(budget)) %></td>' +
        '</tr>'
    );

    var rows = [];
    
    PROJECTS = _(PROJECTS).sortBy(function(o) { return -1 * o.budget; });
    _(PROJECTS).each(function(project) {
        rows.push(template(project));
    });

    $('#items').append(
        '<table class="table table-condensed">' +
            '<thead>' +
                '<tr>' +
                    '<th>Project</th>' +
                    '<th>Budget</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>' +
                rows.join('') +
            '</tbody>' +
        '</table>'
    );

    makeFilter('countries');
    makeFilter('donors');
    makeFilter('outcomes');
});

function makeFilter(name) {
    $.get('data/' + name + '.json', function(d) {
        var filter = $(
            '<div class="row-fluid">' +
            '   <div class="span12">' +
            '       <div class="label">' + name + '</div>' +
            '       <ul class="filter-items unstyled"></ul' +
            '   </div>' +
            '</div>'
        );

        var items = _(d).chain()
            .sortBy(function(o) { return -1 * o.count; })
            .filter(function(o) { return o.value })
            .first(5)
            .value();

        _(items).each(function(o) {
            $('.filter-items', filter).append(
                '<li>' + o.value.toLowerCase() + ' (' + o.count + ')</li>'
            );
        });

        $('#filters').append(filter);

        var max = items[0].count;

        _(items).each(function(o) {
            $('.data', '#' + name).append('<div style="width: ' + (o.count / max * 100) + '%">' + o.count + '</div>');
            $('.caption', '#' + name).append('<div>' + o.value.toLowerCase() + '</div>');
        });

    });
}
